import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BacklogItem, CreateBacklogItem, UpdateBacklogItem } from '../schemas/backlog';

// Mock DynamoDB client
const mockSend = vi.fn();

vi.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: {
    from: vi.fn(() => ({
      send: (...args: unknown[]) => mockSend(...args),
    })),
  },
  GetCommand: vi.fn((params) => ({ ...params, __type: 'GetCommand' })),
  PutCommand: vi.fn((params) => ({ ...params, __type: 'PutCommand' })),
  UpdateCommand: vi.fn((params) => ({ ...params, __type: 'UpdateCommand' })),
  DeleteCommand: vi.fn((params) => ({ ...params, __type: 'DeleteCommand' })),
  ScanCommand: vi.fn((params) => ({ ...params, __type: 'ScanCommand' })),
  QueryCommand: vi.fn((params) => ({ ...params, __type: 'QueryCommand' })),
  BatchWriteCommand: vi.fn((params) => ({ ...params, __type: 'BatchWriteCommand' })),
}));

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: vi.fn(() => ({})),
}));

// Import after mocking
import {
  listBacklogItems,
  getBacklogItem,
  createBacklogItem,
  updateBacklogItem,
  deleteBacklogItem,
  reorderBacklogItem,
} from './backlogService';

describe('backlogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockItem: BacklogItem = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Add dark mode toggle',
    description: 'Users should be able to switch themes',
    type: 'feature',
    status: 'todo',
    effort: 'M',
    stackPosition: 1,
    createdAt: '2026-05-09T10:00:00.000Z',
    updatedAt: '2026-05-09T10:00:00.000Z',
  };

  describe('listBacklogItems', () => {
    it('returns all backlog items', async () => {
      mockSend.mockResolvedValueOnce({
        Items: [mockItem],
      });

      const result = await listBacklogItems();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockItem.id);
    });

    it('returns empty array when no items exist', async () => {
      mockSend.mockResolvedValueOnce({
        Items: [],
      });

      const result = await listBacklogItems();

      expect(result).toEqual([]);
    });

    it('sorts items by status and stackPosition', async () => {
      const item1 = { ...mockItem, id: '1', status: 'todo', stackPosition: 2 };
      const item2 = { ...mockItem, id: '2', status: 'todo', stackPosition: 1 };
      const item3 = { ...mockItem, id: '3', status: 'doing', stackPosition: 1 };

      mockSend.mockResolvedValueOnce({
        Items: [item1, item2, item3],
      });

      const result = await listBacklogItems();

      expect(result[0].id).toBe('2'); // todo, pos 1
      expect(result[1].id).toBe('1'); // todo, pos 2
      expect(result[2].id).toBe('3'); // doing, pos 1
    });

    it('handles DynamoDB errors', async () => {
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      await expect(listBacklogItems()).rejects.toThrow('DynamoDB error');
    });
  });

  describe('getBacklogItem', () => {
    it('returns a single backlog item by id', async () => {
      mockSend.mockResolvedValueOnce({
        Item: mockItem,
      });

      const result = await getBacklogItem(mockItem.id);

      expect(result).toBeDefined();
      expect(result?.id).toBe(mockItem.id);
      expect(result?.title).toBe(mockItem.title);
    });

    it('returns null when item not found', async () => {
      mockSend.mockResolvedValueOnce({
        Item: undefined,
      });

      const result = await getBacklogItem('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('createBacklogItem', () => {
    it('creates a new backlog item with generated id', async () => {
      const createData: CreateBacklogItem = {
        title: 'New feature',
        type: 'feature',
        status: 'todo',
      };

      // Mock getting max position for the status
      mockSend.mockResolvedValueOnce({ Items: [] });
      // Mock put command
      mockSend.mockResolvedValueOnce({});

      const result = await createBacklogItem(createData);

      expect(result.id).toBeDefined();
      expect(result.title).toBe('New feature');
      expect(result.type).toBe('feature');
      expect(result.status).toBe('todo');
      expect(result.stackPosition).toBe(1);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('assigns correct stackPosition based on existing items', async () => {
      const createData: CreateBacklogItem = {
        title: 'Another feature',
        type: 'bug',
        status: 'todo',
      };

      // Mock existing items with max position 3
      mockSend.mockResolvedValueOnce({
        Items: [
          { ...mockItem, stackPosition: 3 },
          { ...mockItem, stackPosition: 1 },
        ],
      });
      mockSend.mockResolvedValueOnce({});

      const result = await createBacklogItem(createData);

      expect(result.stackPosition).toBe(4);
    });

    it('includes optional description and effort', async () => {
      const createData: CreateBacklogItem = {
        title: 'Feature with details',
        description: 'Detailed description here',
        type: 'feature',
        status: 'doing',
        effort: 'L',
      };

      mockSend.mockResolvedValueOnce({ Items: [] });
      mockSend.mockResolvedValueOnce({});

      const result = await createBacklogItem(createData);

      expect(result.description).toBe('Detailed description here');
      expect(result.effort).toBe('L');
    });
  });

  describe('updateBacklogItem', () => {
    it('updates item fields', async () => {
      const updateData: UpdateBacklogItem = {
        title: 'Updated title',
        status: 'doing',
      };

      mockSend.mockResolvedValueOnce({
        Attributes: {
          ...mockItem,
          title: 'Updated title',
          status: 'doing',
          updatedAt: '2026-05-09T11:00:00.000Z',
        },
      });

      const result = await updateBacklogItem(mockItem.id, updateData);

      expect(result).toBeDefined();
      expect(result?.title).toBe('Updated title');
      expect(result?.status).toBe('doing');
    });

    it('returns null when item not found', async () => {
      mockSend.mockResolvedValueOnce({
        Attributes: undefined,
      });

      const result = await updateBacklogItem('non-existent', { title: 'Test' });

      expect(result).toBeNull();
    });

    it('can clear optional fields with null', async () => {
      const updateData: UpdateBacklogItem = {
        description: null,
        effort: null,
      };

      mockSend.mockResolvedValueOnce({
        Attributes: {
          ...mockItem,
          description: null,
          effort: null,
        },
      });

      const result = await updateBacklogItem(mockItem.id, updateData);

      expect(result?.description).toBeNull();
      expect(result?.effort).toBeNull();
    });
  });

  describe('deleteBacklogItem', () => {
    it('deletes an item by id', async () => {
      mockSend.mockResolvedValueOnce({
        Attributes: mockItem,
      });

      const result = await deleteBacklogItem(mockItem.id);

      expect(result).toBe(true);
    });

    it('returns false when item not found', async () => {
      mockSend.mockResolvedValueOnce({
        Attributes: undefined,
      });

      const result = await deleteBacklogItem('non-existent');

      expect(result).toBe(false);
    });
  });

  describe('reorderBacklogItem', () => {
    it('moves item within same column', async () => {
      const items = [
        { ...mockItem, id: '1', status: 'todo', stackPosition: 1 },
        { ...mockItem, id: '2', status: 'todo', stackPosition: 2 },
        { ...mockItem, id: '3', status: 'todo', stackPosition: 3 },
      ];

      // Get current item
      mockSend.mockResolvedValueOnce({ Item: items[2] });
      // Get items in destination column
      mockSend.mockResolvedValueOnce({ Items: items });
      // Batch write for reordering
      mockSend.mockResolvedValueOnce({});

      const result = await reorderBacklogItem({
        itemId: '3',
        sourceStatus: 'todo',
        destinationStatus: 'todo',
        newPosition: 1,
      });

      expect(result).toBe(true);
    });

    it('moves item to different column', async () => {
      const todoItems = [
        { ...mockItem, id: '1', status: 'todo', stackPosition: 1 },
        { ...mockItem, id: '2', status: 'todo', stackPosition: 2 },
      ];
      const doingItems = [
        { ...mockItem, id: '3', status: 'doing', stackPosition: 1 },
      ];

      // Get current item
      mockSend.mockResolvedValueOnce({ Item: todoItems[0] });
      // Get items in source column (for reordering)
      mockSend.mockResolvedValueOnce({ Items: todoItems });
      // Get items in destination column
      mockSend.mockResolvedValueOnce({ Items: doingItems });
      // Batch write for reordering
      mockSend.mockResolvedValueOnce({});

      const result = await reorderBacklogItem({
        itemId: '1',
        sourceStatus: 'todo',
        destinationStatus: 'doing',
        newPosition: 1,
      });

      expect(result).toBe(true);
    });

    it('returns false when item not found', async () => {
      mockSend.mockResolvedValueOnce({ Item: undefined });

      const result = await reorderBacklogItem({
        itemId: 'non-existent',
        sourceStatus: 'todo',
        destinationStatus: 'doing',
        newPosition: 1,
      });

      expect(result).toBe(false);
    });
  });
});
