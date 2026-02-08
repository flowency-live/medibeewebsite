export const siteConfig = {
  name: 'Medibee Recruitment Ltd',
  description: 'Specialist healthcare assistant recruitment you can trust',
  tagline: 'Care recruitment built on trust',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://medibee.opstack.uk',
  email: 'hello@medibee-recruitment.co.uk',
  company: {
    name: 'Medibee Recruitment Ltd',
    registration: 'Registered in England & Wales',
    companyNumber: '[TBC]',
    registeredOffice: '[TBC]',
    icoRegistration: 'ICO Registration Pending',
  },
  links: {
    home: '/',
    services: '/services',
    workWithUs: '/work-with-us',
    about: '/about',
    team: '/team',
    contact: '/contact',
    privacy: '/privacy-policy',
    safeguarding: '/safeguarding',
    complaints: '/complaints',
  },
  nav: [
    {
      label: 'Home',
      href: '/',
      children: [
        { label: 'Home', href: '/' },
        { label: 'Variant A (Light)', href: '/home-variant-a' },
        { label: 'Variant B (Dark)', href: '/home-variant-b' },
        { label: 'Variant C (Refined)', href: '/home-variant-c' },
        { label: 'Variant D (Critique)', href: '/home-variant-d' },
      ],
    },
    { label: 'Services', href: '/services' },
    { label: 'Work With Us', href: '/work-with-us' },
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
