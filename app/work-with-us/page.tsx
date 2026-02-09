import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { HoneycombPattern, HoneycombFade } from '@/components/decorative';

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
      <section className="py-24 relative bg-midnight">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        <HoneycombFade direction="bottom-to-top" opacity={0.12} />

        <div className="container-editorial relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[3px] bg-hca" />
                <span className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium text-hca-light">
                  For Healthcare Assistants
                </span>
              </div>
              <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6 text-soft-gold">
                Work with Medibee
              </h1>
              <p className="text-lg leading-relaxed opacity-85 text-mist">
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
              {/* HCA purple accent frame */}
              <div className="absolute top-4 left-4 right-[-1rem] bottom-[-1rem] -z-10 border-[3px] border-hca" />
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="py-24 bg-deep-slate">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="w-[60px] h-[3px] mb-8 bg-hca" />
              <h2 className="font-display text-[2rem] mb-8 text-soft-gold">
                What you can expect
              </h2>
              <ul className="space-y-4">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2 flex-shrink-0 bg-hca-light" />
                    <span className="text-[1.0625rem] text-mist opacity-85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-midnight border-l-[3px] border-hca">
              <h3 className="font-display text-xl mb-6 text-soft-gold">
                Care settings we work with
              </h3>
              <ul className="space-y-3">
                {SETTINGS.map((setting) => (
                  <li key={setting} className="text-[1.0625rem] text-mist opacity-85">
                    {setting}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Healthcare Assistants Choose Us */}
      <section className="py-24 relative bg-midnight">
        <HoneycombFade direction="top-to-bottom" opacity={0.10} />

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="w-[60px] h-[3px] mb-8 bg-hca" />
            <h2 className="font-display text-[2rem] mb-8 text-soft-gold">
              Why healthcare assistants choose Medibee
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed opacity-85 text-mist">
                We specialise only in healthcare assistants and the care sector. We understand
                care environments and expectations.
              </p>
              <p className="text-lg leading-relaxed opacity-85 text-mist">
                We offer flexible shifts and consistent opportunities. Pay is discussed clearly
                and fairly on an individual basis.
              </p>
              <p className="text-lg leading-relaxed opacity-85 text-mist">
                We treat people with respect and provide proper support. Medibee is not a general
                recruitment agency. Healthcare is our sole focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24 bg-midnight-light">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-[60px] h-[3px] mx-auto mb-8 bg-rich-gold" />
            <h2 className="font-display text-[2rem] mb-6 text-soft-gold">
              Your safety matters
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-12 opacity-85 text-mist">
              We carry out DBS and Right to Work checks and operate with clear safeguarding
              policies to protect both our staff and the people they care for.
            </p>
            <div className="flex justify-center gap-12 flex-wrap">
              {['DBS Checked', 'Right to Work Verified', 'Safeguarding Policies'].map((badge) => (
                <div key={badge} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-rich-gold" />
                  <span className="text-[0.8125rem] tracking-[0.1em] uppercase opacity-80 text-soft-gold">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with honeycomb */}
      <section className="py-24 relative overflow-hidden bg-hca">
        <HoneycombPattern variant="dark" opacity={0.12} />

        <div className="container-editorial relative z-10 text-center">
          <h2 className="font-display text-[2rem] mb-6 text-midnight">
            Register your interest
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-10 max-w-2xl mx-auto opacity-80 text-midnight">
            Ready to work with a recruitment agency that values you? Register your interest
            and we&apos;ll be in touch to discuss opportunities.
          </p>
          <Link
            href="/candidate/register"
            className="inline-block px-10 py-4 text-[0.9375rem] font-semibold no-underline transition-all bg-midnight text-soft-gold"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
          >
            Apply now
          </Link>
        </div>
      </section>
    </>
  );
}
