'use client';

/**
 * Candidate Profile Edit Page
 *
 * Form for candidates to update their profile information.
 */

import * as React from 'react';
import { useAuth, isCandidate } from '@/lib/auth';
import { candidatesApi } from '@/lib/api';
import { Button, Input } from '@/components/ui';

const experienceLevels = [
  { value: 'newly-qualified', label: 'Newly Qualified' },
  { value: '1-2-years', label: '1-2 Years' },
  { value: '3-5-years', label: '3-5 Years' },
  { value: '5-plus-years', label: '5+ Years' },
];

const careSettings = [
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'acute-care', label: 'Acute Care' },
  { value: 'private-hospital', label: 'Private Hospital' },
  { value: 'care-home', label: 'Care Home' },
  { value: 'supported-living', label: 'Supported Living' },
  { value: 'end-of-life', label: 'End of Life Care' },
  { value: 'community', label: 'Community Care' },
];

const dbsStatuses = [
  { value: 'cleared', label: 'DBS Cleared' },
  { value: 'pending', label: 'DBS Pending' },
  { value: 'not-started', label: 'Not Started' },
];

export default function CandidateProfilePage() {
  const { state, refreshProfile } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // Form state
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    postcode: '',
    experienceLevel: '',
    preferredSettings: [] as string[],
    professionalSummary: '',
    rightToWork: false,
    dbsStatus: '',
  });

  // Initialize form from profile
  React.useEffect(() => {
    if (isCandidate(state)) {
      const { profile } = state;
      setFormData({
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        phone: profile.phone ?? '',
        city: profile.city ?? '',
        postcode: profile.postcode ?? '',
        experienceLevel: profile.experienceLevel ?? '',
        preferredSettings: profile.preferredSettings ?? [],
        professionalSummary: profile.professionalSummary ?? '',
        rightToWork: profile.rightToWork ?? false,
        dbsStatus: profile.dbsStatus ?? '',
      });
    }
  }, [state]);

  if (!isCandidate(state)) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSettingsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredSettings: prev.preferredSettings.includes(value)
        ? prev.preferredSettings.filter((v) => v !== value)
        : [...prev.preferredSettings, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const response = await candidatesApi.updateProfile(formData);

    if (response.success) {
      setSuccess('Profile updated successfully.');
      await refreshProfile();
    } else {
      setError((response as { message?: string }).message ?? 'Failed to update profile.');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-display-sm text-ink mb-2">Edit Profile</h1>
        <p className="font-body text-body-md text-slate-blue">
          Keep your profile up to date to receive the best opportunities.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-[3px] border-red-500" role="alert">
          <p className="font-body text-body-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-[3px] border-green-500" role="status">
          <p className="font-body text-body-sm text-green-800">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="07700 900123"
            />
          </div>
        </section>

        {/* Location */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="London"
            />
            <Input
              label="Postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              placeholder="SW1A 1AA"
            />
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Experience</h2>
          <div className="mb-4">
            <label className="block font-body text-body-sm text-ink mb-2">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-slate-blue/20 focus:border-slate-blue"
            >
              <option value="">Select experience level</option>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-body-sm text-ink mb-2">
              Preferred Care Settings
            </label>
            <div className="grid grid-cols-2 gap-2">
              {careSettings.map((setting) => (
                <label key={setting.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferredSettings.includes(setting.value)}
                    onChange={() => handleSettingsChange(setting.value)}
                    className="w-4 h-4 border-2 border-neutral-grey accent-rich-gold"
                  />
                  <span className="font-body text-body-sm text-ink">{setting.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Professional Summary</h2>
          <div>
            <label className="block font-body text-body-sm text-ink mb-2">
              About You
            </label>
            <textarea
              name="professionalSummary"
              value={formData.professionalSummary}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell employers about your experience, skills, and what makes you a great healthcare professional..."
              className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-slate-blue/20 focus:border-slate-blue resize-none"
            />
            <p className="mt-1 font-body text-body-sm text-slate-blue">
              Minimum 50 characters recommended
            </p>
          </div>
        </section>

        {/* Compliance */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Compliance</h2>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="rightToWork"
                checked={formData.rightToWork}
                onChange={handleInputChange}
                className="w-4 h-4 mt-1 border-2 border-neutral-grey accent-rich-gold"
              />
              <div>
                <span className="font-body text-body-md text-ink">
                  I confirm I have the right to work in the UK
                </span>
                <p className="font-body text-body-sm text-slate-blue">
                  You may be asked to provide documentation
                </p>
              </div>
            </label>

            <div>
              <label className="block font-body text-body-sm text-ink mb-2">
                DBS Status
              </label>
              <select
                name="dbsStatus"
                value={formData.dbsStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-slate-blue/20 focus:border-slate-blue"
              >
                <option value="">Select DBS status</option>
                {dbsStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
