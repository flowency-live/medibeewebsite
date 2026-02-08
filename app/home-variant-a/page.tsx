/**
 * HOME VARIANT A - Light & High Contrast
 *
 * Design direction: Clean, professional, light backgrounds with high contrast sections.
 * Similar to the reference screenshot - white/cream backgrounds, navy accents, gold highlights.
 *
 * This is a TEMPORARY variant for comparison. Uses inline styles to avoid affecting main CSS.
 */

import Link from 'next/link';
import Image from 'next/image';

export default function HomeVariantA() {
  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Hero - Split layout with logo and image */}
      <section style={{ backgroundColor: '#F5F4F0', padding: '3rem 0 4rem' }}>
        <div className="container-editorial">
          {/* Location tag */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#696F8B',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#E5C55C' }}>★</span>
              Serving Greater Manchester & Nationwide
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left column - Logo and text */}
            <div>
              {/* Large Logo */}
              <div style={{
                backgroundColor: '#3d4259',
                padding: '2rem',
                marginBottom: '2rem',
                maxWidth: '280px'
              }}>
                <Image
                  src="/medibee-logo.png"
                  alt="Medibee Recruitment"
                  width={220}
                  height={80}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.75rem',
                lineHeight: 1.1,
                color: '#3d4259',
                marginBottom: '1.5rem'
              }}>
                Reliable carers you can{' '}
                <span style={{ color: '#E5C55C' }}>trust</span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                color: '#696F8B',
                marginBottom: '2rem',
                maxWidth: '400px',
                lineHeight: 1.6
              }}>
                Supplying fully vetted, compassionate carers to care providers. We are your local partners in maintaining exceptional standards of care.
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                  href="/contact"
                  style={{
                    backgroundColor: '#3d4259',
                    color: '#F5F4F0',
                    padding: '1rem 1.5rem',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Request Care Staff →
                </Link>
                <Link
                  href="/candidate/register"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#3d4259',
                    padding: '1rem 1.5rem',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    border: '2px solid #3d4259'
                  }}
                >
                  Join as a Carer
                </Link>
              </div>
            </div>

            {/* Right column - Image with badge */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                border: '8px solid #3d4259'
              }}>
                <Image
                  src="/consultation.png"
                  alt="Care consultation"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Compliance badge */}
              <div style={{
                position: 'absolute',
                bottom: '-1rem',
                left: '2rem',
                backgroundColor: 'white',
                padding: '1rem 1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#E5C55C',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3d4259" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#3d4259', fontSize: '0.875rem' }}>Fully Compliant</div>
                  <div style={{ fontSize: '0.75rem', color: '#696F8B' }}>DBS checked, referenced & right-to-work verified staff.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: '#3d4259', padding: '2rem 0' }}>
        <div className="container-editorial">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E6A3' }}>24/7</div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F5F4F0' }}>Support Available</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E6A3' }}>100%</div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F5F4F0' }}>Compliance Checked</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E6A3' }}>Local</div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F5F4F0' }}>Manchester Based</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E6A3' }}>Fast</div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F5F4F0' }}>Response Times</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Image left, text right */}
      <section style={{ backgroundColor: 'white', padding: '5rem 0' }}>
        <div className="container-editorial">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image
                src="/manchester-skyline.jpg"
                alt="Manchester"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: '#3d4259',
                marginBottom: '1.5rem'
              }}>
                Local Experts in Healthcare Recruitment
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#696F8B',
                marginBottom: '2rem',
                lineHeight: 1.7
              }}>
                Medibee is a Manchester-based agency built on reliability, compassion, and deep local knowledge. We don&apos;t just fill shifts; we build partnerships.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {[
                  'Strict compliance and vetting procedures',
                  'Personalized service for every client',
                  'Rapid response for emergency cover',
                  'Dedicated to the Greater Manchester & Cheshire area'
                ].map((item) => (
                  <li key={item} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                    color: '#3d4259',
                    fontSize: '0.9375rem'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5C55C" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                style={{
                  color: '#696F8B',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Read more about us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ backgroundColor: '#F5F4F0', padding: '5rem 0' }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#E5C55C',
              fontWeight: 600
            }}>
              Our Services
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.25rem',
              color: '#3d4259',
              marginTop: '0.5rem',
              marginBottom: '1rem'
            }}>
              Staffing Solutions Tailored to You
            </h2>
            <p style={{ color: '#696F8B', maxWidth: '600px', margin: '0 auto' }}>
              Whether you need emergency cover or long-term placements, we have the workforce to support you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: 'Temporary Staffing',
                description: 'Flexible, reliable carers available for short-notice cover, holidays, and sickness absence.'
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M12 3a9 9 0 1 0 9 9" />
                    <path d="M21 3v6h-6" />
                  </svg>
                ),
                title: 'Emergency Cover',
                description: 'Urgent staffing solutions when you need them most. We are ready to help 24/7.'
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="7" r="4" />
                    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    <circle cx="19" cy="11" r="3" />
                    <path d="M22 21v-1.5a3 3 0 0 0-3-3h-1" />
                  </svg>
                ),
                title: 'Contract Placements',
                description: 'Longer-term staffing support to ensure continuity of care for your residents.'
              }
            ].map((service) => (
              <div
                key={service.title}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderTop: '3px solid #696F8B'
                }}
              >
                <div style={{ color: '#696F8B', marginBottom: '1.5rem' }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#3d4259',
                  marginBottom: '0.75rem'
                }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#696F8B', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  style={{
                    color: '#696F8B',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* For Clients */}
        <div style={{
          backgroundColor: '#3d4259',
          padding: '4rem',
          color: 'white'
        }}>
          <span style={{
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#E5C55C',
            marginBottom: '1rem',
            display: 'block'
          }}>
            For Clients
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            marginBottom: '1rem',
            color: '#F5E6A3'
          }}>
            Reliable Staffing Support
          </h2>
          <p style={{ color: '#F5F4F0', opacity: 0.8, marginBottom: '2rem', maxWidth: '360px' }}>
            MediBee acts as an extension of your care team, helping maintain continuity and quality of care.
          </p>
          <Link
            href="/contact"
            style={{
              backgroundColor: '#F5F4F0',
              color: '#3d4259',
              padding: '0.875rem 1.5rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'inline-block'
            }}
          >
            Find Staff Now
          </Link>
        </div>

        {/* For Carers */}
        <div style={{
          backgroundColor: '#696F8B',
          padding: '4rem',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Image
            src="/hca-female.png"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.15 }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#E5C55C',
              marginBottom: '1rem',
              display: 'block'
            }}>
              For Carers
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              marginBottom: '1rem',
              color: '#F5E6A3'
            }}>
              Flexible Work, Local Opportunities
            </h2>
            <p style={{ color: '#F5F4F0', opacity: 0.9, marginBottom: '2rem', maxWidth: '360px' }}>
              We offer consistent work that fits around your availability, with full support through onboarding.
            </p>
            <Link
              href="/candidate/register"
              style={{
                backgroundColor: '#E5C55C',
                color: '#3d4259',
                padding: '0.875rem 1.5rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                display: 'inline-block'
              }}
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: 'white', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container-editorial">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: '#3d4259',
            marginBottom: '1rem'
          }}>
            Ready to work with Medibee?
          </h2>
          <p style={{ color: '#696F8B', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Whether you&apos;re a care provider looking for staff or a carer looking for work, we&apos;re here to help.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link
              href="/contact"
              style={{
                backgroundColor: '#E5C55C',
                color: '#3d4259',
                padding: '1rem 2rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              Contact Us Today
            </Link>
            <Link
              href="/about"
              style={{
                backgroundColor: 'transparent',
                color: '#696F8B',
                padding: '1rem 2rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: '2px solid #696F8B'
              }}
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Access Strip */}
      <section style={{ backgroundColor: '#3d4259', padding: '1rem 0' }}>
        <div className="container-editorial" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#F5F4F0', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Already registered?
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/candidate/login" style={{ color: '#F5F4F0', opacity: 0.7, textDecoration: 'none', fontSize: '0.875rem' }}>
              Candidate Portal
            </Link>
            <Link href="/client/login" style={{ color: '#F5F4F0', opacity: 0.7, textDecoration: 'none', fontSize: '0.875rem' }}>
              Client Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
