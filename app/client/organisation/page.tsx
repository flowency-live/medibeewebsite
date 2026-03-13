'use client';

/**
 * Organisation Profile Page
 *
 * Edit organisation details.
 */

import * as React from 'react';
import { useAuth, isClient } from '@/lib/auth';
import { clientsApi } from '@/lib/api';
import { Button } from '@/components/ui';

const ORGANISATION_TYPES = [
  { value: 'nhs-trust', label: 'NHS Trust' },
  { value: 'private-hospital', label: 'Private Hospital' },
  { value: 'care-home', label: 'Care Home' },
  { value: 'supported-living', label: 'Supported Living' },
  { value: 'mental-health', label: 'Mental Health Provider' },
  { value: 'community-care', label: 'Community Care' },
  { value: 'other', label: 'Other' },
];

export default function OrganisationPage() {
  const { state, refreshProfile } = useAuth();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // Form state
  const [organisationName, setOrganisationName] = React.useState('');
  const [organisationType, setOrganisationType] = React.useState('');
  const [contactName, setContactName] = React.useState('');
  const [contactPhone, setContactPhone] = React.useState('');
  const [billingEmail, setBillingEmail] = React.useState('');
  const [addressLine1, setAddressLine1] = React.useState('');
  const [addressLine2, setAddressLine2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [cqcNumber, setCqcNumber] = React.useState('');

  React.useEffect(() => {
    if (isClient(state)) {
      const { profile } = state;
      setOrganisationName(profile.organisationName || '');
      setOrganisationType(profile.organisationType || '');
      setContactName(profile.contactName || '');
      setContactPhone(profile.contactPhone || '');
      setBillingEmail(profile.billingEmail || '');
      setAddressLine1(profile.address?.line1 || '');
      setAddressLine2(profile.address?.line2 || '');
      setCity(profile.address?.city || '');
      setPostcode(profile.address?.postcode || '');
      setCqcNumber(profile.cqcNumber || '');
    }
  }, [state]);

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    const updateData = {
      organisationName,
      organisationType,
      contactName,
      contactPhone,
      billingEmail,
      address:
        addressLine1 || city || postcode
          ? {
              line1: addressLine1,
              line2: addressLine2,
              city,
              postcode,
            }
          : undefined,
      cqcNumber: cqcNumber || undefined,
    };

    const response = await clientsApi.updateProfile(updateData);

    if (response.success) {
      setSuccess('Organisation profile updated successfully.');
      setIsEditing(false);
      await refreshProfile();
    } else {
      setError((response as { message?: string }).message || 'Failed to update profile.');
    }

    setIsSaving(false);
  };

  if (!isClient(state)) {
    return null;
  }

  const { profile } = state;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-display-sm text-ink mb-2">Organisation</h1>
          <p className="font-body text-body-md text-slate-blue">
            Manage your organisation&apos;s profile and contact details.
          </p>
        </div>
        {!isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
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

      <div className="space-y-8">
        {/* Organisation Details */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Organisation Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Organisation Name <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={organisationName}
                  onChange={(e) => setOrganisationName(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                />
              ) : (
                <p className="font-body text-body-md text-ink">{profile.organisationName}</p>
              )}
            </div>

            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Organisation Type <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <select
                  value={organisationType}
                  onChange={(e) => setOrganisationType(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                >
                  <option value="">Select type...</option>
                  {ORGANISATION_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="font-body text-body-md text-ink">
                  {ORGANISATION_TYPES.find((t) => t.value === profile.organisationType)?.label ||
                    profile.organisationType}
                </p>
              )}
            </div>

            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                CQC Number (optional)
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={cqcNumber}
                  onChange={(e) => setCqcNumber(e.target.value)}
                  placeholder="e.g. 1-123456789"
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                />
              ) : (
                <p className="font-body text-body-md text-ink">
                  {profile.cqcNumber || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Contact Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Primary Contact Name <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                />
              ) : (
                <p className="font-body text-body-md text-ink">{profile.contactName}</p>
              )}
            </div>

            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Email Address
              </label>
              <p className="font-body text-body-md text-ink">{profile.contactEmail}</p>
              <p className="font-body text-body-sm text-slate-blue mt-1">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>

            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                />
              ) : (
                <p className="font-body text-body-md text-ink">{profile.contactPhone}</p>
              )}
            </div>

            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Billing Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={billingEmail}
                  onChange={(e) => setBillingEmail(e.target.value)}
                  placeholder="billing@example.com"
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                />
              ) : (
                <p className="font-body text-body-md text-ink">
                  {profile.billingEmail || profile.contactEmail}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="bg-white p-6 rounded-sm border border-neutral-grey/20">
          <h2 className="font-display text-lg text-ink mb-4">Address</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Address Line 1
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                />
              ) : (
                <p className="font-body text-body-md text-ink">
                  {profile.address?.line1 || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block font-body text-body-sm text-slate-blue mb-1">
                Address Line 2
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                />
              ) : (
                <p className="font-body text-body-md text-ink">
                  {profile.address?.line2 || '—'}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-body-sm text-slate-blue mb-1">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                  />
                ) : (
                  <p className="font-body text-body-md text-ink">
                    {profile.address?.city || '—'}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-body text-body-sm text-slate-blue mb-1">
                  Postcode
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-neutral-grey/30 rounded-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-slate-blue"
                  />
                ) : (
                  <p className="font-body text-body-md text-ink">
                    {profile.address?.postcode || '—'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Save/Cancel buttons */}
        {isEditing && (
          <div className="flex gap-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditing(false);
                // Reset form to original values
                if (isClient(state)) {
                  const { profile } = state;
                  setOrganisationName(profile.organisationName || '');
                  setOrganisationType(profile.organisationType || '');
                  setContactName(profile.contactName || '');
                  setContactPhone(profile.contactPhone || '');
                  setBillingEmail(profile.billingEmail || '');
                  setAddressLine1(profile.address?.line1 || '');
                  setAddressLine2(profile.address?.line2 || '');
                  setCity(profile.address?.city || '');
                  setPostcode(profile.address?.postcode || '');
                  setCqcNumber(profile.cqcNumber || '');
                }
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
