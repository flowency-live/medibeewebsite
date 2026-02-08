import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Medibee Recruitment Ltd was created to do healthcare recruitment properly. Personal, honest, and reliable.',
};

const VALUES = [
  {
    title: 'Clear and consistent communication',
    description: "You'll always know where you stand. No chasing for updates or unclear responses.",
  },
  {
    title: 'Accountability at every stage',
    description: 'We take responsibility for the service we provide and remain directly accessible.',
  },
  {
    title: 'Focus on suitability',
    description: 'We match the right people to the right settings, not just filling roles.',
  },
  {
    title: 'Long-term relationships',
    description: 'We build lasting partnerships with both clients and healthcare assistants.',
  },
];

// Honeycomb SVG pattern (proper hexagons)
const honeycombPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23E5C55C' fill-opacity='0.08'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function AboutPage() {
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
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span
                className="w-12 h-[3px]"
                style={{ backgroundColor: '#E5C55C' }}
              />
              <span
                className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium"
                style={{ color: '#E5C55C' }}
              >
                Our Story
              </span>
              <span
                className="w-12 h-[3px]"
                style={{ backgroundColor: '#E5C55C' }}
              />
            </div>
            <h1
              className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6"
              style={{ color: '#F5E6A3' }}
            >
              About Medibee
            </h1>
            <p
              className="text-lg leading-relaxed opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              Medibee Recruitment Ltd was created to do healthcare recruitment properly.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story - Light breathing section */}
      <section
        className="py-24"
        style={{ backgroundColor: '#F8F7F4' }}
      >
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="w-10 h-[3px]"
                  style={{ backgroundColor: '#E5C55C' }}
                />
                <span
                  className="text-xs tracking-[0.15em] uppercase font-semibold"
                  style={{ color: '#696F8B' }}
                >
                  Our Story
                </span>
              </div>

              <h2
                className="font-display text-[2.25rem] mb-8 leading-tight"
                style={{ color: '#1a1d2e' }}
              >
                Healthcare recruitment done properly
              </h2>

              <div className="space-y-6">
                <p
                  className="text-[1.0625rem] leading-relaxed"
                  style={{ color: '#4a4e5a' }}
                >
                  Medibee was founded out of frustration with how many recruitment agencies treat
                  both healthcare staff and care providers.
                </p>
                <p
                  className="text-[1.0625rem] leading-relaxed"
                  style={{ color: '#4a4e5a' }}
                >
                  Too often, people are treated like numbers, communication is poor, and decisions
                  are made without understanding the realities of care environments.
                </p>
                <p
                  className="text-[1.0625rem] leading-relaxed"
                  style={{ color: '#4a4e5a' }}
                >
                  We believe healthcare recruitment should be personal, honest, and reliable. As a
                  business, we take responsibility for the service we provide and remain directly
                  accessible to the people we work with.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/5] md:aspect-square">
              <Image
                src="/founder-placeholder.jpg"
                alt="Medibee founder"
                fill
                className="object-cover"
              />
              {/* Gold accent frame */}
              <div
                className="absolute top-6 left-6 right-[-1.5rem] bottom-[-1.5rem] -z-10"
                style={{ border: '3px solid #E5C55C' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section
        className="py-24"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto">
            <div
              className="w-[60px] h-[3px] mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2rem] mb-12"
              style={{ color: '#F5E6A3' }}
            >
              What this means in practice
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="pl-6"
                  style={{ borderLeft: '3px solid #E5C55C' }}
                >
                  <h3
                    className="font-display text-xl mb-3"
                    style={{ color: '#F5F4F0' }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-[1.0625rem] leading-relaxed opacity-75"
                    style={{ color: '#F5F4F0' }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
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
              Nationwide coverage
            </h2>
            <p
              className="text-[1.0625rem] leading-relaxed opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              Medibee Recruitment Ltd operates nationwide across the UK, supporting both NHS and
              private sector healthcare providers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA with honeycomb */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#1a1d2e' }}
      >
        {/* Honeycomb pattern */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: honeycombPattern }}
        />

        <div className="container-editorial relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Image */}
            <div className="relative aspect-video md:aspect-[4/3] order-2 md:order-1">
              <Image
                src="/landing-hero.png"
                alt="Medibee Recruitment - London skyline with branding"
                fill
                className="object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left order-1 md:order-2">
              <h2
                className="font-display text-[2rem] mb-6"
                style={{ color: '#F5E6A3' }}
              >
                Get in touch
              </h2>
              <p
                className="text-[1.0625rem] leading-relaxed mb-8 opacity-75"
                style={{ color: '#F5F4F0' }}
              >
                Whether you&apos;re a care provider looking for reliable staff or a healthcare
                assistant looking for work, we&apos;d love to hear from you.
              </p>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 text-[0.9375rem] font-semibold no-underline transition-all"
                style={{
                  backgroundColor: '#E5C55C',
                  color: '#1a1d2e',
                  boxShadow: '0 4px 24px rgba(229, 197, 92, 0.25)'
                }}
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
