import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import type {
  BacklogItem,
  CreateBacklogItem,
  UpdateBacklogItem,
  BacklogItemStatusValue,
} from '../schemas/backlog';
import type { ReorderBacklog } from '../schemas/backlog';

// Build DynamoDB client configuration
const getDynamoDBClientConfig = () => {
  const region = process.env.BACKLOG_AWS_REGION || process.env.AWS_REGION || 'eu-west-2';

  // Check for explicit credentials (for environments where IAM role isn't available)
  const accessKeyId = process.env.BACKLOG_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.BACKLOG_AWS_SECRET_ACCESS_KEY;

  if (accessKeyId && secretAccessKey) {
    return {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };
  }

  // Fall back to default credential chain (IAM role, env vars, etc.)
  return { region };
};

const client = new DynamoDBClient(getDynamoDBClientConfig());

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_BACKLOG_TABLE || 'medibee-backlog';

const STATUS_ORDER: Record<BacklogItemStatusValue, number> = {
  todo: 1,
  doing: 2,
  done: 3,
};

export async function listBacklogItems(): Promise<BacklogItem[]> {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
  });

  const response = await docClient.send(command);
  const items = (response.Items || []) as BacklogItem[];

  // Sort by status order, then by stackPosition
  return items.sort((a, b) => {
    const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (statusDiff !== 0) return statusDiff;
    return a.stackPosition - b.stackPosition;
  });
}

export async function getBacklogItem(id: string): Promise<BacklogItem | null> {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: {
      PK: `PBI#${id}`,
      SK: `PBI#${id}`,
    },
  });

  const response = await docClient.send(command);
  return (response.Item as BacklogItem) || null;
}

export async function createBacklogItem(
  data: CreateBacklogItem
): Promise<BacklogItem> {
  const id = uuidv4();
  const now = new Date().toISOString();

  // Get the max stackPosition for the target status
  const existingItems = await getItemsByStatus(data.status || 'todo');
  const maxPosition = existingItems.reduce(
    (max, item) => Math.max(max, item.stackPosition),
    0
  );

  const item: BacklogItem = {
    id,
    title: data.title,
    description: data.description || null,
    type: data.type,
    status: data.status || 'todo',
    effort: data.effort || null,
    stackPosition: maxPosition + 1,
    createdAt: now,
    updatedAt: now,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      PK: `PBI#${id}`,
      SK: `PBI#${id}`,
      GSI1PK: `STATUS#${item.status}`,
      GSI1SK: `POS#${String(item.stackPosition).padStart(6, '0')}`,
      ...item,
    },
  });

  await docClient.send(command);
  return item;
}

export async function updateBacklogItem(
  id: string,
  data: UpdateBacklogItem
): Promise<BacklogItem | null> {
  const updates: string[] = [];
  const expressionValues: Record<string, unknown> = {};
  const expressionNames: Record<string, string> = {};

  // Always update updatedAt
  updates.push('#updatedAt = :updatedAt');
  expressionNames['#updatedAt'] = 'updatedAt';
  expressionValues[':updatedAt'] = new Date().toISOString();

  if (data.title !== undefined) {
    updates.push('#title = :title');
    expressionNames['#title'] = 'title';
    expressionValues[':title'] = data.title;
  }

  if (data.description !== undefined) {
    updates.push('#description = :description');
    expressionNames['#description'] = 'description';
    expressionValues[':description'] = data.description;
  }

  if (data.type !== undefined) {
    updates.push('#type = :type');
    expressionNames['#type'] = 'type';
    expressionValues[':type'] = data.type;
  }

  if (data.status !== undefined) {
    updates.push('#status = :status');
    expressionNames['#status'] = 'status';
    expressionValues[':status'] = data.status;

    // Also update GSI1PK for status queries
    updates.push('GSI1PK = :gsi1pk');
    expressionValues[':gsi1pk'] = `STATUS#${data.status}`;
  }

  if (data.effort !== undefined) {
    updates.push('#effort = :effort');
    expressionNames['#effort'] = 'effort';
    expressionValues[':effort'] = data.effort;
  }

  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      PK: `PBI#${id}`,
      SK: `PBI#${id}`,
    },
    UpdateExpression: `SET ${updates.join(', ')}`,
    ExpressionAttributeNames: expressionNames,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: 'ALL_NEW',
  });

  const response = await docClient.send(command);
  return (response.Attributes as BacklogItem) || null;
}

