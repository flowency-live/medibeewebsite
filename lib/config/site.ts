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
    contact: '/contact',
    privacy: '/privacy-policy',
    safeguarding: '/safeguarding',
    complaints: '/complaints',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Work With Us', href: '/work-with-us' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
