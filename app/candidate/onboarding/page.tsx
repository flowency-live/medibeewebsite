'use client';

/**
 * Candidate Onboarding Page
 *
 * Multi-step profile builder for new candidates after authentication.
 * Steps:
 * 1. Personal Details - Name, phone (if not from phone auth)
 * 2. Location - City, postcode
 * 3. Experience - Level, preferred settings
 * 4. CV Upload - Optional
 */

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Input } from '@/components/ui';

type OnboardingStep = 'personal' | 'location' | 'experience' | 'cv' | 'complete';

interface OnboardingData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  postcode: string;
  experienceLevel: string;
  preferredSettings: string[];
  professionalSummary: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const EXPERIENCE_LEVELS = [
  { value: 'newly-qualified', label: 'Newly Qualified (under 1 year)' },
  { value: '1-2-years', label: '1-2 Years Experience' },
  { value: '3-5-years', label: '3-5 Years Experience' },
  { value: '5-plus-years', label: '5+ Years Experience' },
];

const CARE_SETTINGS = [
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'learning-disabilities', label: 'Learning Disabilities' },
  { value: 'elderly-care', label: 'Elderly Care' },
  { value: 'dementia', label: 'Dementia Care' },
  { value: 'physical-disabilities', label: 'Physical Disabilities' },
  { value: 'rehabilitation', label: 'Rehabilitation' },
  { value: 'community-care', label: 'Community Care' },
  { value: 'supported-living', label: 'Supported Living' },
];

