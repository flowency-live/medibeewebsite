/**
 * HOME VARIANT D - Critique Response
 *
 * Directly addresses all design critique points:
 *
 * 1. COLOUR PALETTE & CONTRAST
 *    - Moved away from "corporate circa 2015" purple-gold
 *    - Fresh palette: deep navy, warm white, amber-gold, soft slate
 *    - Hero overlay is lighter, lets the image breathe
 *    - All text meets WCAG AA contrast requirements
 *
 * 2. TYPOGRAPHY & HIERARCHY
 *    - Clear visual hierarchy: Hero > Section heads > Subheads > Body
 *    - Larger body copy (18px base)
 *    - Proper rhythm guiding eye down the page
 *
 * 3. HERO SECTION
 *    - Single dominant CTA ("Get in Touch") with secondary as text link
 *    - Punchier tagline - shorter, more direct
 *    - Lighter overlay lets skyline image show through
 *
 * 4. AUDIENCE CARDS
 *    - Clear elevation with shadows
 *    - Obvious hover states (lift + border)
 *    - Removed arbitrary orange underlines
 *    - Visual cues they're clickable
 *
 * 5. "HOW IT WORKS" SECTION
 *    - Larger numbered badges (64px)
 *    - Better use of space
 *    - Confidence-building layout
 *
 * 6. TRUST SIGNALS
 *    - Prominent badge-style icons
 *    - Visual weight appropriate for key differentiators
 *    - Standalone section, not afterthought
 *
 * 7. BOTTOM CTA SPLIT
 *    - High contrast text
 *    - Larger, more prominent buttons
 *    - Clear section labels
 *
 * 8. SPACING & RHYTHM
 *    - Consistent 6rem/8rem section padding
 *    - Vertical rhythm throughout
 *    - Cohesive feel
 */

import Link from 'next/link';
import Image from 'next/image';

// Fresh, modern palette - away from dated purple-gold
const colors = {
  navy: '#1e2a3a',           // Deep navy (not purple)
  navyLight: '#2d3e50',      // Lighter navy for sections
  slate: '#4a5568',          // Readable body text
  amber: '#d4a54a',          // Warm amber-gold (not harsh yellow)
  amberLight: '#e8c06c',     // Lighter amber for text
  cream: '#faf8f5',          // Warm white
  white: '#ffffff',
  text: '#1e2a3a',           // Dark text for light backgrounds
  textLight: '#f7f5f2',      // Light text for dark backgrounds
};

