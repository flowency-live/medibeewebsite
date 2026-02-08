'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CandidateRegistrationSchema,
  type CandidateRegistration,
  POSITION_OPTIONS,
  AGENCY_WILLINGNESS_OPTIONS,
  EXPERIENCE_OPTIONS,
  VISA_OPTIONS,
  YES_NO_OPTIONS,
  TRAVEL_DISTANCE_OPTIONS,
  WEEKLY_HOURS_OPTIONS,
} from '@/lib/schemas/candidate';
import { Button, Input, RadioGroup, FileInput } from '@/components/ui';

interface CandidateRegistrationFormProps {
  onSubmit: (data: CandidateRegistration, cvFile: File | null) => Promise<void>;
}

export function CandidateRegistrationForm({
  onSubmit,
}: CandidateRegistrationFormProps) {
  const [cvFile, setCvFile] = React.useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CandidateRegistration>({
    resolver: zodResolver(CandidateRegistrationSchema),
  });

  // Watch radio values for controlled components
  const position = watch('position');
  const willingToWorkForAgency = watch('willingToWorkForAgency');
  const experienceLevel = watch('experienceLevel');
  const visaStatus = watch('visaStatus');
  const hasEnhancedDBS = watch('hasEnhancedDBS');
  const hasDrivingLicence = watch('hasDrivingLicence');
  const travelDistance = watch('travelDistance');
  const weeklyHours = watch('weeklyHours');

  const handleFormSubmit = async (data: CandidateRegistration) => {
    await onSubmit(data, cvFile);
  };

  const handleFileChange = (file: File | null) => {
    setCvFile(file);
    setValue('cvFileName', file?.name ?? '', { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Personal Details Section */}
      <section>
        <h2 className="font-display text-display-sm text-deep-slate mb-6">
          Personal Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
            required
          />
          <Input
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
            required
          />
          <Input
            label="Email Address"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            required
          />
          <Input
            label="Telephone Number"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="07700 123456"
            required
          />
          <Input
            label="City of Residence"
            {...register('city')}
            error={errors.city?.message}
          />
          <Input
            label="Post Code"
            {...register('postcode')}
            error={errors.postcode?.message}
            placeholder="SW1A 1AA"
          />
        </div>
      </section>

      {/* CV Upload Section */}
      <section>
        <h2 className="font-display text-display-sm text-deep-slate mb-6">
          Your CV
        </h2>
        <FileInput
          label="Upload your CV"
          name="cv"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          error={errors.cvFileName?.message}
          hint="We accept PDF, DOC, and DOCX files up to 5MB"
          required
        />
        {/* Hidden input for form validation */}
        <input type="hidden" {...register('cvFileName')} />
      </section>

      {/* Position & Preferences Section */}
      <section>
        <h2 className="font-display text-display-sm text-deep-slate mb-6">
          Position & Preferences
        </h2>
        <div className="space-y-6">
          <RadioGroup
            label="What position are you applying for?"
            name="position"
            options={POSITION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={position}
            onChange={(v) => setValue('position', v as typeof position, { shouldValidate: true })}
            error={errors.position?.message}
            columns={2}
            required
          />

          <RadioGroup
            label="Are you willing to work for an agency?"
            name="willingToWorkForAgency"
            options={AGENCY_WILLINGNESS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={willingToWorkForAgency}
            onChange={(v) => setValue('willingToWorkForAgency', v as typeof willingToWorkForAgency, { shouldValidate: true })}
            error={errors.willingToWorkForAgency?.message}
            required
          />

          <RadioGroup
            label="How much UK professional care experience do you have?"
            name="experienceLevel"
            options={EXPERIENCE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={experienceLevel}
            onChange={(v) => setValue('experienceLevel', v as typeof experienceLevel, { shouldValidate: true })}
            error={errors.experienceLevel?.message}
            columns={2}
            required
          />
        </div>
      </section>

      {/* Right to Work Section */}
      <section>
        <h2 className="font-display text-display-sm text-deep-slate mb-6">
          Right to Work
        </h2>
        <RadioGroup
          label="Are you working in the UK on a Student or Sponsor VISA?"
          name="visaStatus"
          options={VISA_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          value={visaStatus}
          onChange={(v) => setValue('visaStatus', v as typeof visaStatus, { shouldValidate: true })}
          error={errors.visaStatus?.message}
          required
        />
      </section>

      {/* Compliance Section */}
      <section>
        <h2 className="font-display text-display-sm text-deep-slate mb-6">
          Compliance & Checks
        </h2>
        <div className="space-y-6">
          <RadioGroup
            label="Do you have a valid Enhanced DBS?"
            name="hasEnhancedDBS"
            options={YES_NO_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={hasEnhancedDBS}
            onChange={(v) => setValue('hasEnhancedDBS', v as typeof hasEnhancedDBS, { shouldValidate: true })}
            error={errors.hasEnhancedDBS?.message}
            columns={2}
            required
          />

          <RadioGroup
            label="Do you have a full UK Driving Licence & Access to a vehicle?"
            name="hasDrivingLicence"
            options={YES_NO_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={hasDrivingLicence}
            onChange={(v) => setValue('hasDrivingLicence', v as typeof hasDrivingLicence, { shouldValidate: true })}
            error={errors.hasDrivingLicence?.message}
            columns={2}
            required
          />
        </div>
      </section>

      {/* Availability Section */}
      <section>
        <h2 className="font-display text-display-sm text-deep-slate mb-6">
          Availability
        </h2>
        <div className="space-y-6">
          <RadioGroup
            label="How far are you willing to travel for work?"
            name="travelDistance"
            options={TRAVEL_DISTANCE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={travelDistance}
            onChange={(v) => setValue('travelDistance', v as typeof travelDistance, { shouldValidate: true })}
            error={errors.travelDistance?.message}
            columns={3}
            required
          />

          <RadioGroup
            label="How many hours can you work each week?"
            name="weeklyHours"
            options={WEEKLY_HOURS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            value={weeklyHours}
            onChange={(v) => setValue('weeklyHours', v as typeof weeklyHours, { shouldValidate: true })}
            error={errors.weeklyHours?.message}
            columns={3}
            required
          />
        </div>
      </section>

      {/* Submit */}
      <div className="pt-6 border-t border-neutral-grey/30">
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          className="bg-rich-gold text-ink hover:bg-soft-gold"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
        <p className="font-body text-body-sm text-neutral-grey mt-4 text-center">
          By submitting this form, you agree to our{' '}
          <a href="/privacy-policy" className="text-rich-gold hover:text-deep-slate underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
