import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet the Team',
  description:
    'Meet the dedicated team behind Medibee Recruitment Ltd. Personal service from people who understand healthcare.',
};

const TEAM: Array<{
  name: string;
  role: string;
  bio: string;
  image: string | null;
}> = [
  {
    name: 'Team Member',
    role: 'Managing Director',
    bio: 'Leading Medibee with a commitment to delivering personal, reliable healthcare recruitment services that put people first.',
    image: null,
  },
  {
    name: 'Team Member',
    role: 'Operations Manager',
    bio: 'Overseeing day-to-day operations, ensuring our healthcare assistants and care providers receive responsive, consistent support.',
    image: null,
  },
  {
    name: 'Team Member',
    role: 'Compliance Lead',
    bio: 'Managing all pre-employment checks, DBS verification, and regulatory compliance to maintain the highest standards.',
    image: null,
  },
  {
    name: 'Team Member',
    role: 'Client Relations',
    bio: 'Working directly with care providers to understand their needs and match them with the right healthcare assistants.',
    image: null,
  },
];

// Grain texture
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// Honeycomb SVG pattern (proper hexagons)
const honeycombPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23E5C55C' fill-opacity='0.08'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export default function TeamPage() {
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
                Our People
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
              Meet the team
            </h1>
            <p
              className="text-lg leading-relaxed opacity-85"
              style={{ color: '#F5F4F0' }}
            >
              Personal service from people who understand healthcare. When you work with
              Medibee, you work with us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section style={{ backgroundColor: '#2a2e42' }}>
        <div className="container-editorial">
          <div className="space-y-0">
            {TEAM.map((member, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={member.name}
                  className="grid md:grid-cols-2"
                >
                  {/* Image / Placeholder */}
                  <div
                    className={`relative aspect-[4/3] md:aspect-auto md:min-h-[400px] ${isEven ? 'md:order-1' : 'md:order-2'}`}
                    style={{ backgroundColor: '#3d4259' }}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* Avatar placeholder - hexagon-styled silhouette */}
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mb-4 opacity-40"
                        >
                          {/* Hexagon background */}
                          <path
                            d="M60 5L110 32.5V87.5L60 115L10 87.5V32.5L60 5Z"
                            fill="#1a1d2e"
                            stroke="#E5C55C"
                            strokeWidth="2"
                            strokeOpacity="0.3"
                          />
                          {/* Person silhouette */}
                          <circle cx="60" cy="45" r="18" fill="#E5C55C" fillOpacity="0.4" />
                          <path
                            d="M35 95C35 77.327 46.193 65 60 65C73.807 65 85 77.327 85 95"
                            fill="#E5C55C"
                            fillOpacity="0.4"
                          />
                        </svg>
                        <span
                          className="text-sm tracking-[0.1em] uppercase opacity-50"
                          style={{ color: '#F5E6A3' }}
                        >
                          Awaiting Photo
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div
                    className={`p-8 md:p-12 flex flex-col justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}
                    style={{
                      backgroundColor: '#1a1d2e',
                      borderLeft: isEven ? '3px solid #E5C55C' : 'none',
                      borderRight: !isEven ? '3px solid #E5C55C' : 'none',
                    }}
                  >
                    <h2
                      className="font-display text-xl mb-1"
                      style={{ color: '#F5E6A3' }}
                    >
                      {member.name}
                    </h2>
                    <p
                      className="text-xs uppercase tracking-[0.15em] mb-6"
                      style={{ color: '#E5C55C' }}
                    >
                      {member.role}
                    </p>
                    <p
                      className="text-lg leading-relaxed opacity-85"
                      style={{ color: '#F5F4F0' }}
                    >
                      {member.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values - with honeycomb */}
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
          <div className="max-w-3xl mx-auto">
            <div
              className="w-[60px] h-[3px] mb-8"
              style={{ backgroundColor: '#E5C55C' }}
            />
            <h2
              className="font-display text-[2rem] mb-8"
              style={{ color: '#F5E6A3' }}
            >
              Our approach
            </h2>
            <div className="space-y-6">
              <p
                className="text-lg leading-relaxed opacity-85"
                style={{ color: '#F5F4F0' }}
              >
                Every member of the Medibee team shares the same commitment: to provide
                honest, reliable recruitment services that put people first.
              </p>
              <p
                className="text-lg leading-relaxed opacity-85"
                style={{ color: '#F5F4F0' }}
              >
                We keep our team small deliberately. This means you always speak to
                someone who knows your situation, understands your needs, and can make
                decisions without passing you around.
              </p>
              <p
                className="text-lg leading-relaxed opacity-85"
                style={{ color: '#F5F4F0' }}
              >
                When you call Medibee, you reach us directly. No call centres, no
                automated systems, no waiting for someone to get back to you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
