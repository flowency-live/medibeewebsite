'use client';

/**
 * HOME VARIANT C - Refined & Distinctive
 *
 * This variant directly addresses all feedback points:
 *
 * COLOUR & RHYTHM:
 * - Introduces lighter neutral band (warm off-white) between dark sections
 * - Deepened darkest blue so gold really pops
 * - Gold used more decisively (section dividers, key headings, primary CTAs only)
 *
 * TYPOGRAPHY:
 * - Increased heading weight/tracking on hero + section titles
 * - One headline per section is bold and declarative
 *
 * HERO:
 * - Subtle grain texture overlay
 * - Slight vignette effect
 * - Stronger contrast behind headline
 * - Better size difference between primary and secondary CTAs
 * - Stronger hover feedback
 *
 * DECISION CARDS:
 * - Clear container contrast
 * - Slight elevation (shadow + border)
 * - Increased CTA visibility with arrow icons
 * - Stronger hover states
 *
 * HOW IT WORKS:
 * - Increased spacing between steps
 * - Bigger, bolder numbers
 *
 * TRUST SECTION:
 * - Increased spacing and visual separation
 *
 * LOWER CTAs:
 * - Stronger visual energy
 * - More confident CTA copy
 *
 * This is a TEMPORARY variant for comparison. Uses inline styles to avoid affecting main CSS.
 */

import Link from 'next/link';
import Image from 'next/image';

// Refined color palette
const colors = {
  darkest: '#1a1d2e',      // Deepened for gold contrast
  dark: '#2a2e42',         // Dark sections
  mid: '#3d4259',          // Mid-tone
  light: '#696F8B',        // Slate blue
  offWhite: '#FAF9F6',     // Warm off-white for breathing room
  cream: '#F5F4F0',        // Light neutral
  gold: '#E5C55C',         // Rich gold (primary accent)
  goldLight: '#F5E6A3',    // Soft gold (headings)
  text: '#F5F4F0',         // Light text
};

