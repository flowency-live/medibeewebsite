import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UpdateBacklogItemSchema } from '@/lib/schemas/backlog';
import {
  getBacklogItem,
  updateBacklogItem,
  deleteBacklogItem,
} from '@/lib/services/backlogService';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const item = await getBacklogItem(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Failed to get backlog item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch backlog item' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = UpdateBacklogItemSchema.parse(body);

    const item = await updateBacklogItem(id, validated);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Failed to update backlog item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update backlog item' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deleted = await deleteBacklogItem(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete backlog item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete backlog item' },
      { status: 500 }
    );
  }
}
