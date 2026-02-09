import Link from 'next/link';
import type { Metadata } from 'next';
import { HoneycombCluster } from '@/components/decorative';
import { HexagonIcon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Policies & Statements',
  description:
    'Access our policy documents including privacy, data protection, equality & diversity, and modern slavery statement.',
};

interface PolicyItem {
  title: string;
  description: string;
  href: string;
  lastUpdated: string;
}

const POLICIES: PolicyItem[] = [
  {
    title: 'Privacy Policy',
    description:
      'How we collect, store, and use personal data for candidates and clients.',
    href: '/privacy-policy',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Cookie Policy',
    description:
      'Information about the cookies we use and how to manage your preferences.',
    href: '/policies/cookies',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Data Retention Policy',
    description:
      'How long we keep candidate and client data, and how deletion requests are handled.',
    href: '/policies/data-retention',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Equality, Diversity & Inclusion',
    description:
      'Our commitment to fair treatment and equal opportunities for all.',
    href: '/policies/equality-diversity',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Right to Work Policy',
    description:
      'How we verify candidates have the legal right to work in the United Kingdom.',
    href: '/policies/right-to-work',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Modern Slavery Statement',
    description:
      'Our commitment to preventing modern slavery in our operations and supply chain.',
    href: '/policies/modern-slavery',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Safeguarding Policy',
    description:
      'How we protect vulnerable adults and children in care settings.',
    href: '/safeguarding',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Complaints Procedure',
    description:
      'How to raise a concern and our process for handling complaints.',
    href: '/complaints',
    lastUpdated: 'February 2026',
  },
  {
    title: 'Accessibility Statement',
    description:
      'Our commitment to making our website accessible to everyone.',
    href: '/policies/accessibility',
    lastUpdated: 'February 2026',
  },
];

export default function PoliciesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-midnight overflow-hidden">
        <HoneycombCluster
          position="top-right"
          variant="filled"
          scale={1.2}
          opacityMultiplier={1.5}
        />

        <div className="container-editorial relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[3px] bg-rich-gold" />
              <span className="text-[0.8125rem] tracking-[0.2em] uppercase font-medium text-rich-gold">
                Governance
              </span>
            </div>

            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight mb-6 text-soft-gold">
              Policies & Statements
            </h1>

            <p className="text-lg leading-relaxed text-mist opacity-80">
              We are committed to transparency in how we operate. Access our
              policy documents and governance statements below.
            </p>
          </div>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-20 bg-deep-slate">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {POLICIES.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="group block p-6 bg-midnight border-l-4 border-l-rich-gold/40 hover:border-l-rich-gold transition-all no-underline"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <HexagonIcon size="sm" variant="filled" color="gold" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-soft-gold mb-2 group-hover:text-rich-gold transition-colors">
                      {policy.title}
                    </h2>
                    <p className="text-sm text-mist/70 mb-3 leading-relaxed">
                      {policy.description}
                    </p>
                    <span className="text-xs text-mist/50">
                      Last updated: {policy.lastUpdated}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-midnight">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl text-soft-gold mb-4">
              Questions about our policies?
            </h2>
            <p className="text-mist/70 mb-6">
              If you have any questions about our policies or wish to exercise
              your data protection rights, please get in touch.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 text-[0.9375rem] font-semibold no-underline bg-rich-gold text-midnight hover:bg-soft-gold transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
