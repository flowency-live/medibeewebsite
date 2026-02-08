import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work With Us',
  description:
    'Join Medibee Recruitment Ltd. Healthcare assistants are valued, supported, and treated with respect. Flexible work across a range of care settings.',
};

const EXPECTATIONS = [
  'A recruitment agency focused only on healthcare assistants',
  'Clear communication and honest expectations',
  'Flexible work across a range of care settings',
  'Fair, transparent pay discussed privately',
  'Support from people who understand healthcare work',
];

const SETTINGS = [
  'Mental health units',
  'Acute hospital wards',
  'NHS services',
  'Private hospitals and clinics',
  'Care homes',
  'Supported living services',
  'End of life and hospice care',
];

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function WorkWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-24 relative"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        <div className="container-editorial relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="w-12 h-[3px]"
                  style={{ backgroundColor: '#E5C55C' }}
                />
                <span
                  className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium"
                  style={{ color: '#E5C55C' }}
                >
                  For Healthcare Assistants
                </span>
              </div>
              <h1
                className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6"
                style={{ color: '#F5E6A3' }}
              >
                Work with Medibee
              </h1>
              <p
                className="text-lg leading-relaxed opacity-85"
                style={{ color: '#F5F4F0' }}
              >
                At Medibee, healthcare assistants are valued, supported, and treated with respect.
              </p>
            </div>
            <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <Image
                src="/hca-male.png"
                alt="Healthcare assistant in Medibee uniform"
                fill
                className="object-cover"
              />
              {/* Gold accent frame */}
              <div
                className="absolute top-4 left-4 right-[-1rem] bottom-[-1rem] -z-10"
                style={{ border: '3px solid #E5C55C' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section
        className="py-24"
        style={{ backgroundColor: '#3d4259' }}
      >
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div
                className="w-[60px] h-[3px] mb-8"
                style={{ backgroundColor: '#E5C55C' }}
              />
              <h2
                className="font-display text-[2rem] mb-8"
                style={{ color: '#F5E6A3' }}
              >
                What you can expect
              </h2>
              <ul className="space-y-4">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="block w-2 h-2 mt-2 flex-shrink-0"
                      style={{ backgroundColor: '#E5C55C' }}
                    />
                    <span
                      className="text-[1.0625rem]"
                      style={{ color: '#F5F4F0', opacity: 0.85 }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="p-8"
              style={{
                backgroundColor: '#1a1d2e',
                borderLeft: '3px solid #E5C55C'
              }}
            >
              <h3
                className="font-display text-xl mb-6"
                style={{ color: '#F5E6A3' }}
              >
                Care settings we work with
              </h3>
              <ul className="space-y-3">
                {SETTINGS.map((setting) => (
                  <li
                    key={setting}
                    className="text-[1.0625rem]"
                    style={{ color: '#F5F4F0', opacity: 0.85 }}
                  >
                    {setting}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Healthcare Assistants Choose Us */}
      <section
        className="py-24"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            <div
              className="w-[60px] h-[3px] mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2rem] mb-8"
              style={{ color: '#F5E6A3' }}
            >
              Why healthcare assistants choose Medibee
            </h2>
            <div className="space-y-6">
              <p
                className="text-lg leading-relaxed opacity-85"
                style={{ color: '#F5F4F0' }}
              >
                We specialise only in healthcare assistants and the care sector. We understand
                care environments and expectations.
              </p>
              <p
                className="text-lg leading-relaxed opacity-85"
                style={{ color: '#F5F4F0' }}
              >
                We offer flexible shifts and consistent opportunities. Pay is discussed clearly
                and fairly on an individual basis.
              </p>
              <p
                className="text-lg leading-relaxed opacity-85"
                style={{ color: '#F5F4F0' }}
              >
                We treat people with respect and provide proper support. Medibee is not a general
                recruitment agency. Healthcare is our sole focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section
        className="py-24"
        style={{ backgroundColor: '#2a2e42' }}
      >
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="w-[60px] h-[3px] mx-auto mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2rem] mb-6"
              style={{ color: '#F5E6A3' }}
            >
              Your safety matters
            </h2>
            <p
              className="text-[1.0625rem] leading-relaxed mb-12 opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              We carry out DBS and Right to Work checks and operate with clear safeguarding
              policies to protect both our staff and the people they care for.
            </p>
            <div className="flex justify-center gap-12 flex-wrap">
              {['DBS Checked', 'Right to Work Verified', 'Safeguarding Policies'].map((badge) => (
                <div key={badge} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2"
                    style={{ backgroundColor: '#E5C55C' }}
                  />
                  <span
                    className="text-[0.8125rem] tracking-[0.1em] uppercase opacity-80"
                    style={{ color: '#F5E6A3' }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with honeycomb */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#E5C55C' }}
      >
        {/* Honeycomb pattern (darker for gold bg) */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath fill='%231a1d2e' fill-opacity='1' d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66ZM28 100L0 84L0 50L28 34L56 50L56 84L28 100Z'/%3E%3C/svg%3E")`
          }}
        />

        <div className="container-editorial relative z-10 text-center">
          <h2
            className="font-display text-[2rem] mb-6"
            style={{ color: '#1a1d2e' }}
          >
            Register your interest
          </h2>
          <p
            className="text-[1.0625rem] leading-relaxed mb-10 max-w-2xl mx-auto opacity-80"
            style={{ color: '#1a1d2e' }}
          >
            Ready to work with a recruitment agency that values you? Register your interest
            and we&apos;ll be in touch to discuss opportunities.
          </p>
          <Link
            href="/candidate/register"
            className="inline-block px-10 py-4 text-[0.9375rem] font-semibold no-underline transition-all"
            style={{
              backgroundColor: '#1a1d2e',
              color: '#F5E6A3',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
            }}
          >
            Apply now
          </Link>
        </div>
      </section>
    </>
  );
}
