import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  CareProviderEnquirySchema,
  HCAEnquirySchema,
} from '@/lib/schemas/enquiry';
import { sendEnquiryEmail } from '@/lib/services/emailService';

const EnquiryRequestSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('care-provider'),
    data: CareProviderEnquirySchema,
  }),
  z.object({
    type: z.literal('hca'),
    data: HCAEnquirySchema,
  }),
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = EnquiryRequestSchema.parse(body);

    const result = await sendEnquiryEmail(validated.type, validated.data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
