'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HCAEnquirySchema, type HCAEnquiry } from '@/lib/schemas/enquiry';
import { Input, Select, Textarea, Checkbox, Button } from '@/components/ui';

const EXPERIENCE_LEVEL_OPTIONS = [
  { value: 'newly-qualified', label: 'Newly Qualified' },
  { value: '1-2-years', label: '1-2 Years' },
  { value: '3-5-years', label: '3-5 Years' },
  { value: '5-plus-years', label: '5+ Years' },
];

const CARE_SETTINGS = [
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'acute-care', label: 'Acute Care' },
  { value: 'private-hospital', label: 'Private Hospital' },
  { value: 'care-home', label: 'Care Home' },
  { value: 'supported-living', label: 'Supported Living' },
  { value: 'end-of-life', label: 'End of Life' },
  { value: 'other', label: 'Other' },
];

interface HCAFormProps {
  onSubmit: (data: HCAEnquiry) => void | Promise<void>;
}

export function HCAForm({ onSubmit }: HCAFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<HCAEnquiry>({
    resolver: zodResolver(HCAEnquirySchema),
    defaultValues: {
      preferredSettings: [],
    },
  });

  const selectedSettings = watch('preferredSettings') || [];

  // Focus first error field after validation
  React.useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorField = formRef.current?.querySelector(
        `[name="${errorKeys[0]}"]`
      ) as HTMLElement | null;
      firstErrorField?.focus();
    }
  }, [errors]);

  const handleSettingChange = (value: string, checked: boolean) => {
    const current = selectedSettings;
    if (checked) {
      setValue('preferredSettings', [...current, value] as HCAEnquiry['preferredSettings']);
    } else {
      setValue(
        'preferredSettings',
        current.filter((s) => s !== value) as HCAEnquiry['preferredSettings']
      );
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <p className="text-body-sm text-neutral-grey mb-2">
        Fields marked with <span aria-hidden="true">*</span><span className="sr-only">asterisk</span> are required.
      </p>

      <Input
        label="Full Name"
        required
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      <Input
        label="Email"
        type="email"
        required
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Phone"
        type="tel"
        required
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Select
        label="Experience Level"
        options={EXPERIENCE_LEVEL_OPTIONS}
        required
        {...register('experienceLevel')}
        error={errors.experienceLevel?.message}
      />

      <Input
        label="Location"
        required
        {...register('location')}
        error={errors.location?.message}
      />

      <fieldset>
        <legend className="block font-body text-body-sm text-ink mb-4">
          Preferred Care Settings
        </legend>
        <div className="space-y-3">
          {CARE_SETTINGS.map((setting) => (
            <Checkbox
              key={setting.value}
              label={setting.label}
              name={`setting-${setting.value}`}
              checked={selectedSettings.includes(setting.value as HCAEnquiry['preferredSettings'][number])}
              onChange={(e) => handleSettingChange(setting.value, e.target.checked)}
            />
          ))}
        </div>
        {errors.preferredSettings && (
          <p className="text-body-sm text-red-600 mt-2" role="alert">
            {errors.preferredSettings.message}
          </p>
        )}
      </fieldset>

      <Textarea
        label="Message"
        {...register('message')}
        error={errors.message?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
