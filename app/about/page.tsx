import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { HoneycombCluster, HoneycombPattern } from '@/components/decorative';

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

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden bg-void">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: grainTexture }}
        />

        {/* Decorative hexagon clusters - brand signature */}
        <HoneycombCluster position="top-left" variant="outline" scale={1.25} opacityMultiplier={1.6} />

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[3px] bg-gold" />
              <span className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium text-gold">
                Our Story
              </span>
              <span className="w-12 h-[3px] bg-gold" />
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6 text-gold-soft">
              About Medibee
            </h1>
            <p className="text-lg leading-relaxed opacity-85 text-pearl-soft">
              Medibee Recruitment Ltd was created to do healthcare recruitment properly.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-void-light">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[3px] bg-gold" />
                <span className="text-xs tracking-[0.15em] uppercase font-semibold text-tier-colony">
                  Our Story
                </span>
              </div>

              <h2 className="font-display text-[2.25rem] mb-8 leading-tight text-pearl">
                Healthcare recruitment done properly
              </h2>

              <div className="space-y-6">
                <p className="text-[1.0625rem] leading-relaxed text-pearl-soft">
                  Medibee was founded out of frustration with how many recruitment agencies treat
                  both healthcare staff and care providers.
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-pearl-soft">
                  Too often, people are treated like numbers, communication is poor, and decisions
                  are made without understanding the realities of care environments.
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-pearl-soft">
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
                className="object-cover rounded-card"
              />
              {/* Gold accent frame */}
              <div className="absolute top-6 left-6 right-[-1.5rem] bottom-[-1.5rem] -z-10 border-[3px] border-gold rounded-card" />
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="py-24 bg-void">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto">
            <div className="w-[60px] h-[3px] mb-8 bg-gold" />
            <h2 className="font-display text-[2rem] mb-12 text-gold-soft">
              What this means in practice
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="pl-6 border-l-[3px] border-gold"
                >
                  <h3 className="font-display text-xl mb-3 text-pearl">
                    {value.title}
                  </h3>
                  <p className="text-[1.0625rem] leading-relaxed opacity-75 text-pearl-soft">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24 bg-void-elevated">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-[60px] h-[3px] mx-auto mb-8 bg-gold" />
            <h2 className="font-display text-[2rem] mb-6 text-gold-soft">
              Nationwide coverage
            </h2>
            <p className="text-[1.0625rem] leading-relaxed opacity-85 text-pearl-soft">
              Medibee Recruitment Ltd operates nationwide across the UK, supporting both NHS and
              private sector healthcare providers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA with honeycomb */}
      <section className="py-24 relative overflow-hidden bg-void">
        {/* Honeycomb pattern */}
        <HoneycombPattern variant="gold" opacity={0.08} />

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
              <h2 className="font-display text-[2rem] mb-6 text-gold-soft">
                Get in touch
              </h2>
              <p className="text-[1.0625rem] leading-relaxed mb-8 opacity-75 text-pearl-soft">
                Whether you&apos;re a care provider looking for reliable staff or a healthcare
                assistant looking for work, we&apos;d love to hear from you.
              </p>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 text-[0.9375rem] font-semibold no-underline transition-all bg-gold text-void rounded-card hover:bg-gold-light"
                style={{ boxShadow: '0 4px 24px rgba(212, 175, 55, 0.25)' }}
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
