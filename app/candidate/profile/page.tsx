'use client';

/**
 * Candidate Profile Page
 *
 * Combined edit/preview page with "View as Employer" toggle.
 * Similar to LinkedIn/Facebook profile preview functionality.
 */

import * as React from 'react';
import { useAuth, isCandidate } from '@/lib/auth';
import { candidatesApi } from '@/lib/api';
import { Button, Input } from '@/components/ui';
import { CandidateProfilePreview, PortalCard } from '@/components/portal';
import type { CandidateProfile } from '@/lib/auth/types';

// TODO(PROD-WIRE): Replace with real credentials from API
// See: .claude/BACKEND_WIRING_TODO.md for full instructions
// Production: credentials should come from candidatesApi.getCredentials() or auth state
import { amaraCredentials } from '@/lib/test-data';

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
  { value: 'learning-disabilities', label: 'Learning Disabilities' },
  { value: 'dementia-care', label: 'Dementia Care' },
  { value: 'paediatric', label: 'Paediatric' },
];

const dbsStatuses = [
  { value: 'cleared', label: 'DBS Cleared' },
  { value: 'pending', label: 'DBS Pending' },
  { value: 'not-started', label: 'Not Started' },
];

type ViewMode = 'edit' | 'preview';

export default function CandidateProfilePage() {
  const { state, refreshProfile } = useAuth();

  const [viewMode, setViewMode] = React.useState<ViewMode>('edit');
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

  // Build preview profile from form data
  const previewProfile: CandidateProfile = {
    candidateId: state.profile.candidateId,
    email: state.profile.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    city: formData.city,
    postcode: formData.postcode,
    experienceLevel: formData.experienceLevel,
    preferredSettings: formData.preferredSettings,
    professionalSummary: formData.professionalSummary,
    rightToWork: formData.rightToWork,
    dbsStatus: formData.dbsStatus as 'cleared' | 'pending' | 'not-started',
    available: state.profile.available ?? true,
    cvUploaded: state.profile.cvUploaded ?? false,
    status: state.profile.status ?? 'active',
    createdAt: state.profile.createdAt,
    updatedAt: state.profile.updatedAt,
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-portal text-portal-name text-portal-graphite mb-1">
            {viewMode === 'edit' ? 'Edit Profile' : 'Profile Preview'}
          </h1>
          <p className="font-portal text-portal-body text-portal-graphite-muted">
            {viewMode === 'edit'
              ? 'Keep your profile up to date to receive the best opportunities.'
              : 'This is how care providers see your profile.'}
          </p>
        </div>

        {/* Toggle Button */}
        <div className="flex items-center gap-2 bg-surface-1 rounded-card p-1">
          <button
            onClick={() => setViewMode('edit')}
            className={`
              px-4 py-2 rounded-card font-portal text-portal-meta font-medium
              transition-all duration-portal
              ${viewMode === 'edit'
                ? 'bg-portal-blue text-white shadow-card'
                : 'text-portal-graphite hover:bg-portal-stone'
              }
            `}
          >
            Edit
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`
              px-4 py-2 rounded-card font-portal text-portal-meta font-medium
              transition-all duration-portal flex items-center gap-2
              ${viewMode === 'preview'
                ? 'bg-portal-highlight text-white shadow-card'
                : 'text-portal-graphite hover:bg-portal-stone'
              }
            `}
          >
            <span>👁</span>
            View as Employer
          </button>
        </div>
      </div>

      {/* Preview Mode */}
      {viewMode === 'preview' && (
        <CandidateProfilePreview
          profile={previewProfile}
          credentials={amaraCredentials}
          isOwnProfile={true}
          onExitPreview={() => setViewMode('edit')}
        />
      )}

      {/* Edit Mode */}
      {viewMode === 'edit' && (
        <div className="max-w-2xl">
          {error && (
            <div className="mb-6 p-4 bg-portal-alert/10 border border-portal-alert/20 rounded-card" role="alert">
              <p className="font-portal text-portal-body text-portal-alert">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-portal-verified/10 border border-portal-verified/20 rounded-card" role="status">
              <p className="font-portal text-portal-body text-portal-verified">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <PortalCard title="Personal Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                    First Name <span className="text-portal-alert">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="
                      w-full px-4 py-3 rounded-card border border-portal-stone
                      font-portal text-portal-body text-portal-graphite
                      focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                      transition-colors duration-portal
                    "
                  />
                </div>
                <div>
                  <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                    Last Name <span className="text-portal-alert">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="
                      w-full px-4 py-3 rounded-card border border-portal-stone
                      font-portal text-portal-body text-portal-graphite
                      focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                      transition-colors duration-portal
                    "
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="07700 900123"
                  className="
                    w-full px-4 py-3 rounded-card border border-portal-stone
                    font-portal text-portal-body text-portal-graphite
                    placeholder:text-portal-graphite-muted
                    focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                    transition-colors duration-portal
                  "
                />
              </div>
            </PortalCard>

            {/* Location */}
            <PortalCard title="Location">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="London"
                    className="
                      w-full px-4 py-3 rounded-card border border-portal-stone
                      font-portal text-portal-body text-portal-graphite
                      placeholder:text-portal-graphite-muted
                      focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                      transition-colors duration-portal
                    "
                  />
                </div>
                <div>
                  <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                    Postcode
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="SW1A 1AA"
                    className="
                      w-full px-4 py-3 rounded-card border border-portal-stone
                      font-portal text-portal-body text-portal-graphite
                      placeholder:text-portal-graphite-muted
                      focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                      transition-colors duration-portal
                    "
                  />
                </div>
              </div>
            </PortalCard>

            {/* Experience */}
            <PortalCard title="Experience">
              <div className="space-y-6">
                <div>
                  <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="
                      w-full px-4 py-3 rounded-card border border-portal-stone
                      font-portal text-portal-body text-portal-graphite
                      focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                      transition-colors duration-portal
                    "
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
                  <label className="block font-portal text-portal-meta text-portal-graphite mb-3">
                    Preferred Care Settings
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {careSettings.map((setting) => {
                      const isSelected = formData.preferredSettings.includes(setting.value);
                      return (
                        <button
                          key={setting.value}
                          type="button"
                          onClick={() => handleSettingsChange(setting.value)}
                          className={`
                            px-4 py-3 rounded-card text-left
                            font-portal text-portal-meta
                            transition-all duration-portal
                            ${isSelected
                              ? 'bg-portal-teal/10 border-2 border-portal-teal text-portal-teal'
                              : 'bg-surface-1 border border-portal-stone text-portal-graphite hover:border-portal-graphite-muted'
                            }
                          `}
                        >
                          <span className="flex items-center gap-2">
                            {isSelected && <span className="text-portal-teal">✓</span>}
                            {setting.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PortalCard>

            {/* Professional Summary */}
            <PortalCard title="Professional Summary">
              <div>
                <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                  About You
                </label>
                <textarea
                  name="professionalSummary"
                  value={formData.professionalSummary}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell employers about your experience, skills, and what makes you a great healthcare professional..."
                  className="
                    w-full px-4 py-3 rounded-card border border-portal-stone
                    font-portal text-portal-body text-portal-graphite
                    placeholder:text-portal-graphite-muted
                    focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                    transition-colors duration-portal resize-none
                  "
                />
                <p className="mt-2 font-portal text-portal-meta text-portal-graphite-muted">
                  {formData.professionalSummary.length} characters
                  {formData.professionalSummary.length < 50 && ' (50+ recommended)'}
                </p>
              </div>
            </PortalCard>

            {/* Compliance */}
            <PortalCard title="Compliance">
              <div className="space-y-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`
                    w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center
                    transition-colors duration-portal
                    ${formData.rightToWork
                      ? 'bg-portal-verified border-portal-verified'
                      : 'border-portal-stone group-hover:border-portal-graphite-muted'
                    }
                  `}>
                    {formData.rightToWork && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    name="rightToWork"
                    checked={formData.rightToWork}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-portal text-portal-body text-portal-graphite">
                      I confirm I have the right to work in the UK
                    </span>
                    <p className="font-portal text-portal-meta text-portal-graphite-muted">
                      You may be asked to provide documentation
                    </p>
                  </div>
                </label>

                <div>
                  <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
                    DBS Status
                  </label>
                  <select
                    name="dbsStatus"
                    value={formData.dbsStatus}
                    onChange={handleInputChange}
                    className="
                      w-full px-4 py-3 rounded-card border border-portal-stone
                      font-portal text-portal-body text-portal-graphite
                      focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                      transition-colors duration-portal
                    "
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
            </PortalCard>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className="
                  order-2 sm:order-1
                  px-6 py-3 rounded-card
                  font-portal text-portal-body font-medium
                  text-portal-highlight hover:text-portal-highlight/80
                  transition-colors duration-portal
                  flex items-center gap-2
                "
              >
                <span>👁</span>
                Preview as Employer
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="
                  order-1 sm:order-2 w-full sm:w-auto
                  px-8 py-3 rounded-card
                  font-portal text-portal-body font-medium
                  bg-portal-blue text-white
                  hover:bg-portal-blue-dark
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-portal
                "
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
