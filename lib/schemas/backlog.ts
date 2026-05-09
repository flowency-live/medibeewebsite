import { z } from 'zod';

export const BacklogItemType = z.enum(['feature', 'bug', 'text-change', 'idea']);

export const BacklogItemStatus = z.enum(['todo', 'doing', 'done']);

export const BacklogItemEffort = z.enum(['XS', 'S', 'M', 'L', 'XL']);

export const BacklogItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).nullable(),
  type: BacklogItemType,
  status: BacklogItemStatus,
  effort: BacklogItemEffort.nullable(),
  pageContext: z.string().max(500).nullable(), // Page/route where item was created
  stackPosition: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateBacklogItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
  type: BacklogItemType,
  status: BacklogItemStatus.default('todo'),
  effort: BacklogItemEffort.optional(),
  pageContext: z.string().max(500).optional(), // Page/route where item was created
});

export const UpdateBacklogItemSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional().nullable(),
  type: BacklogItemType.optional(),
  status: BacklogItemStatus.optional(),
  effort: BacklogItemEffort.optional().nullable(),
  pageContext: z.string().max(500).optional().nullable(),
});

export const ReorderBacklogSchema = z.object({
  itemId: z.string().uuid(),
  sourceStatus: BacklogItemStatus,
  destinationStatus: BacklogItemStatus,
  newPosition: z.number().int().positive(),
});

export type BacklogItem = z.infer<typeof BacklogItemSchema>;
export type CreateBacklogItem = z.infer<typeof CreateBacklogItemSchema>;
export type UpdateBacklogItem = z.infer<typeof UpdateBacklogItemSchema>;
export type ReorderBacklog = z.infer<typeof ReorderBacklogSchema>;
export type BacklogItemTypeValue = z.infer<typeof BacklogItemType>;
export type BacklogItemStatusValue = z.infer<typeof BacklogItemStatus>;
export type BacklogItemEffortValue = z.infer<typeof BacklogItemEffort>;