export default function CandidateOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<OnboardingStep>('personal');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<OnboardingData>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    postcode: '',
    experienceLevel: '',
    preferredSettings: [],
    professionalSummary: '',
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/candidates/me`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
          status: 'pending_review', // Mark onboarding complete
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      setStep('complete');
    } catch {
      setError('Failed to save your profile. Please try again.');
    }

    setIsLoading(false);
  };

  const stepNumber = {
    personal: 1,
    location: 2,
    experience: 3,
    cv: 4,
    complete: 5,
  }[step];

  return (
    <section className="min-h-screen bg-void py-8 md:py-12">
      <div className="container-editorial">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/medibee-tile-logo.png"
                alt="Medibee"
                width={50}
                height={50}
              />
            </Link>
            {step !== 'complete' && (
              <>
                <h1 className="font-display text-display-sm text-pearl mb-2">
                  Complete Your Profile
                </h1>
                <p className="font-body text-body-md text-pearl-soft/70">
                  Step {stepNumber} of 4
                </p>
              </>
            )}
          </div>

          {/* Progress Bar */}
          {step !== 'complete' && (
            <div className="mb-8">
              <div className="h-2 bg-void-elevated/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${(stepNumber / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-amber-50 border-l-[3px] border-amber-500" role="alert">
              <p className="font-body text-body-sm text-amber-800">{error}</p>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-void-elevated p-6 md:p-8 rounded-sm border border-white/[0.08]">
            {step === 'personal' && (
              <PersonalStep
                data={data}
                updateData={updateData}
                onNext={() => setStep('location')}
              />
            )}

            {step === 'location' && (
              <LocationStep
                data={data}
                updateData={updateData}
                onBack={() => setStep('personal')}
                onNext={() => setStep('experience')}
              />
            )}

            {step === 'experience' && (
              <ExperienceStep
                data={data}
                updateData={updateData}
                onBack={() => setStep('location')}
                onNext={() => setStep('cv')}
              />
            )}

            {step === 'cv' && (
              <CVStep
                data={data}
                updateData={updateData}
                onBack={() => setStep('experience')}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}

            {step === 'complete' && (
              <CompleteStep onContinue={() => router.push('/candidate/dashboard')} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Step Components
interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
}

function PersonalStep({ data, updateData, onNext }: StepProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext?.();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-pearl mb-2">Personal Details</h2>
        <p className="font-body text-body-sm text-pearl-soft/70">
          Tell us a bit about yourself
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={(e) => updateData({ firstName: e.target.value })}
          error={errors.firstName}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={(e) => updateData({ lastName: e.target.value })}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        value={data.phone}
        onChange={(e) => updateData({ phone: e.target.value })}
        placeholder="07123 456789"
        hint="Optional if you signed in with phone"
      />

      <div className="flex justify-end">
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

function LocationStep({ data, updateData, onBack, onNext }: StepProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!data.city.trim()) newErrors.city = 'City is required';
    if (!data.postcode.trim()) newErrors.postcode = 'Postcode is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext?.();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-pearl mb-2">Your Location</h2>
        <p className="font-body text-body-sm text-pearl-soft/70">
          Help us match you with opportunities near you
        </p>
      </div>

      <Input
        label="City/Town"
        name="city"
        value={data.city}
        onChange={(e) => updateData({ city: e.target.value })}
        error={errors.city}
        placeholder="e.g. Manchester"
        required
      />

      <Input
        label="Postcode"
        name="postcode"
        value={data.postcode}
        onChange={(e) => updateData({ postcode: e.target.value.toUpperCase() })}
        error={errors.postcode}
        placeholder="e.g. M1 1AA"
        required
      />

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

function ExperienceStep({ data, updateData, onBack, onNext }: StepProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!data.experienceLevel) newErrors.experienceLevel = 'Please select your experience level';
    if (data.preferredSettings.length === 0) newErrors.preferredSettings = 'Please select at least one setting';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext?.();
  };

  const toggleSetting = (value: string) => {
    const current = data.preferredSettings;
    if (current.includes(value)) {
      updateData({ preferredSettings: current.filter((s) => s !== value) });
    } else {
      updateData({ preferredSettings: [...current, value] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-pearl mb-2">Your Experience</h2>
        <p className="font-body text-body-sm text-pearl-soft/70">
          Tell us about your healthcare experience
        </p>
      </div>

      <div>
        <label className="block font-body text-body-sm text-pearl mb-2">
          Experience Level <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <label
              key={level.value}
              className={`flex items-center p-3 border rounded-sm cursor-pointer transition-colors ${
                data.experienceLevel === level.value
                  ? 'border-gold bg-gold/5'
                  : 'border-white/10 hover:border-gold/50'
              }`}
            >
              <input
                type="radio"
                name="experienceLevel"
                value={level.value}
                checked={data.experienceLevel === level.value}
                onChange={(e) => updateData({ experienceLevel: e.target.value })}
                className="w-4 h-4 accent-gold"
              />
              <span className="ml-3 font-body text-body-md text-pearl">{level.label}</span>
            </label>
          ))}
        </div>
        {errors.experienceLevel && (
          <p className="mt-1 font-body text-body-sm text-red-600">{errors.experienceLevel}</p>
        )}
      </div>

      <div>
        <label className="block font-body text-body-sm text-pearl mb-2">
          Preferred Care Settings <span className="text-red-500">*</span>
        </label>
        <p className="font-body text-body-sm text-pearl-soft/70 mb-3">
          Select all that apply
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {CARE_SETTINGS.map((setting) => (
            <label
              key={setting.value}
              className={`flex items-center p-3 border rounded-sm cursor-pointer transition-colors ${
                data.preferredSettings.includes(setting.value)
                  ? 'border-gold bg-gold/5'
                  : 'border-white/10 hover:border-gold/50'
              }`}
            >
              <input
                type="checkbox"
                checked={data.preferredSettings.includes(setting.value)}
                onChange={() => toggleSetting(setting.value)}
                className="w-4 h-4 accent-gold"
              />
              <span className="ml-3 font-body text-body-sm text-pearl">{setting.label}</span>
            </label>
          ))}
        </div>
        {errors.preferredSettings && (
          <p className="mt-1 font-body text-body-sm text-red-600">{errors.preferredSettings}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

function CVStep({ data, updateData, onBack, onSubmit, isLoading }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-pearl mb-2">Professional Summary</h2>
        <p className="font-body text-body-sm text-pearl-soft/70">
          Tell us a bit about your experience and career goals
        </p>
      </div>

      <div>
        <label className="block font-body text-body-sm text-pearl mb-2">
          About You
        </label>
        <textarea
          value={data.professionalSummary}
          onChange={(e) => updateData({ professionalSummary: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 border border-white/10 rounded-sm font-body text-body-md text-pearl placeholder:text-pearl-soft/70/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          placeholder="Briefly describe your experience, qualifications, and what you're looking for in your next role..."
        />
        <p className="mt-1 font-body text-body-sm text-pearl-soft/70/60">
          Optional - you can add this later
        </p>
      </div>

      <div className="p-4 bg-slate-blue/5 rounded-sm">
        <p className="font-body text-body-sm text-pearl-soft/70">
          You can upload your CV later from your dashboard. This helps care providers learn more about your qualifications.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Complete Profile'}
        </Button>
      </div>
    </div>
  );
}

function CompleteStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="font-display text-2xl text-pearl mb-2">Profile Complete!</h2>
      <p className="font-body text-body-md text-pearl-soft/70 mb-6">
        Your profile is now being reviewed by our team. We&apos;ll be in touch soon.
      </p>

      <div className="p-4 bg-gold/10 rounded-sm mb-6">
        <h3 className="font-display text-lg text-pearl mb-2">What happens next?</h3>
        <ul className="font-body text-body-sm text-pearl-soft/70 text-left space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-rich-gold mt-1">1.</span>
            <span>Our team will review your profile within 24-48 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rich-gold mt-1">2.</span>
            <span>Once approved, care providers can view your profile</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rich-gold mt-1">3.</span>
            <span>You&apos;ll receive notifications when providers are interested</span>
          </li>
        </ul>
      </div>

      <Button onClick={onContinue} fullWidth>
        Go to Dashboard
      </Button>
    </div>
  );
}
