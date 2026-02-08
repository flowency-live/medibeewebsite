import { z } from 'zod';

// UK phone regex (same as enquiry schema)
const ukPhoneRegex = /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/;

// UK postcode regex
const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

/**
 * Position types - HARDCODED
 * TODO: Move to tenant configuration when multi-tenant support is implemented
 */
export const PositionType = z.enum([
  'hca',
  'senior-ca',
  'nurse',
  'carer',
  'support-worker',
]);
export type PositionType = z.infer<typeof PositionType>;

export const POSITION_OPTIONS = [
  { value: 'hca', label: 'HCA (Healthcare Assistant)' },
  { value: 'senior-ca', label: 'Senior Care Assistant' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'carer', label: 'Carer' },
  { value: 'support-worker', label: 'Support Worker' },
] as const;

/**
 * Agency willingness options
 */
export const AgencyWillingness = z.enum(['yes', 'no']);
export type AgencyWillingness = z.infer<typeof AgencyWillingness>;

export const AGENCY_WILLINGNESS_OPTIONS = [
  { value: 'yes', label: 'Yes, I am happy to work for an agency' },
  { value: 'no', label: 'No, I do not want to work for an agency' },
] as const;

/**
 * Experience levels
 */
export const ExperienceLevel = z.enum([
  'none',
  'less-than-3-months',
  '3-6-months',
  '6-12-months',
  'more-than-1-year',
]);
export type ExperienceLevel = z.infer<typeof ExperienceLevel>;

export const EXPERIENCE_OPTIONS = [
  { value: 'none', label: 'No Experience' },
  { value: 'less-than-3-months', label: 'Less than 3 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: '6-12-months', label: '6-12 Months' },
  { value: 'more-than-1-year', label: 'More than 1 Year' },
] as const;

/**
 * VISA status
 */
export const VisaStatus = z.enum(['no', 'student', 'sponsorship']);
export type VisaStatus = z.infer<typeof VisaStatus>;

export const VISA_OPTIONS = [
  { value: 'no', label: 'No (I have indefinite leave to remain or am a UK citizen)' },
  { value: 'student', label: 'Student VISA' },
  { value: 'sponsorship', label: 'Sponsorship VISA' },
] as const;

/**
 * Yes/No options for simple boolean questions
 */
export const YesNo = z.enum(['yes', 'no']);
export type YesNo = z.infer<typeof YesNo>;

export const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
] as const;

/**
 * Travel distance willingness
 */
export const TravelDistance = z.enum(['up-to-10', '10-25', 'more-than-25']);
export type TravelDistance = z.infer<typeof TravelDistance>;

export const TRAVEL_DISTANCE_OPTIONS = [
  { value: 'up-to-10', label: 'Up to 10 Miles' },
  { value: '10-25', label: '10-25 Miles' },
  { value: 'more-than-25', label: 'More than 25 Miles' },
] as const;

/**
 * Weekly hours availability
 */
export const WeeklyHours = z.enum(['up-to-20', '20-40', 'more-than-40']);
export type WeeklyHours = z.infer<typeof WeeklyHours>;

export const WEEKLY_HOURS_OPTIONS = [
  { value: 'up-to-20', label: 'Up to 20 Hours' },
  { value: '20-40', label: '20-40 Hours' },
  { value: 'more-than-40', label: 'More than 40 Hours' },
] as const;

/**
 * Candidate Registration Schema
 */
export const CandidateRegistrationSchema = z.object({
  // Personal Details
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(ukPhoneRegex, 'Please enter a valid UK phone number'),
  city: z.string().optional(),
  postcode: z
    .string()
    .regex(ukPostcodeRegex, 'Please enter a valid UK postcode')
    .optional()
    .or(z.literal('')),

  // CV Upload - will be validated separately as File object
  // The schema validates the metadata, actual file handled by form
  cvFileName: z.string().min(1, 'Please upload your CV'),

  // Position & Preferences
  position: PositionType,
  willingToWorkForAgency: AgencyWillingness,
  experienceLevel: ExperienceLevel,

  // Right to Work
  visaStatus: VisaStatus,

  // Compliance
  hasEnhancedDBS: YesNo,
  hasDrivingLicence: YesNo,

  // Availability
  travelDistance: TravelDistance,
  weeklyHours: WeeklyHours,
});

export type CandidateRegistration = z.infer<typeof CandidateRegistrationSchema>;

/**
 * Labels for display purposes
 */
export const POSITION_LABELS: Record<PositionType, string> = {
  hca: 'HCA (Healthcare Assistant)',
  'senior-ca': 'Senior Care Assistant',
  nurse: 'Nurse',
  carer: 'Carer',
  'support-worker': 'Support Worker',
};

export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  none: 'No Experience',
  'less-than-3-months': 'Less than 3 Months',
  '3-6-months': '3-6 Months',
  '6-12-months': '6-12 Months',
  'more-than-1-year': 'More than 1 Year',
};

export const VISA_LABELS: Record<VisaStatus, string> = {
  no: 'No VISA required',
  student: 'Student VISA',
  sponsorship: 'Sponsorship VISA',
};
