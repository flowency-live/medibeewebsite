import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about the cookies we use and how to manage your preferences.',
};

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="font-body text-body-md text-mist/60 mb-12">
            Last updated: February 2026
          </p>

          <div className="prose-container space-y-8 font-body text-body-md text-mist">
            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                What are cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website.
                They help the website remember your preferences and understand how you use the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                How we use cookies
              </h2>
              <p className="mb-4">
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Understand how you navigate our website</li>
                <li>Improve our website performance and user experience</li>
                <li>Ensure the security of your session</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Types of cookies we use
              </h2>

              <h3 className="font-display text-lg text-soft-gold/80 mb-3 mt-6">
                Essential cookies
              </h3>
              <p className="mb-4">
                These cookies are necessary for the website to function properly. They enable core
                functionality such as security, session management, and accessibility. You cannot
                opt out of these cookies.
              </p>

              <h3 className="font-display text-lg text-soft-gold/80 mb-3 mt-6">
                Analytics cookies
              </h3>
              <p className="mb-4">
                We may use analytics cookies to understand how visitors interact with our website.
                This helps us improve our content and user experience. These cookies collect
                information anonymously.
              </p>

              <h3 className="font-display text-lg text-soft-gold/80 mb-3 mt-6">
                Functional cookies
              </h3>
              <p>
                These cookies allow the website to remember choices you make (such as your
                preferred language or region) and provide enhanced, more personal features.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Managing your cookie preferences
              </h2>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>View what cookies are stored on your device</li>
                <li>Delete some or all cookies</li>
                <li>Block cookies from being set</li>
                <li>Set your browser to notify you when cookies are being used</li>
              </ul>
              <p className="mt-4">
                Please note that blocking or deleting cookies may affect your experience on our
                website, and some features may not work as intended.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Third-party cookies
              </h2>
              <p>
                We do not use third-party advertising cookies. If we use any third-party services
                that set cookies (such as embedded maps or forms), we will inform you and seek
                your consent where required.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Updates to this policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our
                practices or for legal, operational, or regulatory reasons. We encourage you to
                review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-soft-gold mb-4">
                Contact us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-rich-gold hover:text-soft-gold underline">
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
