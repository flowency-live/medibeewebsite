/**
 * Test Personas
 *
 * 5 realistic UK healthcare worker profiles for showcasing the platform.
 * Each has varied profile states, credential statuses, and introduction activity.
 */

import type { CandidateProfile } from '@/lib/auth/types';
import type { Credential } from '@/components/portal/CredentialCard';
import type { Introduction } from '@/components/portal/IntroductionCard';

// ============================================
// PERSONA 1: Amara Okonkwo
// Experienced mental health specialist, fully verified
// ============================================

export const amaraProfile: CandidateProfile = {
  candidateId: 'CAND-001',
  firstName: 'Amara',
  lastName: 'Okonkwo',
  email: 'amara.okonkwo@example.com',
  phone: '07700 900123',
  city: 'Bournemouth',
  postcode: 'BH8 8DX',
  experienceLevel: '5-plus-years',
  preferredSettings: ['mental-health', 'acute-care', 'supported-living'],
  professionalSummary:
    'Compassionate and experienced mental health support worker with over 6 years of experience in acute psychiatric settings. Skilled in de-escalation techniques, medication administration, and person-centred care planning. Passionate about supporting individuals on their recovery journey.',
  rightToWork: true,
  dbsStatus: 'cleared',
  available: true,
  cvUploaded: true,
  status: 'active',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-03-10T14:30:00Z',
};

export const amaraCredentials: Credential[] = [
  {
    id: 'cred-a1',
    type: 'dbs',
    name: 'Enhanced DBS with Adult Barred List',
    status: 'verified',
    verifiedDate: '2024-01-20',
    expiryDate: '2027-01-20',
    documentKey: 'credentials/amara-dbs.pdf',
  },
  {
    id: 'cred-a2',
    type: 'rtw',
    name: 'Right to Work - British Passport',
    status: 'verified',
    verifiedDate: '2024-01-18',
    documentKey: 'credentials/amara-rtw.pdf',
  },
  {
    id: 'cred-a3',
    type: 'nvq',
    name: 'NVQ Level 3 Health and Social Care',
    status: 'verified',
    verifiedDate: '2024-01-22',
    documentKey: 'credentials/amara-nvq.pdf',
  },
  {
    id: 'cred-a4',
    type: 'training',
    name: 'PMVA Training Certificate',
    status: 'verified',
    verifiedDate: '2024-02-01',
    expiryDate: '2025-02-01',
    documentKey: 'credentials/amara-pmva.pdf',
  },
  {
    id: 'cred-a5',
    type: 'training',
    name: 'Medication Administration (Level 3)',
    status: 'verified',
    verifiedDate: '2024-02-05',
    expiryDate: '2025-02-05',
    documentKey: 'credentials/amara-meds.pdf',
  },
];

export const amaraIntroductions: Introduction[] = [
  {
    id: 'intro-a1',
    clientName: 'Pines Mental Health Unit',
    clientType: 'Mental Health',
    location: 'Poole',
    roleTitle: 'Senior Mental Health Support Worker',
    status: 'pending',
    requestedAt: new Date().toISOString(),
    message:
      'We have an opening for a senior support worker on our acute ward. Your experience with PMVA and medication administration makes you an excellent candidate.',
  },
  {
    id: 'intro-a2',
    clientName: 'Horizon Supported Living',
    clientType: 'Supported Living',
    location: 'Christchurch',
    status: 'completed',
    requestedAt: '2024-02-15T09:00:00Z',
    respondedAt: '2024-02-15T14:00:00Z',
    completedAt: '2024-02-17T10:00:00Z',
  },
];

// ============================================
// PERSONA 2: James Fletcher
// Newly qualified, eager starter, partial credentials
// ============================================

export const jamesProfile: CandidateProfile = {
  candidateId: 'CAND-002',
  firstName: 'James',
  lastName: 'Fletcher',
  email: 'james.fletcher@example.com',
  phone: '07700 900456',
  city: 'Bristol',
  postcode: 'BS1 4DJ',
  experienceLevel: 'newly-qualified',
  preferredSettings: ['care-home', 'supported-living'],
  professionalSummary:
    'Recently qualified healthcare assistant with 6 months experience in a residential care home. Enthusiastic about providing dignified care to elderly residents. Currently completing NVQ Level 2 in Health and Social Care.',
  rightToWork: true,
  dbsStatus: 'pending',
  available: true,
  cvUploaded: true,
  status: 'pending_review',
  createdAt: '2024-03-01T08:00:00Z',
};

export const jamesCredentials: Credential[] = [
  {
    id: 'cred-j1',
    type: 'dbs',
    name: 'Enhanced DBS Certificate',
    status: 'under-review',
    documentKey: 'credentials/james-dbs.pdf',
  },
  {
    id: 'cred-j2',
    type: 'rtw',
    name: 'Right to Work - British Passport',
    status: 'verified',
    verifiedDate: '2024-03-02',
    documentKey: 'credentials/james-rtw.pdf',
  },
  {
    id: 'cred-j3',
    type: 'training',
    name: 'Care Certificate',
    status: 'verified',
    verifiedDate: '2024-03-03',
    documentKey: 'credentials/james-care-cert.pdf',
  },
];

