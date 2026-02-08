'use client';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Full Name"
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Phone"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Select
        label="Experience Level"
        options={EXPERIENCE_LEVEL_OPTIONS}
        {...register('experienceLevel')}
        error={errors.experienceLevel?.message}
      />

      <Input
        label="Location"
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
