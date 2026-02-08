/**
 * HOME VARIANT B - Dark, Bold & Distinctive
 *
 * Design direction: Confident, premium, distinctive. More aggressive use of contrast,
 * texture, depth. Gold used decisively. Dark foundations with moments of relief.
 *
 * Key principles from feedback:
 * - Better section contrast and rhythm
 * - More intentional gold usage (headlines, dividers, primary CTAs only)
 * - Stronger heading confidence
 * - Visual depth (shadows, texture, layers)
 * - One lighter "breathing" section
 *
 * This is a TEMPORARY variant for comparison. Uses inline styles to avoid affecting main CSS.
 */

import Link from 'next/link';
import Image from 'next/image';

export default function HomeVariantB() {
  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Hero - Full bleed, dramatic, textured */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1a1d2e'
      }}>
        {/* Background Image */}
        <Image
          src="/manchester-skyline.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />

        {/* Gradient overlay - deeper, with vignette effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(29,32,50,0.92) 0%, rgba(61,66,89,0.85) 50%, rgba(29,32,50,0.95) 100%)'
        }} />

        {/* Subtle grain texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        {/* Content */}
        <div className="container-editorial" style={{ position: 'relative', zIndex: 10, padding: '6rem 0' }}>
          <div style={{ maxWidth: '800px' }}>
            {/* Eyebrow with gold accent */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <span style={{
                width: '48px',
                height: '3px',
                backgroundColor: '#E5C55C'
              }} />
              <span style={{
                fontSize: '0.8125rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#E5C55C',
                fontWeight: 500
              }}>
                Healthcare Recruitment
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#F5E6A3',
              marginBottom: '1.5rem',
              fontWeight: 400,
              letterSpacing: '-0.02em'
            }}>
              Specialist healthcare assistant recruitment you can trust
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: '#F5F4F0',
              marginBottom: '3rem',
              maxWidth: '580px',
              lineHeight: 1.6,
              opacity: 0.85
            }}>
              Care recruitment built on trust. Personal service from start to finish.
              When you contact Medibee, you speak directly to the decision maker, 24 hours a day.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  backgroundColor: '#E5C55C',
                  color: '#1a1d2e',
                  padding: '1.125rem 2.5rem',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 24px rgba(229, 197, 92, 0.25)'
                }}
              >
                Get in touch
              </Link>
              <Link
                href="/services"
                style={{
                  backgroundColor: 'transparent',
                  color: '#F5E6A3',
                  padding: '1.125rem 2.5rem',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  border: '2px solid rgba(245, 230, 163, 0.4)',
                  letterSpacing: '0.02em'
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
          height: '4px',
          backgroundColor: '#E5C55C'
        }} />
      </section>

      {/* Decision Fork - "How can we help?" with elevated cards */}
      <section style={{
        backgroundColor: '#2a2e42',
        padding: '6rem 0',
        position: 'relative'
      }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              color: '#F5E6A3',
              marginBottom: '1rem'
            }}>
              How can we help you?
            </h2>
            <p style={{ color: '#F5F4F0', opacity: 0.6 }}>
              Select your situation to find out more
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Care Provider Card */}
            <Link
              href="/services"
              style={{
                display: 'block',
                backgroundColor: '#1a1d2e',
                textDecoration: 'none',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 197, 92, 0.1)',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <Image
                  src="/consultation.png"
                  alt="Care provider consultation"
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26,29,46,1) 0%, transparent 60%)'
                }} />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#E5C55C',
                  marginBottom: '1.5rem'
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: '#F5E6A3',
                  marginBottom: '1rem'
                }}>
                  I&apos;m a care provider
                </h3>
                <p style={{ color: '#F5F4F0', opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Find reliable healthcare assistants for your NHS trust, care home, or private healthcare organisation.
                </p>
                <span style={{
                  color: '#E5C55C',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                backgroundColor: '#1a1d2e',
                textDecoration: 'none',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 197, 92, 0.1)',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <Image
                  src="/hca-female.png"
                  alt="Healthcare assistant"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.4s' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26,29,46,1) 0%, transparent 60%)'
                }} />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#E5C55C',
                  marginBottom: '1.5rem'
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: '#F5E6A3',
                  marginBottom: '1rem'
                }}>
                  I&apos;m a healthcare assistant
                </h3>
                <p style={{ color: '#F5F4F0', opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Join an agency that values you, with flexible work and honest communication.
                </p>
                <span style={{
                  color: '#E5C55C',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Work with us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BREATHING SECTION - Light relief */}
      <section style={{
        backgroundColor: '#F8F7F4',
        padding: '6rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            {/* Content */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#E5C55C'
                }} />
                <span style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#696F8B',
                  fontWeight: 600
                }}>
                  Why Medibee
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.25rem',
                color: '#1a1d2e',
                marginBottom: '1.5rem',
                lineHeight: 1.15
              }}>
                Local experts in healthcare recruitment
              </h2>

              <p style={{
                fontSize: '1.0625rem',
                color: '#4a4e5a',
                marginBottom: '2.5rem',
                lineHeight: 1.7
              }}>
                We specialise only in healthcare assistants and the care sector. We understand care environments and expectations. We build partnerships, not just fill shifts.
              </p>

              {/* Trust indicators */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}>
                {[
                  { stat: '24/7', label: 'Support available' },
                  { stat: '100%', label: 'Compliance checked' },
                  { stat: 'Local', label: 'Manchester based' },
                  { stat: 'Fast', label: 'Response times' }
                ].map((item) => (
                  <div key={item.label} style={{
                    borderLeft: '3px solid #E5C55C',
                    paddingLeft: '1rem'
                  }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1a1d2e'
                    }}>
                      {item.stat}
                    </div>
                    <div style={{
                      fontSize: '0.8125rem',
                      color: '#696F8B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div style={{
              position: 'relative',
              aspectRatio: '4/3'
            }}>
              <Image
                src="/consultation.png"
                alt="Medibee consultation"
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Gold accent frame */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                right: '-1.5rem',
                bottom: '-1.5rem',
                border: '3px solid #E5C55C',
                zIndex: -1
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Dark with better hierarchy */}
      <section style={{
        backgroundColor: '#3d4259',
        padding: '6rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              width: '60px',
              height: '3px',
              backgroundColor: '#E5C55C',
              margin: '0 auto 2rem'
            }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              color: '#F5E6A3'
            }}>
              How it works
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '4rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* For Care Providers */}
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                color: '#F5F4F0',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
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
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#E5C55C',
                      color: '#1a1d2e',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {index + 1}
                    </span>
                    <p style={{
                      color: '#F5F4F0',
                      opacity: 0.85,
                      fontSize: '1.0625rem',
                      lineHeight: 1.5,
                      paddingTop: '0.75rem'
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
                fontSize: '1.125rem',
                color: '#F5F4F0',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
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
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#E5C55C',
                      color: '#1a1d2e',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {index + 1}
                    </span>
                    <p style={{
                      color: '#F5F4F0',
                      opacity: 0.85,
                      fontSize: '1.0625rem',
                      lineHeight: 1.5,
                      paddingTop: '0.75rem'
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

      {/* Trust & Compliance - Prominent */}
      <section style={{
        backgroundColor: '#1a1d2e',
        padding: '5rem 0'
      }}>
        <div className="container-editorial">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '3px',
              backgroundColor: '#E5C55C',
              margin: '0 auto 2rem'
            }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: '#F5E6A3',
              marginBottom: '1.5rem'
            }}>
              Nationwide support you can rely on
            </h2>
            <p style={{
              color: '#F5F4F0',
              opacity: 0.75,
              fontSize: '1.0625rem',
              marginBottom: '3rem',
              lineHeight: 1.7
            }}>
              Nationwide support for NHS and private healthcare providers, with a clear focus on suitability, safeguarding, and reliability.
            </p>

            {/* Compliance badges */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
              {['DBS Checked', 'Right to Work Verified', 'ICO Registered'].map((badge) => (
                <div key={badge} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#E5C55C'
                  }} />
                  <span style={{
                    fontSize: '0.8125rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#F5E6A3',
                    opacity: 0.8
                  }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Split with stronger presence */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* For Clients */}
        <div style={{
          backgroundColor: '#2a2e42',
          padding: '5rem 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#E5C55C',
              marginBottom: '1rem',
              display: 'block'
            }}>
              For Clients
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: '#F5E6A3',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Reliable Staffing Support
            </h2>
            <p style={{
              color: '#F5F4F0',
              opacity: 0.7,
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              MediBee acts as an extension of your care team, helping maintain continuity and quality of care.
            </p>
            <Link
              href="/contact"
              style={{
                backgroundColor: '#F8F7F4',
                color: '#1a1d2e',
                padding: '1rem 2rem',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: 600,
                display: 'inline-block',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}
            >
              Find Staff Now
            </Link>
          </div>
        </div>

        {/* For Carers */}
        <div style={{
          backgroundColor: '#E5C55C',
          padding: '5rem 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background image */}
          <Image
            src="/hca-male.png"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'top', opacity: 0.12 }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1a1d2e',
              marginBottom: '1rem',
              display: 'block',
              opacity: 0.7
            }}>
              For Carers
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: '#1a1d2e',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Flexible Work, Local Opportunities
            </h2>
            <p style={{
              color: '#1a1d2e',
              opacity: 0.75,
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              We offer consistent work that fits around your availability, with full support through onboarding.
            </p>
            <Link
              href="/candidate/register"
              style={{
                backgroundColor: '#1a1d2e',
                color: '#F5E6A3',
                padding: '1rem 2rem',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: 600,
                display: 'inline-block',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Access Strip */}
      <section style={{
        backgroundColor: '#1a1d2e',
        padding: '1.25rem 0',
        borderTop: '1px solid rgba(245, 230, 163, 0.1)'
      }}>
        <div className="container-editorial" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: '#F5F4F0',
            opacity: 0.4,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Already registered?
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/candidate/login" style={{
              color: '#F5F4F0',
              opacity: 0.6,
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'opacity 0.2s'
            }}>
              Candidate Portal
            </Link>
            <span style={{ width: '1px', height: '16px', backgroundColor: 'rgba(245,244,240,0.2)' }} />
            <Link href="/client/login" style={{
              color: '#F5F4F0',
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