export const jamesIntroductions: Introduction[] = [];

// ============================================
// PERSONA 3: Priya Sharma
// NHS acute care experience, looking for private work
// ============================================

export const priyaProfile: CandidateProfile = {
  candidateId: 'CAND-003',
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya.sharma@example.com',
  phone: '07700 900789',
  city: 'London',
  postcode: 'SW1A 1AA',
  experienceLevel: '3-5-years',
  preferredSettings: ['acute-care', 'private-hospital'],
  professionalSummary:
    'Experienced Band 3 Healthcare Assistant with 4 years in NHS acute care settings. Skilled in patient observations, ECG recording, and post-operative care. Seeking opportunities in private healthcare for better work-life balance.',
  rightToWork: true,
  dbsStatus: 'cleared',
  available: true,
  cvUploaded: true,
  status: 'active',
  createdAt: '2024-02-01T11:00:00Z',
  updatedAt: '2024-03-08T09:15:00Z',
};

export const priyaCredentials: Credential[] = [
  {
    id: 'cred-p1',
    type: 'dbs',
    name: 'Enhanced DBS Certificate',
    status: 'verified',
    verifiedDate: '2024-02-05',
    expiryDate: '2027-02-05',
    documentKey: 'credentials/priya-dbs.pdf',
  },
  {
    id: 'cred-p2',
    type: 'rtw',
    name: 'Right to Work - BRP Card',
    status: 'verified',
    verifiedDate: '2024-02-03',
    expiryDate: '2029-06-15',
    documentKey: 'credentials/priya-rtw.pdf',
  },
  {
    id: 'cred-p3',
    type: 'nvq',
    name: 'NVQ Level 2 Health and Social Care',
    status: 'verified',
    verifiedDate: '2024-02-06',
    documentKey: 'credentials/priya-nvq.pdf',
  },
  {
    id: 'cred-p4',
    type: 'training',
    name: 'Phlebotomy Certificate',
    status: 'verified',
    verifiedDate: '2024-02-10',
    expiryDate: '2025-02-10',
    documentKey: 'credentials/priya-phlebotomy.pdf',
  },
  {
    id: 'cred-p5',
    type: 'reference',
    name: 'NHS Trust Reference',
    status: 'verified',
    verifiedDate: '2024-02-08',
    documentKey: 'credentials/priya-ref.pdf',
  },
];

