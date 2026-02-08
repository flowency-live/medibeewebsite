import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet the Team',
  description:
    'Meet the dedicated team behind Medibee Recruitment Ltd. Personal service from people who understand healthcare.',
};

const TEAM = [
  {
    name: 'Sarah Mitchell',
    role: 'Managing Director',
    bio: 'With over 15 years in healthcare recruitment, Sarah founded Medibee to deliver the personal, reliable service she believes the industry deserves.',
  },
  {
    name: 'James Okonkwo',
    role: 'Operations Manager',
    bio: 'James oversees day-to-day operations, ensuring our healthcare assistants and care providers receive responsive, consistent support.',
  },
  {
    name: 'Priya Sharma',
    role: 'Compliance Lead',
    bio: 'Priya manages all pre-employment checks, DBS verification, and regulatory compliance to maintain the highest standards.',
  },
  {
    name: 'Michael Chen',
    role: 'Client Relations',
    bio: 'Michael works directly with care providers to understand their needs and match them with the right healthcare assistants.',
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="rule-gold mb-8" />
            <h1 className="font-display text-display-lg text-soft-gold mb-6">
              Meet the team
            </h1>
            <p className="font-body text-body-lg text-mist">
              Personal service from people who understand healthcare. When you work with
              Medibee, you work with us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-spacing bg-slate-blue">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-deep-slate p-8 border-l-[3px] border-rich-gold"
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-slate-blue flex-shrink-0 flex items-center justify-center">
                    <span className="font-display text-display-sm text-soft-gold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-display-sm text-soft-gold mb-1">
                      {member.name}
                    </h2>
                    <p className="font-body text-ui-sm text-rich-gold uppercase tracking-ui mb-4">
                      {member.role}
                    </p>
                    <p className="font-body text-body-md text-mist">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-deep-slate">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="rule-gold mb-8" />
            <h2 className="font-display text-display-md text-soft-gold mb-6">
              Our approach
            </h2>
            <div className="space-y-6 font-body text-body-lg text-mist">
              <p>
                Every member of the Medibee team shares the same commitment: to provide
                honest, reliable recruitment services that put people first.
              </p>
              <p>
                We keep our team small deliberately. This means you always speak to
                someone who knows your situation, understands your needs, and can make
                decisions without passing you around.
              </p>
              <p>
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
