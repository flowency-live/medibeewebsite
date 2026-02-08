import { z } from 'zod';

// UK phone number regex - accepts various formats
const ukPhoneRegex = /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/;

export const ServiceType = z.enum([
  'mental-health',
  'acute-care',
  'private-hospital',
  'care-home',
  'supported-living',
  'end-of-life',
  'other',
]);

export const ExperienceLevel = z.enum([
  'newly-qualified',
  '1-2-years',
  '3-5-years',
  '5-plus-years',
]);

export const ContactMethod = z.enum(['email', 'phone']);

export const CareProviderEnquirySchema = z.object({
  organisationName: z.string().min(2, 'Organisation name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(ukPhoneRegex, 'Please enter a valid UK phone number'),
  serviceType: ServiceType,
  location: z.string().min(1, 'Location is required'),
  requirements: z.string().optional(),
  preferredContact: ContactMethod,
});

export const HCAEnquirySchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(ukPhoneRegex, 'Please enter a valid UK phone number'),
  experienceLevel: ExperienceLevel,
  preferredSettings: z
    .array(ServiceType)
    .min(1, 'Please select at least one care setting'),
  location: z.string().min(1, 'Location is required'),
  message: z.string().optional(),
});

export type CareProviderEnquiry = z.infer<typeof CareProviderEnquirySchema>;
export type HCAEnquiry = z.infer<typeof HCAEnquirySchema>;
export type ServiceTypeValue = z.infer<typeof ServiceType>;
export type ExperienceLevelValue = z.infer<typeof ExperienceLevel>;
