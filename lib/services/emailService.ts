import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { CareProviderEnquiry, HCAEnquiry } from '../schemas/enquiry';
import { siteConfig } from '../config/site';

const sesClient = new SESClient({ region: 'eu-west-2' });

const SERVICE_TYPE_LABELS: Record<string, string> = {
  'mental-health': 'Mental Health',
  'acute-care': 'Acute Care',
  'private-hospital': 'Private Hospital',
  'care-home': 'Care Home',
  'supported-living': 'Supported Living',
  'end-of-life': 'End of Life',
  other: 'Other',
};

const EXPERIENCE_LEVEL_LABELS: Record<string, string> = {
  'newly-qualified': 'Newly Qualified',
  '1-2-years': '1-2 years',
  '3-5-years': '3-5 years',
  '5-plus-years': '5+ years',
};

interface FormattedEmail {
  subject: string;
  body: string;
}

export function formatCareProviderEmail(enquiry: CareProviderEnquiry): FormattedEmail {
  const serviceTypeLabel = SERVICE_TYPE_LABELS[enquiry.serviceType] ?? enquiry.serviceType;

  const subject = `New Care Provider Enquiry: ${enquiry.organisationName}`;

  const body = `
New Care Provider Enquiry

Organisation Details
--------------------
Organisation: ${enquiry.organisationName}
Contact Name: ${enquiry.contactName}
Role: ${enquiry.role}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Preferred Contact Method: ${enquiry.preferredContact}

Service Requirements
--------------------
Service Type: ${serviceTypeLabel}
Location: ${enquiry.location}
${enquiry.requirements ? `Requirements: ${enquiry.requirements}` : ''}

---
Sent via ${siteConfig.name} website
`.trim();

  return { subject, body };
}

export function formatHCAEmail(enquiry: HCAEnquiry): FormattedEmail {
  const experienceLabel = EXPERIENCE_LEVEL_LABELS[enquiry.experienceLevel] ?? enquiry.experienceLevel;
  const settingsLabels = enquiry.preferredSettings
    .map((s) => SERVICE_TYPE_LABELS[s] ?? s)
    .join(', ');

  const subject = `New HCA Application: ${enquiry.fullName}`;

  const body = `
New Healthcare Assistant Application

Applicant Details
-----------------
Full Name: ${enquiry.fullName}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Location: ${enquiry.location}

Experience & Preferences
------------------------
Experience Level: ${experienceLabel}
Preferred Care Settings: ${settingsLabels}
${enquiry.message ? `Message: ${enquiry.message}` : ''}

---
Sent via ${siteConfig.name} website
`.trim();

  return { subject, body };
}

type SendEmailResult =
  | { success: true; messageId: string }
  | { success: false; error: string };

export async function sendEnquiryEmail(
  type: 'care-provider' | 'hca',
  data: CareProviderEnquiry | HCAEnquiry
): Promise<SendEmailResult> {
  const { subject, body } =
    type === 'care-provider'
      ? formatCareProviderEmail(data as CareProviderEnquiry)
      : formatHCAEmail(data as HCAEnquiry);

  const command = new SendEmailCommand({
    Source: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
    Destination: {
      ToAddresses: [siteConfig.email],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: { Data: body },
      },
    },
  });

  try {
    const response = await sesClient.send(command);
    return { success: true, messageId: response.MessageId ?? '' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}