export async function deleteBacklogItem(id: string): Promise<boolean> {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: {
      PK: `PBI#${id}`,
      SK: `PBI#${id}`,
    },
    ReturnValues: 'ALL_OLD',
  });

  const response = await docClient.send(command);
  return response.Attributes !== undefined;
}

async function getItemsByStatus(
  status: BacklogItemStatusValue
): Promise<BacklogItem[]> {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: '#status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': status },
  });

  const response = await docClient.send(command);
  return ((response.Items || []) as BacklogItem[]).sort(
    (a, b) => a.stackPosition - b.stackPosition
  );
}

export async function reorderBacklogItem(
  data: ReorderBacklog
): Promise<boolean> {
  const { itemId, sourceStatus, destinationStatus, newPosition } = data;

  // Get the item being moved
  const item = await getBacklogItem(itemId);
  if (!item) return false;

  const movingAcrossColumns = sourceStatus !== destinationStatus;

  // Get items in source column (to reorder after removal)
  const sourceItems = await getItemsByStatus(sourceStatus);

  // Get items in destination column
  const destItems = movingAcrossColumns
    ? await getItemsByStatus(destinationStatus)
    : sourceItems;

  // Calculate new positions
  const writeRequests: Array<{
    PutRequest: { Item: Record<string, unknown> };
  }> = [];

  if (movingAcrossColumns) {
    // Remove item from source, reorder remaining
    const remainingSource = sourceItems.filter((i) => i.id !== itemId);
    remainingSource.forEach((i, index) => {
      if (i.stackPosition !== index + 1) {
        writeRequests.push({
          PutRequest: {
            Item: {
              PK: `PBI#${i.id}`,
              SK: `PBI#${i.id}`,
              GSI1PK: `STATUS#${i.status}`,
              GSI1SK: `POS#${String(index + 1).padStart(6, '0')}`,
              ...i,
              stackPosition: index + 1,
              updatedAt: new Date().toISOString(),
            },
          },
        });
      }
    });

    // Insert into destination at newPosition
    const newDestItems = [...destItems];
    newDestItems.splice(newPosition - 1, 0, {
      ...item,
      status: destinationStatus,
    });

    newDestItems.forEach((i, index) => {
      const isMovedItem = i.id === itemId;
      const positionChanged = i.stackPosition !== index + 1;

      if (isMovedItem || positionChanged) {
        writeRequests.push({
          PutRequest: {
            Item: {
              PK: `PBI#${i.id}`,
              SK: `PBI#${i.id}`,
              GSI1PK: `STATUS#${isMovedItem ? destinationStatus : i.status}`,
              GSI1SK: `POS#${String(index + 1).padStart(6, '0')}`,
              ...i,
              status: isMovedItem ? destinationStatus : i.status,
              stackPosition: index + 1,
              updatedAt: new Date().toISOString(),
            },
          },
        });
      }
    });
  } else {
    // Reorder within same column
    const otherItems = sourceItems.filter((i) => i.id !== itemId);
    otherItems.splice(newPosition - 1, 0, item);

    otherItems.forEach((i, index) => {
      if (i.stackPosition !== index + 1 || i.id === itemId) {
        writeRequests.push({
          PutRequest: {
            Item: {
              PK: `PBI#${i.id}`,
              SK: `PBI#${i.id}`,
              GSI1PK: `STATUS#${i.status}`,
              GSI1SK: `POS#${String(index + 1).padStart(6, '0')}`,
              ...i,
              stackPosition: index + 1,
              updatedAt: new Date().toISOString(),
            },
          },
        });
      }
    });
  }

  // Execute batch write if there are updates
  if (writeRequests.length > 0) {
    // DynamoDB BatchWrite has a limit of 25 items
    const chunks = [];
    for (let i = 0; i < writeRequests.length; i += 25) {
      chunks.push(writeRequests.slice(i, i + 25));
    }

    for (const chunk of chunks) {
      const command = new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: chunk,
        },
      });
      await docClient.send(command);
    }
  }

  return true;
}
