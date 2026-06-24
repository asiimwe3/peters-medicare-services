export const translations = {
  // Navbar
  'nav.home': { en: 'Home', rn: 'Ekyaro' },
  'nav.about': { en: 'About', rn: 'Ebikwata Ife' },
  'nav.services': { en: 'Services', rn: 'Obuhwezi' },
  'nav.outreach': { en: 'Outreach', rn: 'Okwegwisa' },
  'nav.pricing': { en: 'Pricing', rn: 'Ebiciro' },
  'nav.blog': { en: 'Blog', rn: 'Amakuru' },
  'nav.contact': { en: 'Contact', rn: 'Tukwatane' },
  'nav.donate': { en: 'Donate', rn: 'Tureho' },
  'nav.book': { en: 'Book via WhatsApp', rn: 'Ndika na WhatsApp' },
  // Hero
  'hero.title': { en: 'Quality, Affordable & Patient-Centered Healthcare', rn: 'Obuhwezi Obwiza, Obutakwera na Obugumikiriza Omurwaire' },
  'hero.subtitle': { en: 'Serving Kyenjojo, Kyegegwa, Kibaale and the Rwenzori region since 2013. Trusted, professional, and built for every family.', rn: 'Twahweza Kyenjojo, Kyegegwa, Kibaale n\'Iburenzi rya Rwenzori okuva 2013. Twesimiirwa, ab\'obukwatirize, tukorekerwa omu miryango yona.' },
  'hero.call': { en: 'Call Now: 0776 004 277', rn: 'Turiha Kati: 0776 004 277' },
  'hero.whatsapp': { en: 'Book via WhatsApp', rn: 'Ndika na WhatsApp' },
  // Common
  'common.learnMore': { en: 'Learn More', rn: 'Manya Biingi' },
  'common.callNow': { en: 'Call Now', rn: 'Turiha Kati' },
  'common.bookAppointment': { en: 'Book Appointment', rn: 'Ndika Ekiro' },
  'common.readMore': { en: 'Read More', rn: 'Soma Biingi' },
  'common.viewAll': { en: 'View All', rn: 'Reba Byona' },
  'common.close': { en: 'Close', rn: 'Ziba' },
  'common.back': { en: 'Back', rn: 'Garuka' },
  // Footer
  'footer.tagline': { en: 'Quality, Affordable & Patient-Centered Healthcare', rn: 'Obuhwezi Obwiza, Obutakwera na Obugumikiriza Omurwaire' },
  'footer.quickLinks': { en: 'Quick Links', rn: 'Amazima Mangu' },
  'footer.services': { en: 'Services', rn: 'Obuhwezi' },
  'footer.contact': { en: 'Contact Us', rn: 'Tukwatane' },
  'footer.established': { en: 'Established 2013', rn: 'Yatandikibwa 2013' },
  'footer.licensed': { en: 'Licensed by Ministry of Health Uganda', rn: 'Yatondoorwa na Gavumenti ya Obuzima Uganda' },
  // Services
  'services.medical': { en: 'Medical Services', rn: 'Obuhwezi bwa Vuba' },
  'services.maternal': { en: 'Maternal Health', rn: 'Obuzima bw\'Omukazi Otwara' },
  'services.diagnostics': { en: 'Diagnostics', rn: 'Okukendeera Endwara' },
  'services.specialized': { en: 'Specialized Services', rn: 'Obuhwezi Obuzibu' },
  'services.outreach': { en: 'Community Outreach', rn: 'Okwegwisa omu Kibuga' },
  // About
  'about.vision': { en: 'Our Vision', rn: 'Okurora Kwaffe' },
  'about.mission': { en: 'Our Mission', rn: 'Omugaso Gwaffe' },
  // Emergency guide
  'emergency.title': { en: 'Is it an Emergency?', rn: 'Ni Amabara?' },
  'emergency.subtitle': { en: 'Answer a few quick questions to find out how urgently you need care.', rn: 'Ishura ebibuuzo bikeera okumanya obwangu bw\'obuhwezi.' },
  // Clinic status  
  'status.open': { en: 'Open Now', rn: 'Mufunzibwe Kati' },
  'status.closed': { en: 'Closed', rn: 'Zibwa' },
  'status.emergency': { en: 'Emergency Services Only', rn: 'Obuhwezi bw\'Amabara Bwokka' },
  'status.hours': { en: 'Mon–Sat: 8AM–6PM | Sunday: Emergency only', rn: 'Orwokubiri–Ow\'omukaga: 8AM–6PM | Sande: Amabara Bwokka' },
};

export function t(key: string, lang: 'en' | 'rn'): string {
  return (translations as Record<string, { en: string; rn: string }>)[key]?.[lang] ?? (translations as Record<string, { en: string; rn: string }>)[key]?.['en'] ?? key;
}