export default function HomeVariantC() {
  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Hero - Distinctive, ownable, confident */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.darkest
      }}>
        {/* Background Image */}
        <Image
          src="/manchester-skyline.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />

        {/* Multi-layer overlay for vignette effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at center, transparent 0%, ${colors.darkest}ee 70%, ${colors.darkest} 100%),
            linear-gradient(to bottom, ${colors.darkest}dd 0%, ${colors.darkest}99 40%, ${colors.darkest}dd 100%)
          `
        }} />

        {/* Grain texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        {/* Content */}
        <div className="container-editorial" style={{ position: 'relative', zIndex: 10, padding: '6rem 0' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            {/* Gold accent line */}
            <div style={{
              width: '80px',
              height: '4px',
              backgroundColor: colors.gold,
              margin: '0 auto 2rem',
              boxShadow: `0 0 20px ${colors.gold}40`
            }} />

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              color: colors.goldLight,
              marginBottom: '1.75rem',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)'
            }}>
              Specialist healthcare recruitment you can trust
            </h1>

            <p style={{
              fontSize: '1.3125rem',
              color: colors.text,
              marginBottom: '3rem',
              maxWidth: '620px',
              margin: '0 auto 3rem',
              lineHeight: 1.65,
              opacity: 0.88
            }}>
              Care recruitment built on trust. Personal service from start to finish.
              When you contact Medibee, you speak directly to the decision maker, 24 hours a day.
            </p>

            {/* CTAs with clear size hierarchy */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  backgroundColor: colors.gold,
                  color: colors.darkest,
                  padding: '1.25rem 3rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  boxShadow: `0 4px 30px ${colors.gold}35`,
                  transition: 'all 0.25s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Get in touch
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/services"
                style={{
                  backgroundColor: 'transparent',
                  color: colors.goldLight,
                  padding: '1.125rem 2rem',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  border: `2px solid ${colors.goldLight}50`,
                  letterSpacing: '0.02em',
                  transition: 'all 0.25s ease'
                }}
              >
                Our services
              </Link>
            </div>
          </div>
        </div>

        {/* Gold line at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '5px',
          backgroundColor: colors.gold,
          boxShadow: `0 -2px 20px ${colors.gold}30`
        }} />
      </section>

      {/* BREATHING SECTION - Light relief with warm off-white */}
      <section style={{
        backgroundColor: colors.offWhite,
        padding: '6rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.75rem',
              color: colors.darkest,
              marginBottom: '1rem',
              fontWeight: 400
            }}>
              How can we help you?
            </h2>
            <p style={{ color: colors.light, fontSize: '1.0625rem' }}>
              Select your situation to find out more
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Care Provider Card - Elevated with clear contrast */}
            <Link
              href="/services"
              style={{
                display: 'block',
                backgroundColor: 'white',
                textDecoration: 'none',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                border: `1px solid ${colors.gold}20`,
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 50px rgba(0,0,0,0.12), 0 0 0 2px ${colors.gold}`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <Image
                  src="/consultation.png"
                  alt="Care provider consultation"
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{
                  width: '50px',
                  height: '4px',
                  backgroundColor: colors.gold,
                  marginBottom: '1.25rem'
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.625rem',
                  color: colors.darkest,
                  marginBottom: '0.875rem'
                }}>
                  I&apos;m a care provider
                </h3>
                <p style={{
                  color: colors.light,
                  marginBottom: '1.5rem',
                  lineHeight: 1.65,
                  fontSize: '1rem'
                }}>
                  Find reliable healthcare assistants for your NHS trust, care home, or private healthcare organisation.
                </p>
                <span style={{
                  color: colors.gold,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'underline',
                  textDecorationColor: `${colors.gold}50`,
                  textUnderlineOffset: '4px'
                }}>
                  Learn more
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                backgroundColor: 'white',
                textDecoration: 'none',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                border: `1px solid ${colors.gold}20`,
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 50px rgba(0,0,0,0.12), 0 0 0 2px ${colors.gold}`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <Image
                  src="/hca-female.png"
                  alt="Healthcare assistant"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{
                  width: '50px',
                  height: '4px',
                  backgroundColor: colors.gold,
                  marginBottom: '1.25rem'
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.625rem',
                  color: colors.darkest,
                  marginBottom: '0.875rem'
                }}>
                  I&apos;m a healthcare assistant
                </h3>
                <p style={{
                  color: colors.light,
                  marginBottom: '1.5rem',
                  lineHeight: 1.65,
                  fontSize: '1rem'
                }}>
                  Join an agency that values you, with flexible work and honest communication.
                </p>
                <span style={{
                  color: colors.gold,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'underline',
                  textDecorationColor: `${colors.gold}50`,
                  textUnderlineOffset: '4px'
                }}>
                  Work with us
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Confident, spacious */}
      <section style={{
        backgroundColor: colors.mid,
        padding: '7rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              width: '70px',
              height: '4px',
              backgroundColor: colors.gold,
              margin: '0 auto 2rem'
            }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.75rem',
              color: colors.goldLight,
              fontWeight: 400
            }}>
              How it works
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '5rem',
            maxWidth: '950px',
            margin: '0 auto'
          }}>
            {/* For Care Providers */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                color: colors.text,
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 500
              }}>
                For care providers
              </h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Contact us with your requirements',
                  'We discuss suitability and availability',
                  'We introduce vetted healthcare assistants'
                ].map((step, index) => (
                  <li key={step} style={{
                    display: 'flex',
                    gap: '1.75rem',
                    marginBottom: '2.5rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '56px',
                      height: '56px',
                      backgroundColor: colors.gold,
                      color: colors.darkest,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 20px ${colors.gold}30`
                    }}>
                      {index + 1}
                    </span>
                    <p style={{
                      color: colors.text,
                      opacity: 0.88,
                      fontSize: '1.125rem',
                      lineHeight: 1.55,
                      paddingTop: '1rem'
                    }}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* For Healthcare Assistants */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                color: colors.text,
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 500
              }}>
                For healthcare assistants
              </h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Register your interest',
                  'We complete checks and understand your preferences',
                  'We match you to suitable work'
                ].map((step, index) => (
                  <li key={step} style={{
                    display: 'flex',
                    gap: '1.75rem',
                    marginBottom: '2.5rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '56px',
                      height: '56px',
                      backgroundColor: colors.gold,
                      color: colors.darkest,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 20px ${colors.gold}30`
                    }}>
                      {index + 1}
                    </span>
                    <p style={{
                      color: colors.text,
                      opacity: 0.88,
                      fontSize: '1.125rem',
                      lineHeight: 1.55,
                      paddingTop: '1rem'
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

      {/* Trust & Compliance - Prominent, not a footnote */}
      <section style={{
        backgroundColor: colors.darkest,
        padding: '6rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: '70px',
              height: '4px',
              backgroundColor: colors.gold,
              margin: '0 auto 2rem'
            }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.25rem',
              color: colors.goldLight,
              marginBottom: '1.5rem',
              fontWeight: 400
            }}>
              Nationwide support you can rely on
            </h2>
            <p style={{
              color: colors.text,
              opacity: 0.78,
              fontSize: '1.125rem',
              marginBottom: '3.5rem',
              lineHeight: 1.7
            }}>
              Nationwide support for NHS and private healthcare providers, with a clear focus on suitability, safeguarding, and reliability.
            </p>

            {/* Compliance badges - More prominent */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4rem',
              flexWrap: 'wrap'
            }}>
              {['DBS Checked', 'Right to Work Verified', 'ICO Registered'].map((badge) => (
                <div key={badge} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: colors.gold,
                    boxShadow: `0 0 10px ${colors.gold}50`
                  }} />
                  <span style={{
                    fontSize: '0.875rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: colors.goldLight,
                    fontWeight: 500
                  }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Stronger emotional presence */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* For Clients */}
        <div style={{
          backgroundColor: colors.dark,
          padding: '5.5rem 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle geometric pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '420px' }}>
            <span style={{
              fontSize: '0.8125rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: colors.gold,
              marginBottom: '1.25rem',
              display: 'block',
              fontWeight: 500
            }}>
              For Clients
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.125rem',
              color: colors.goldLight,
              marginBottom: '1.25rem',
              lineHeight: 1.15
            }}>
              Reliable Staffing Support
            </h2>
            <p style={{
              color: colors.text,
              opacity: 0.72,
              marginBottom: '2.25rem',
              lineHeight: 1.65,
              fontSize: '1.0625rem'
            }}>
              MediBee acts as an extension of your care team, helping maintain continuity and quality of care.
            </p>
            <Link
              href="/contact"
              style={{
                backgroundColor: colors.offWhite,
                color: colors.darkest,
                padding: '1.125rem 2.25rem',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                transition: 'all 0.25s ease'
              }}
            >
              Find Staff Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* For Carers - Gold panel for distinction */}
        <div style={{
          backgroundColor: colors.gold,
          padding: '5.5rem 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background image */}
          <Image
            src="/hca-male.png"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'top', opacity: 0.1 }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '420px' }}>
            <span style={{
              fontSize: '0.8125rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: colors.darkest,
              marginBottom: '1.25rem',
              display: 'block',
              fontWeight: 500,
              opacity: 0.65
            }}>
              For Carers
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.125rem',
              color: colors.darkest,
              marginBottom: '1.25rem',
              lineHeight: 1.15
            }}>
              Flexible Work, Local Opportunities
            </h2>
            <p style={{
              color: colors.darkest,
              opacity: 0.7,
              marginBottom: '2.25rem',
              lineHeight: 1.65,
              fontSize: '1.0625rem'
            }}>
              We offer consistent work that fits around your availability, with full support through onboarding.
            </p>
            <Link
              href="/candidate/register"
              style={{
                backgroundColor: colors.darkest,
                color: colors.goldLight,
                padding: '1.125rem 2.25rem',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.25s ease'
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

      {/* Portal Access Strip */}
      <section style={{
        backgroundColor: colors.darkest,
        padding: '1.375rem 0',
        borderTop: `1px solid ${colors.goldLight}15`
      }}>
        <div className="container-editorial" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: colors.text,
            opacity: 0.4,
            textTransform: 'uppercase',
            letterSpacing: '0.12em'
          }}>
            Already registered?
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/candidate/login" style={{
              color: colors.text,
              opacity: 0.6,
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'opacity 0.2s'
            }}>
              Candidate Portal
            </Link>
            <span style={{ width: '1px', height: '18px', backgroundColor: `${colors.text}25` }} />
            <Link href="/client/login" style={{
              color: colors.text,
              opacity: 0.6,
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'opacity 0.2s'
            }}>
              Client Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
