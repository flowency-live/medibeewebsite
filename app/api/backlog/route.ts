import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CreateBacklogItemSchema } from '@/lib/schemas/backlog';
import {
  listBacklogItems,
  createBacklogItem,
} from '@/lib/services/backlogService';

export async function GET() {
  try {
    const items = await listBacklogItems();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Failed to list backlog items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch backlog items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateBacklogItemSchema.parse(body);
    const item = await createBacklogItem(validated);

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Failed to create backlog item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create backlog item' },
      { status: 500 }
    );
  }
}
