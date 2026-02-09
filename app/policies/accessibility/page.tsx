import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Our commitment to making our website accessible to everyone.',
};

export default function AccessibilityStatementPage() {
  return (
    <section className="section-spacing bg-deep-slate">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/policies"
            className="inline-flex items-center gap-2 text-sm text-mist/60 hover:text-soft-gold mb-8 no-underline transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Policies
          </Link>

          <h1 className="font-display text-display-lg text-soft-gold mb-6">
            Accessibility Statement
          </h1>
          <p className="font-body text-body-md text-mist/60 mb-12">
            Last updated: February 2026
          </p>

          <div className="prose-container space-y-8 font-body text-body-md text-mist">
            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Our commitment
              </h2>
              <p>
                {siteConfig.name} is committed to ensuring digital accessibility for people with
                disabilities. We are continually improving the user experience for everyone and
                applying the relevant accessibility standards.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Conformance status
              </h2>
              <p>
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level
                AA. These guidelines explain how to make web content more accessible for people
                with disabilities and more user-friendly for everyone.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Measures we take
              </h2>
              <p className="mb-4">
                {siteConfig.name} takes the following measures to ensure accessibility:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Include accessibility as part of our development process</li>
                <li>Use semantic HTML to ensure content is structured correctly</li>
                <li>Provide text alternatives for non-text content</li>
                <li>Ensure sufficient colour contrast throughout the site</li>
                <li>Make all functionality available from a keyboard</li>
                <li>Ensure forms are clearly labelled and provide helpful error messages</li>
                <li>Test with assistive technologies including screen readers</li>
                <li>Respect user preferences for reduced motion</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Compatibility
              </h2>
              <p className="mb-4">
                This website is designed to be compatible with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recent versions of major browsers (Chrome, Firefox, Safari, Edge)</li>
                <li>Screen readers including NVDA, JAWS, and VoiceOver</li>
                <li>Keyboard-only navigation</li>
                <li>Browser zoom up to 200%</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Known limitations
              </h2>
              <p>
                While we strive to ensure accessibility of our website, there may be some
                limitations. We are actively working to identify and address any issues. If you
                encounter any problems, please contact us so we can provide the information in an
                alternative format.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Feedback
              </h2>
              <p>
                We welcome your feedback on the accessibility of our website. If you encounter
                accessibility barriers or have suggestions for improvement, please contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
                  {siteConfig.email}
                </a>
                . We aim to respond to accessibility feedback within 5 working days.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Alternative formats
              </h2>
              <p>
                If you need information from our website in an alternative format (such as large
                print, audio, or braille), please contact us and we will do our best to
                accommodate your request.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Enforcement procedure
              </h2>
              <p>
                If you are not satisfied with our response to your accessibility concern, you can
                contact the Equality Advisory Support Service (EASS) at{' '}
                <a
                  href="https://www.equalityadvisoryservice.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rich-gold hover:text-soft-gold underline"
                >
                  equalityadvisoryservice.com
                </a>
                . The EASS is an independent advice service that provides information and advice
                on discrimination and human rights issues.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