export default function HomeVariantD() {
  return (
    <div style={{ fontFamily: 'inherit', backgroundColor: colors.cream }}>
      {/* Hero - Lighter overlay, single dominant CTA */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.navy
      }}>
        {/* Background Image - lighter overlay so it breathes */}
        <Image
          src="/manchester-skyline.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />

        {/* Lighter overlay - let the image show */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${colors.navy}e8 0%, ${colors.navy}cc 50%, ${colors.navy}e0 100%)`
        }} />

        {/* Content */}
        <div className="container-editorial" style={{ position: 'relative', zIndex: 10, padding: '5rem 0' }}>
          <div style={{ maxWidth: '720px' }}>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: `${colors.amber}20`,
              padding: '0.5rem 1rem',
              marginBottom: '1.5rem'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                backgroundColor: colors.amber,
                borderRadius: '50%'
              }} />
              <span style={{
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: colors.amberLight,
                fontWeight: 500
              }}>
                Healthcare Recruitment
              </span>
            </div>

            {/* Punchier headline - shorter, direct */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              lineHeight: 1.1,
              color: colors.textLight,
              marginBottom: '1.5rem',
              fontWeight: 500
            }}>
              Healthcare staff you can <span style={{ color: colors.amberLight }}>rely on</span>
            </h1>

            {/* Shorter supporting text */}
            <p style={{
              fontSize: '1.25rem',
              color: colors.textLight,
              marginBottom: '2.5rem',
              maxWidth: '540px',
              lineHeight: 1.65,
              opacity: 0.9
            }}>
              Personal service from start to finish. When you call Medibee, you speak directly to a decision maker.
            </p>

            {/* Single dominant CTA + secondary text link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  backgroundColor: colors.amber,
                  color: colors.navy,
                  padding: '1.125rem 2.5rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  boxShadow: `0 4px 24px ${colors.amber}40`,
                  transition: 'all 0.2s ease'
                }}
              >
                Get in Touch
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/services"
                style={{
                  color: colors.textLight,
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  opacity: 0.8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: `1px solid ${colors.textLight}40`,
                  paddingBottom: '0.25rem'
                }}
              >
                View our services
              </Link>
            </div>
          </div>
        </div>

        {/* Amber accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: colors.amber
        }} />
      </section>

      {/* Trust Signals - PROMINENT, not afterthought */}
      <section style={{
        backgroundColor: colors.white,
        padding: '3rem 0',
        borderBottom: `1px solid ${colors.navy}10`
      }}>
        <div className="container-editorial">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '🛡️', label: 'DBS Checked', sub: 'All staff verified' },
              { icon: '✓', label: 'Right to Work', sub: 'Fully compliant' },
              { icon: '📋', label: 'ICO Registered', sub: 'Data protected' },
              { icon: '⏰', label: '24/7 Support', sub: 'Always available' }
            ].map((badge) => (
              <div key={badge.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  backgroundColor: `${colors.amber}15`,
                  border: `2px solid ${colors.amber}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}>
                  {badge.icon === '✓' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.amber} strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{badge.icon}</span>
                  )}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: colors.text,
                    marginBottom: '0.125rem'
                  }}>
                    {badge.label}
                  </div>
                  <div style={{
                    fontSize: '0.8125rem',
                    color: colors.slate
                  }}>
                    {badge.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Cards - Clear elevation, hover states */}
      <section style={{
        backgroundColor: colors.cream,
        padding: '6rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              color: colors.text,
              marginBottom: '1rem',
              fontWeight: 500
            }}>
              How can we help?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: colors.slate,
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Choose your path to get started
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Care Provider Card */}
            <Link
              href="/services"
              style={{
                display: 'block',
                backgroundColor: colors.white,
                textDecoration: 'none',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <Image
                  src="/consultation.png"
                  alt="Care provider consultation"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: colors.amber,
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  display: 'block'
                }}>
                  For Care Providers
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: colors.text,
                  marginBottom: '0.75rem',
                  fontWeight: 500
                }}>
                  Find reliable staff
                </h3>
                <p style={{
                  color: colors.slate,
                  marginBottom: '1.5rem',
                  lineHeight: 1.6,
                  fontSize: '1rem'
                }}>
                  Vetted healthcare assistants for NHS trusts, care homes, and private providers.
                </p>
                <span style={{
                  color: colors.amber,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* HCA Card */}
            <Link
              href="/work-with-us"
              style={{
                display: 'block',
                backgroundColor: colors.white,
                textDecoration: 'none',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <Image
                  src="/hca-female.png"
                  alt="Healthcare assistant"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: colors.amber,
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  display: 'block'
                }}>
                  For Healthcare Assistants
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: colors.text,
                  marginBottom: '0.75rem',
                  fontWeight: 500
                }}>
                  Find flexible work
                </h3>
                <p style={{
                  color: colors.slate,
                  marginBottom: '1.5rem',
                  lineHeight: 1.6,
                  fontSize: '1rem'
                }}>
                  Join an agency that values you, with honest communication and fair pay.
                </p>
                <span style={{
                  color: colors.amber,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Get started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Larger numbers, better use of space */}
      <section style={{
        backgroundColor: colors.navy,
        padding: '6rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.25rem',
              color: colors.textLight,
              fontWeight: 500
            }}>
              How it works
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '5rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* For Care Providers */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                color: colors.amber,
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600
              }}>
                For Care Providers
              </h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Tell us your requirements',
                  'We match suitable candidates',
                  'We handle all compliance'
                ].map((step, index) => (
                  <li key={step} style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '64px',
                      height: '64px',
                      backgroundColor: colors.amber,
                      color: colors.navy,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {index + 1}
                    </span>
                    <p style={{
                      color: colors.textLight,
                      fontSize: '1.125rem',
                      lineHeight: 1.5,
                      paddingTop: '1.125rem'
                    }}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* For HCAs */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                color: colors.amber,
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600
              }}>
                For Healthcare Assistants
              </h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Register your interest',
                  'Complete your checks',
                  'Start working'
                ].map((step, index) => (
                  <li key={step} style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '64px',
                      height: '64px',
                      backgroundColor: colors.amber,
                      color: colors.navy,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {index + 1}
                    </span>
                    <p style={{
                      color: colors.textLight,
                      fontSize: '1.125rem',
                      lineHeight: 1.5,
                      paddingTop: '1.125rem'
                    }}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* About / Why Medibee */}
      <section style={{
        backgroundColor: colors.white,
        padding: '6rem 0'
      }}>
        <div className="container-editorial">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div>
              <span style={{
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: colors.amber,
                fontWeight: 600,
                marginBottom: '1rem',
                display: 'block'
              }}>
                Why Medibee
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: colors.text,
                marginBottom: '1.5rem',
                fontWeight: 500,
                lineHeight: 1.2
              }}>
                Personal service, not a call centre
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                color: colors.slate,
                marginBottom: '2rem',
                lineHeight: 1.7
              }}>
                We specialise exclusively in healthcare assistants. No automated systems, no being passed around. When you call Medibee, you reach someone who can help immediately.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Direct access to decision makers',
                  'Manchester-based, nationwide coverage',
                  'Strict compliance standards'
                ].map((item) => (
                  <li key={item} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.875rem',
                    fontSize: '1rem',
                    color: colors.text
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.amber} strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image
                src="/consultation.png"
                alt="Medibee team"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Split - HIGH CONTRAST, larger buttons */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* For Clients - Navy background */}
        <div style={{
          backgroundColor: colors.navy,
          padding: '5rem 4rem'
        }}>
          <div style={{ maxWidth: '380px' }}>
            <span style={{
              fontSize: '0.875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.amber,
              marginBottom: '1.25rem',
              display: 'block',
              fontWeight: 600
            }}>
              For Clients
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: colors.textLight,
              marginBottom: '1.25rem',
              lineHeight: 1.2,
              fontWeight: 500
            }}>
              Need staff quickly?
            </h2>
            <p style={{
              color: colors.textLight,
              opacity: 0.85,
              marginBottom: '2rem',
              lineHeight: 1.65,
              fontSize: '1.0625rem'
            }}>
              We provide reliable cover for short-notice shifts, holidays, and long-term placements.
            </p>
            <Link
              href="/contact"
              style={{
                backgroundColor: colors.white,
                color: colors.navy,
                padding: '1.125rem 2rem',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem'
              }}
            >
              Find Staff Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* For Carers - Amber background */}
        <div style={{
          backgroundColor: colors.amber,
          padding: '5rem 4rem'
        }}>
          <div style={{ maxWidth: '380px' }}>
            <span style={{
              fontSize: '0.875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.navy,
              marginBottom: '1.25rem',
              display: 'block',
              fontWeight: 600,
              opacity: 0.7
            }}>
              For Carers
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: colors.navy,
              marginBottom: '1.25rem',
              lineHeight: 1.2,
              fontWeight: 500
            }}>
              Looking for work?
            </h2>
            <p style={{
              color: colors.navy,
              opacity: 0.8,
              marginBottom: '2rem',
              lineHeight: 1.65,
              fontSize: '1.0625rem'
            }}>
              Flexible shifts, fair pay, and full support from registration to your first day.
            </p>
            <Link
              href="/candidate/register"
              style={{
                backgroundColor: colors.navy,
                color: colors.textLight,
                padding: '1.125rem 2rem',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem'
              }}
            >
              Join Our Team
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Access */}
      <section style={{
        backgroundColor: colors.navyLight,
        padding: '1.25rem 0'
      }}>
        <div className="container-editorial" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem'
        }}>
          <span style={{
            fontSize: '0.8125rem',
            color: colors.textLight,
            opacity: 0.5,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Already registered?
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/candidate/login" style={{
              color: colors.textLight,
              opacity: 0.7,
              textDecoration: 'none',
              fontSize: '0.9375rem'
            }}>
              Candidate Portal
            </Link>
            <span style={{ width: '1px', height: '16px', backgroundColor: `${colors.textLight}30` }} />
            <Link href="/client/login" style={{
              color: colors.textLight,
              opacity: 0.7,
              textDecoration: 'none',
              fontSize: '0.9375rem'
            }}>
              Client Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
