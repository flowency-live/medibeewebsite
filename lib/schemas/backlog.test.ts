import { describe, it, expect } from 'vitest';
import {
  BacklogItemType,
  BacklogItemStatus,
  BacklogItemEffort,
  BacklogItemSchema,
  CreateBacklogItemSchema,
  UpdateBacklogItemSchema,
  ReorderBacklogSchema,
} from './backlog';

describe('BacklogItemType', () => {
  it('accepts valid types', () => {
    const types = ['feature', 'bug', 'text-change', 'idea'] as const;
    types.forEach((type) => {
      const result = BacklogItemType.safeParse(type);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid types', () => {
    const result = BacklogItemType.safeParse('invalid-type');
    expect(result.success).toBe(false);
  });
});

describe('BacklogItemStatus', () => {
  it('accepts valid statuses', () => {
    const statuses = ['todo', 'doing', 'done'] as const;
    statuses.forEach((status) => {
      const result = BacklogItemStatus.safeParse(status);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid statuses', () => {
    const result = BacklogItemStatus.safeParse('in-progress');
    expect(result.success).toBe(false);
  });
});

describe('BacklogItemEffort', () => {
  it('accepts valid effort values', () => {
    const efforts = ['XS', 'S', 'M', 'L', 'XL'] as const;
    efforts.forEach((effort) => {
      const result = BacklogItemEffort.safeParse(effort);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid effort values', () => {
    const result = BacklogItemEffort.safeParse('medium');
    expect(result.success).toBe(false);
  });
});

describe('BacklogItemSchema', () => {
  const validItem = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Add dark mode toggle',
    description: 'Users should be able to switch between light and dark themes',
    type: 'feature' as const,
    status: 'todo' as const,
    effort: 'M' as const,
    stackPosition: 1,
    createdAt: '2026-05-09T10:00:00.000Z',
    updatedAt: '2026-05-09T10:00:00.000Z',
  };

  it('validates a complete backlog item', () => {
    const result = BacklogItemSchema.safeParse(validItem);
    expect(result.success).toBe(true);
  });

  it('requires a valid UUID for id', () => {
    const data = { ...validItem, id: 'not-a-uuid' };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires title with minimum 1 character', () => {
    const data = { ...validItem, title: '' };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects title over 200 characters', () => {
    const data = { ...validItem, title: 'a'.repeat(201) };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('allows null description', () => {
    const data = { ...validItem, description: null };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('rejects description over 2000 characters', () => {
    const data = { ...validItem, description: 'a'.repeat(2001) };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('allows null effort', () => {
    const data = { ...validItem, effort: null };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('requires positive integer for stackPosition', () => {
    const data = { ...validItem, stackPosition: 0 };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects negative stackPosition', () => {
    const data = { ...validItem, stackPosition: -1 };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires valid ISO datetime for createdAt', () => {
    const data = { ...validItem, createdAt: 'not-a-date' };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires valid ISO datetime for updatedAt', () => {
    const data = { ...validItem, updatedAt: 'not-a-date' };
    const result = BacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe('CreateBacklogItemSchema', () => {
  const validCreateData = {
    title: 'Fix login button alignment',
    type: 'bug' as const,
  };

  it('validates minimal create data', () => {
    const result = CreateBacklogItemSchema.safeParse(validCreateData);
    expect(result.success).toBe(true);
  });

  it('defaults status to todo', () => {
    const result = CreateBacklogItemSchema.safeParse(validCreateData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe('todo');
    }
  });

  it('allows optional description', () => {
    const data = { ...validCreateData, description: 'Button is 2px off' };
    const result = CreateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('allows optional effort', () => {
    const data = { ...validCreateData, effort: 'XS' as const };
    const result = CreateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('allows explicit status', () => {
    const data = { ...validCreateData, status: 'doing' as const };
    const result = CreateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe('doing');
    }
  });

  it('requires title', () => {
    const data = { type: 'bug' as const };
    const result = CreateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires type', () => {
    const data = { title: 'Something' };
    const result = CreateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe('UpdateBacklogItemSchema', () => {
  it('allows partial updates', () => {
    const data = { title: 'Updated title' };
    const result = UpdateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('allows updating just status', () => {
    const data = { status: 'done' as const };
    const result = UpdateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('allows updating just effort', () => {
    const data = { effort: 'L' as const };
    const result = UpdateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('allows clearing effort with null', () => {
    const data = { effort: null };
    const result = UpdateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('allows clearing description with null', () => {
    const data = { description: null };
    const result = UpdateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('allows empty object (no updates)', () => {
    const result = UpdateBacklogItemSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('validates title max length when provided', () => {
    const data = { title: 'a'.repeat(201) };
    const result = UpdateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('validates description max length when provided', () => {
    const data = { description: 'a'.repeat(2001) };
    const result = UpdateBacklogItemSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe('ReorderBacklogSchema', () => {
  const validReorder = {
    itemId: '550e8400-e29b-41d4-a716-446655440000',
    sourceStatus: 'todo' as const,
    destinationStatus: 'doing' as const,
    newPosition: 1,
  };

  it('validates complete reorder data', () => {
    const result = ReorderBacklogSchema.safeParse(validReorder);
    expect(result.success).toBe(true);
  });

  it('allows same source and destination status (reorder within column)', () => {
    const data = { ...validReorder, destinationStatus: 'todo' as const };
    const result = ReorderBacklogSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('requires valid UUID for itemId', () => {
    const data = { ...validReorder, itemId: 'not-uuid' };
    const result = ReorderBacklogSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires valid status for sourceStatus', () => {
    const data = { ...validReorder, sourceStatus: 'invalid' };
    const result = ReorderBacklogSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires valid status for destinationStatus', () => {
    const data = { ...validReorder, destinationStatus: 'invalid' };
    const result = ReorderBacklogSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires positive integer for newPosition', () => {
    const data = { ...validReorder, newPosition: 0 };
    const result = ReorderBacklogSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects negative newPosition', () => {
    const data = { ...validReorder, newPosition: -1 };
    const result = ReorderBacklogSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
