import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ReorderBacklogSchema } from '@/lib/schemas/backlog';
import { reorderBacklogItem } from '@/lib/services/backlogService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ReorderBacklogSchema.parse(body);

    const success = await reorderBacklogItem(validated);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Item not found or reorder failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Failed to reorder backlog item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reorder backlog item' },
      { status: 500 }
    );
  }
}
