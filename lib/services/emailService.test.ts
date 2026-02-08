import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { CareProviderEnquiry, HCAEnquiry } from '../schemas/enquiry';

// Create mockSend as hoisted variable
let mockSend: ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockSend = vi.fn();
});

vi.mock('@aws-sdk/client-ses', () => {
  const mockFn = vi.fn();
  return {
    SESClient: vi.fn(() => ({
      send: (...args: unknown[]) => mockFn(...args),
    })),
    SendEmailCommand: vi.fn((params) => params),
    __mockSend: mockFn,
  };
});

// Import after mocking
import { sendEnquiryEmail, formatCareProviderEmail, formatHCAEmail } from './emailService';
import * as ses from '@aws-sdk/client-ses';

describe('formatCareProviderEmail', () => {
  const enquiry: CareProviderEnquiry = {
    organisationName: 'Test NHS Trust',
    contactName: 'Jane Smith',
    role: 'HR Manager',
    email: 'jane@testnhs.uk',
    phone: '020 1234 5678',
    serviceType: 'mental-health',
    location: 'London',
    requirements: 'We need 5 HCAs for night shifts',
    preferredContact: 'email',
  };

  it('formats email subject with organisation name', () => {
    const result = formatCareProviderEmail(enquiry);
    expect(result.subject).toContain('Test NHS Trust');
  });

  it('includes all enquiry fields in body', () => {
    const result = formatCareProviderEmail(enquiry);
    expect(result.body).toContain('Test NHS Trust');
    expect(result.body).toContain('Jane Smith');
    expect(result.body).toContain('HR Manager');
    expect(result.body).toContain('jane@testnhs.uk');
    expect(result.body).toContain('020 1234 5678');
    expect(result.body).toContain('Mental Health');
    expect(result.body).toContain('London');
    expect(result.body).toContain('We need 5 HCAs for night shifts');
    expect(result.body).toContain('email');
  });

  it('handles missing optional requirements', () => {
    const { requirements, ...enquiryWithoutRequirements } = enquiry;
    const result = formatCareProviderEmail(enquiryWithoutRequirements as CareProviderEnquiry);
    expect(result.body).not.toContain('undefined');
  });

  it('formats service type as readable label', () => {
    const result = formatCareProviderEmail(enquiry);
    expect(result.body).toContain('Mental Health');
  });
});

describe('formatHCAEmail', () => {
  const enquiry: HCAEnquiry = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '07700 123456',
    experienceLevel: '3-5-years',
    preferredSettings: ['mental-health', 'care-home'],
    location: 'Manchester',
    message: 'Looking for flexible shifts',
  };

  it('formats email subject with applicant name', () => {
    const result = formatHCAEmail(enquiry);
    expect(result.subject).toContain('John Doe');
  });

  it('includes all enquiry fields in body', () => {
    const result = formatHCAEmail(enquiry);
    expect(result.body).toContain('John Doe');
    expect(result.body).toContain('john@example.com');
    expect(result.body).toContain('07700 123456');
    expect(result.body).toContain('3-5 years');
    expect(result.body).toContain('Manchester');
    expect(result.body).toContain('Looking for flexible shifts');
  });

  it('formats multiple preferred settings', () => {
    const result = formatHCAEmail(enquiry);
    expect(result.body).toContain('Mental Health');
    expect(result.body).toContain('Care Home');
  });

  it('handles missing optional message', () => {
    const { message, ...enquiryWithoutMessage } = enquiry;
    const result = formatHCAEmail(enquiryWithoutMessage as HCAEnquiry);
    expect(result.body).not.toContain('undefined');
  });

  it('formats experience level as readable label', () => {
    const result = formatHCAEmail(enquiry);
    expect(result.body).toContain('3-5 years');
  });
});

describe('sendEnquiryEmail', () => {
  const getMockSend = () => (ses as unknown as { __mockSend: ReturnType<typeof vi.fn> }).__mockSend;

  beforeEach(() => {
    vi.clearAllMocks();
    getMockSend().mockResolvedValue({ MessageId: 'test-message-id' });
  });

  it('sends care provider enquiry email', async () => {
    const enquiry: CareProviderEnquiry = {
      organisationName: 'Test NHS Trust',
      contactName: 'Jane Smith',
      role: 'HR Manager',
      email: 'jane@testnhs.uk',
      phone: '020 1234 5678',
      serviceType: 'mental-health',
      location: 'London',
      preferredContact: 'email',
    };

    const result = await sendEnquiryEmail('care-provider', enquiry);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.messageId).toBe('test-message-id');
    }
  });

  it('sends HCA enquiry email', async () => {
    const enquiry: HCAEnquiry = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '07700 123456',
      experienceLevel: '3-5-years',
      preferredSettings: ['mental-health'],
      location: 'Manchester',
    };

    const result = await sendEnquiryEmail('hca', enquiry);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.messageId).toBe('test-message-id');
    }
  });

  it('returns error on SES failure', async () => {
    getMockSend().mockRejectedValueOnce(new Error('SES error'));

    const enquiry: HCAEnquiry = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '07700 123456',
      experienceLevel: '3-5-years',
      preferredSettings: ['mental-health'],
      location: 'Manchester',
    };

    const result = await sendEnquiryEmail('hca', enquiry);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeDefined();
    }
  });
});