export const priyaIntroductions: Introduction[] = [
  {
    id: 'intro-p1',
    clientName: 'Harley Street Medical Centre',
    clientType: 'Private Hospital',
    location: 'London',
    roleTitle: 'Healthcare Assistant - Outpatients',
    status: 'facilitating',
    requestedAt: '2024-03-05T10:00:00Z',
    respondedAt: '2024-03-05T18:00:00Z',
    message:
      'We are expanding our outpatient services and looking for experienced HCAs with NHS background. Your phlebotomy skills would be particularly valuable.',
  },
  {
    id: 'intro-p2',
    clientName: 'St Mary\'s Private Hospital',
    clientType: 'Private Hospital',
    location: 'Southampton',
    status: 'pending',
    requestedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// ============================================
// PERSONA 4: David Chen
// End-of-life care specialist, highly experienced
// ============================================

export const davidProfile: CandidateProfile = {
  candidateId: 'CAND-004',
  firstName: 'David',
  lastName: 'Chen',
  email: 'david.chen@example.com',
  phone: '07700 900321',
  city: 'Southampton',
  postcode: 'SO14 7LP',
  experienceLevel: '5-plus-years',
  preferredSettings: ['end-of-life', 'care-home', 'supported-living'],
  professionalSummary:
    'Dedicated palliative care specialist with 8 years of experience providing compassionate end-of-life care. Trained in syringe driver management, symptom control, and family support. Known for calm, dignified approach during difficult times.',
  rightToWork: true,
  dbsStatus: 'cleared',
  available: true,
  cvUploaded: true,
  status: 'active',
  createdAt: '2023-11-01T09:00:00Z',
  updatedAt: '2024-03-01T16:00:00Z',
};

export const davidCredentials: Credential[] = [
  {
    id: 'cred-d1',
    type: 'dbs',
    name: 'Enhanced DBS with Adult & Child Barred Lists',
    status: 'verified',
    verifiedDate: '2023-11-05',
    expiryDate: '2026-11-05',
    documentKey: 'credentials/david-dbs.pdf',
  },
  {
    id: 'cred-d2',
    type: 'rtw',
    name: 'Right to Work - British Passport',
    status: 'verified',
    verifiedDate: '2023-11-03',
    documentKey: 'credentials/david-rtw.pdf',
  },
  {
    id: 'cred-d3',
    type: 'nvq',
    name: 'NVQ Level 4 Health and Social Care',
    status: 'verified',
    verifiedDate: '2023-11-08',
    documentKey: 'credentials/david-nvq.pdf',
  },
  {
    id: 'cred-d4',
    type: 'training',
    name: 'End of Life Care Training (Gold Standards)',
    status: 'verified',
    verifiedDate: '2024-01-15',
    expiryDate: '2026-01-15',
    documentKey: 'credentials/david-eolc.pdf',
  },
  {
    id: 'cred-d5',
    type: 'training',
    name: 'Syringe Driver Competency',
    status: 'expiring',
    verifiedDate: '2023-04-20',
    expiryDate: '2024-04-20',
    documentKey: 'credentials/david-syringe.pdf',
  },
];

export const davidIntroductions: Introduction[] = [
  {
    id: 'intro-d1',
    clientName: 'Willowbrook Hospice',
    clientType: 'End of Life Care',
    location: 'Southampton',
    roleTitle: 'Senior Healthcare Assistant',
    status: 'completed',
    requestedAt: '2024-01-20T08:00:00Z',
    respondedAt: '2024-01-20T12:00:00Z',
    completedAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 'intro-d2',
    clientName: 'Peaceful Gardens Care Home',
    clientType: 'Care Home',
    location: 'Eastleigh',
    status: 'completed',
    requestedAt: '2024-02-10T09:00:00Z',
    respondedAt: '2024-02-10T11:00:00Z',
    completedAt: '2024-02-12T14:00:00Z',
  },
  {
    id: 'intro-d3',
    clientName: 'St Joseph\'s Nursing Home',
    clientType: 'Nursing Home',
    location: 'Winchester',
    roleTitle: 'Palliative Care Support Worker',
    status: 'pending',
    requestedAt: new Date().toISOString(),
    message:
      'We are looking for an experienced palliative care worker to join our nursing team. Your Gold Standards training and syringe driver competency would be ideal for our residents.',
  },
];

// ============================================
// PERSONA 5: Sarah Williams
// Returning after career break, part-time only
// ============================================

export const sarahProfile: CandidateProfile = {
  candidateId: 'CAND-005',
  firstName: 'Sarah',
  lastName: 'Williams',
  email: 'sarah.williams@example.com',
  phone: '07700 900654',
  city: 'Dorchester',
  postcode: 'DT1 1XJ',
  experienceLevel: '1-2-years',
  preferredSettings: ['care-home', 'community'],
  professionalSummary:
    'Returning to healthcare after a 3-year career break to raise my family. Previously worked 2 years as an HCA in residential care. Looking for part-time or flexible hours to balance work and family commitments.',
  rightToWork: true,
  dbsStatus: 'not-started',
  available: true,
  cvUploaded: false,
  status: 'pending_verification',
  createdAt: '2024-03-15T10:00:00Z',
};

export const sarahCredentials: Credential[] = [
  {
    id: 'cred-s1',
    type: 'dbs',
    name: 'Enhanced DBS Certificate',
    status: 'pending',
  },
  {
    id: 'cred-s2',
    type: 'rtw',
    name: 'Right to Work',
    status: 'pending',
  },
];

export const sarahIntroductions: Introduction[] = [];

// ============================================
// Export All Personas
// ============================================

export interface PersonaData {
  profile: CandidateProfile;
  credentials: Credential[];
  introductions: Introduction[];
}

export const personas: Record<string, PersonaData> = {
  amara: {
    profile: amaraProfile,
    credentials: amaraCredentials,
    introductions: amaraIntroductions,
  },
  james: {
    profile: jamesProfile,
    credentials: jamesCredentials,
    introductions: jamesIntroductions,
  },
  priya: {
    profile: priyaProfile,
    credentials: priyaCredentials,
    introductions: priyaIntroductions,
  },
  david: {
    profile: davidProfile,
    credentials: davidCredentials,
    introductions: davidIntroductions,
  },
  sarah: {
    profile: sarahProfile,
    credentials: sarahCredentials,
    introductions: sarahIntroductions,
  },
};

/**
 * Get a specific persona by name
 */
export function getPersona(name: keyof typeof personas): PersonaData {
  return personas[name];
}

/**
 * Get all personas as an array
 */
export function getAllPersonas(): PersonaData[] {
  return Object.values(personas);
}

/**
 * Summary of test personas for documentation:
 *
 * | # | Name            | Experience       | Status              | Credentials | Introductions |
 * |---|-----------------|------------------|---------------------|-------------|---------------|
 * | 1 | Amara Okonkwo   | 5+ years MH      | Active (verified)   | 5 verified  | 1 pending, 1 completed |
 * | 2 | James Fletcher  | Newly qualified  | Pending review      | 2 verified, 1 under-review | None |
 * | 3 | Priya Sharma    | 3-5 years acute  | Active (verified)   | 5 verified  | 1 facilitating, 1 pending |
 * | 4 | David Chen      | 5+ years EOL     | Active (verified)   | 4 verified, 1 expiring | 2 completed, 1 pending |
 * | 5 | Sarah Williams  | 1-2 years (break)| Pending verification| 0 (2 pending) | None |
 */
