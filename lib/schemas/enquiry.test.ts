import { describe, it, expect } from 'vitest';
import {
  CareProviderEnquirySchema,
  HCAEnquirySchema,
  ServiceType,
  ExperienceLevel,
} from './enquiry';

describe('CareProviderEnquirySchema', () => {
  const validData = {
    organisationName: 'Test NHS Trust',
    contactName: 'Jane Smith',
    role: 'HR Manager',
    email: 'jane@testnhs.uk',
    phone: '020 1234 5678',
    serviceType: 'mental-health' as const,
    location: 'London',
    requirements: 'We need 5 HCAs for night shifts',
    preferredContact: 'email' as const,
  };

  it('validates correct care provider data', () => {
    const result = CareProviderEnquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('requires organisation name', () => {
    const data = { ...validData, organisationName: '' };
    const result = CareProviderEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('organisationName');
    }
  });

  it('requires contact name with minimum length', () => {
    const data = { ...validData, contactName: 'J' };
    const result = CareProviderEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires valid email format', () => {
    const data = { ...validData, email: 'not-an-email' };
    const result = CareProviderEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('requires valid UK phone format', () => {
    const data = { ...validData, phone: '12345' };
    const result = CareProviderEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone');
    }
  });

  it('accepts various UK phone formats', () => {
    const phones = [
      '020 1234 5678',
      '07700 123456',
      '+44 7700 123456',
      '02012345678',
      '+447700123456',
    ];

    phones.forEach((phone) => {
      const data = { ...validData, phone };
      const result = CareProviderEnquirySchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  it('validates service type is valid enum value', () => {
    const data = { ...validData, serviceType: 'invalid-type' };
    const result = CareProviderEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('accepts all valid service types', () => {
    const types: (typeof ServiceType._type)[] = [
      'mental-health',
      'acute-care',
      'private-hospital',
      'care-home',
      'supported-living',
      'end-of-life',
      'other',
    ];

    types.forEach((serviceType) => {
      const data = { ...validData, serviceType };
      const result = CareProviderEnquirySchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  it('allows requirements to be optional', () => {
    const { requirements, ...dataWithoutRequirements } = validData;
    const result = CareProviderEnquirySchema.safeParse(dataWithoutRequirements);
    expect(result.success).toBe(true);
  });

  it('requires location', () => {
    const data = { ...validData, location: '' };
    const result = CareProviderEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe('HCAEnquirySchema', () => {
  const validData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '07700 123456',
    experienceLevel: '3-5-years' as const,
    preferredSettings: ['mental-health', 'care-home'] as const,
    location: 'Manchester',
    message: 'Looking for flexible shifts',
  };

  it('validates correct HCA data', () => {
    const result = HCAEnquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('requires full name with minimum length', () => {
    const data = { ...validData, fullName: 'J' };
    const result = HCAEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires valid email', () => {
    const data = { ...validData, email: 'invalid' };
    const result = HCAEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires valid UK phone', () => {
    const data = { ...validData, phone: '123' };
    const result = HCAEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('validates experience level is valid enum', () => {
    const data = { ...validData, experienceLevel: 'invalid' };
    const result = HCAEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('accepts all valid experience levels', () => {
    const levels: (typeof ExperienceLevel._type)[] = [
      'newly-qualified',
      '1-2-years',
      '3-5-years',
      '5-plus-years',
    ];

    levels.forEach((experienceLevel) => {
      const data = { ...validData, experienceLevel };
      const result = HCAEnquirySchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  it('requires at least one preferred setting', () => {
    const data = { ...validData, preferredSettings: [] };
    const result = HCAEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('validates preferred settings are valid enum values', () => {
    const data = { ...validData, preferredSettings: ['invalid-setting'] };
    const result = HCAEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('requires location', () => {
    const data = { ...validData, location: '' };
    const result = HCAEnquirySchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('allows message to be optional', () => {
    const { message, ...dataWithoutMessage } = validData;
    const result = HCAEnquirySchema.safeParse(dataWithoutMessage);
    expect(result.success).toBe(true);
  });
});
