'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CareProviderEnquirySchema, type CareProviderEnquiry } from '@/lib/schemas/enquiry';
import { Input, Select, Textarea, Button } from '@/components/ui';

const SERVICE_TYPE_OPTIONS = [
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'acute-care', label: 'Acute Care' },
  { value: 'private-hospital', label: 'Private Hospital' },
  { value: 'care-home', label: 'Care Home' },
  { value: 'supported-living', label: 'Supported Living' },
  { value: 'end-of-life', label: 'End of Life' },
  { value: 'other', label: 'Other' },
];

const CONTACT_METHOD_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
];

interface CareProviderFormProps {
  onSubmit: (data: CareProviderEnquiry) => void | Promise<void>;
}

export function CareProviderForm({ onSubmit }: CareProviderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CareProviderEnquiry>({
    resolver: zodResolver(CareProviderEnquirySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Organisation Name"
        {...register('organisationName')}
        error={errors.organisationName?.message}
      />

      <Input
        label="Contact Name"
        {...register('contactName')}
        error={errors.contactName?.message}
      />

      <Input
        label="Your Role"
        {...register('role')}
        error={errors.role?.message}
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
        label="Service Type"
        options={SERVICE_TYPE_OPTIONS}
        {...register('serviceType')}
        error={errors.serviceType?.message}
      />

      <Input
        label="Location"
        {...register('location')}
        error={errors.location?.message}
      />

      <Textarea
        label="Requirements"
        {...register('requirements')}
        error={errors.requirements?.message}
      />

      <Select
        label="Preferred Contact"
        options={CONTACT_METHOD_OPTIONS}
        {...register('preferredContact')}
        error={errors.preferredContact?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
      </Button>
    </form>
  );
}
