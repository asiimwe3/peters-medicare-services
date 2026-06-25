export interface SearchResult {
  id: string;
  type: 'service' | 'page' | 'blog' | 'faq' | 'pricing';
  title: string;
  description: string;
  path: string;
  keywords: string[];
  whatsappMessage?: string;
}

export const searchIndex: SearchResult[] = [
  // Pages
  { id: 'home', type: 'page', title: 'Home', description: 'Peters Medicare Services homepage', path: '/', keywords: ['home', 'main', 'start', 'kyenjojo clinic'] },
  { id: 'about', type: 'page', title: 'About Us', description: 'Learn about Peters Medicare Services — established 2013', path: '/about', keywords: ['about', 'history', 'established', 'registered', 'ministry of health'] },
  { id: 'services', type: 'page', title: 'Our Services', description: 'Full list of medical services offered', path: '/services', keywords: ['services', 'treatment', 'medical'] },
  { id: 'outreach', type: 'page', title: 'Community Outreach', description: 'Free health days, screenings, CHEIU programs', path: '/outreach', keywords: ['outreach', 'CHEIU', 'community', 'free', 'screening', 'circumcision'] },
  { id: 'pricing', type: 'page', title: 'Pricing', description: 'Transparent service prices in UGX', path: '/pricing', keywords: ['price', 'cost', 'fee', 'how much', 'ugx', 'affordable'] },
  { id: 'contact', type: 'page', title: 'Contact Us', description: 'Phone, location, and contact form', path: '/contact', keywords: ['contact', 'phone', 'location', 'call', 'map', 'directions'] },
  { id: 'blog', type: 'page', title: 'Health Blog', description: 'Health tips and news from our medical team', path: '/blog', keywords: ['blog', 'health tips', 'news', 'articles'] },
  { id: 'donate', type: 'page', title: 'Donate', description: 'Support community health programs', path: '/donate', keywords: ['donate', 'support', 'give', 'contribution'] },
  { id: 'faq', type: 'page', title: 'FAQ', description: 'Frequently asked questions', path: '/faq', keywords: ['faq', 'questions', 'help', 'how', 'what'] },

  // Services
  { id: 'svc-general', type: 'service', title: 'General Consultation', description: 'Diagnosis and treatment — UGX 5,000', path: '/services', keywords: ['consultation', 'general', 'doctor', 'sick', 'fever', 'pain', 'illness', '5000'], whatsappMessage: "Hello, I'd like to book a General Consultation at Peters Medicare Services." },
  { id: 'svc-surgery', type: 'service', title: 'Minor Surgery', description: 'Safe minor procedures by experienced doctors', path: '/services', keywords: ['surgery', 'operation', 'procedure', 'cut', 'wound'], whatsappMessage: "Hello, I'd like to enquire about Minor Surgery services at Peters Medicare Services." },
  { id: 'svc-inpatient', type: 'service', title: 'Inpatient / Outpatient Care', description: 'Admitted and walk-in patient care', path: '/services', keywords: ['inpatient', 'outpatient', 'admission', 'ward', 'hospital', 'admit'], whatsappMessage: "Hello, I need to enquire about inpatient admission at Peters Medicare Services." },
  { id: 'svc-antenatal', type: 'service', title: 'Antenatal Care', description: 'Pregnancy checkups — UGX 10,000', path: '/services', keywords: ['antenatal', 'pregnancy', 'pregnant', 'mother', 'checkup', 'anc', '10000'], whatsappMessage: "Hello, I'd like to book an Antenatal Care visit at Peters Medicare Services." },
  { id: 'svc-delivery', type: 'service', title: 'Safe Delivery', description: 'Skilled birth attendance — UGX 50,000', path: '/services', keywords: ['delivery', 'birth', 'labour', 'labor', 'maternity', 'giving birth', '50000'], whatsappMessage: "Hello, I'd like to discuss Safe Delivery services at Peters Medicare Services." },
  { id: 'svc-family-planning', type: 'service', title: 'Family Planning', description: 'Contraception counseling and services', path: '/services', keywords: ['family planning', 'contraception', 'birth control', 'implant', 'injection'], whatsappMessage: "Hello, I'd like to book a Family Planning consultation at Peters Medicare Services." },
  { id: 'svc-malaria', type: 'service', title: 'Malaria Testing (RDT)', description: 'Fast malaria test — UGX 3,000', path: '/services', keywords: ['malaria', 'rdt', 'fever', 'test', '3000', 'mosquito'], whatsappMessage: "Hello, I need a malaria test at Peters Medicare Services." },
  { id: 'svc-lab', type: 'service', title: 'Laboratory Services', description: 'Blood tests, urinalysis, and more', path: '/services', keywords: ['lab', 'laboratory', 'blood test', 'urinalysis', 'full blood count', 'sample'], whatsappMessage: "Hello, I'd like to enquire about laboratory tests at Peters Medicare Services." },
  { id: 'svc-ultrasound', type: 'service', title: 'Ultrasound Scan', description: 'Obstetric and abdominal scans from UGX 20,000', path: '/services', keywords: ['ultrasound', 'scan', 'echo', 'imaging', 'baby scan', 'abdominal', '20000'], whatsappMessage: "Hello, I'd like to book an Ultrasound scan at Peters Medicare Services." },
  { id: 'svc-dental', type: 'service', title: 'Dental Care', description: 'Extractions, scaling, oral health — from UGX 15,000', path: '/services', keywords: ['dental', 'teeth', 'tooth', 'extraction', 'dentist', 'scaling', 'mouth', 'gum'], whatsappMessage: "Hello, I'd like to book a Dental appointment at Peters Medicare Services." },
  { id: 'svc-eye', type: 'service', title: 'Eye Care', description: 'Vision tests and eye condition treatment — UGX 10,000', path: '/services', keywords: ['eye', 'vision', 'sight', 'glasses', 'optician', 'ophthalmology'], whatsappMessage: "Hello, I'd like to book an Eye Care appointment at Peters Medicare Services." },
  { id: 'svc-hiv', type: 'service', title: 'HIV Testing & Counseling', description: 'Free, confidential HIV testing', path: '/services', keywords: ['hiv', 'aids', 'testing', 'counseling', 'sti', 'free'], whatsappMessage: "Hello, I'd like to enquire about HIV Testing services at Peters Medicare Services." },

  // Pricing quick-finds
  { id: 'price-consult', type: 'pricing', title: 'Consultation Fee', description: 'General consultation: UGX 5,000', path: '/pricing', keywords: ['consultation fee', 'price', '5000'] },
  { id: 'price-antenatal', type: 'pricing', title: 'Antenatal Price', description: 'Antenatal visit: UGX 10,000', path: '/pricing', keywords: ['antenatal price', 'anc cost', '10000'] },
  { id: 'price-delivery', type: 'pricing', title: 'Delivery Cost', description: 'Normal delivery: UGX 50,000', path: '/pricing', keywords: ['delivery cost', 'birth price', '50000'] },
  { id: 'price-ultrasound', type: 'pricing', title: 'Ultrasound Price', description: 'Ultrasound from UGX 20,000', path: '/pricing', keywords: ['ultrasound price', 'scan cost', '20000'] },

  // Blog posts
  { id: 'blog-warning-signs', type: 'blog', title: '5 Warning Signs You Should Not Ignore', description: 'General Health — May 2024', path: '/blog/5-warning-signs-you-shouldnt-ignore', keywords: ['warning signs', 'symptoms', 'when to see doctor'] },
  { id: 'blog-malaria', type: 'blog', title: 'Understanding Malaria in Uganda', description: 'Tropical Health — April 2024', path: '/blog/understanding-malaria-prevention-symptoms-treatment', keywords: ['malaria', 'prevention', 'symptoms', 'uganda'] },
  { id: 'blog-antenatal', type: 'blog', title: 'Antenatal Care: Why Every Visit Matters', description: 'Maternal Health — April 2024', path: '/blog/antenatal-care-why-every-visit-matters', keywords: ['antenatal', 'pregnancy', 'visits', 'baby'] },
  { id: 'blog-hiv', type: 'blog', title: 'HIV Testing: Know Your Status', description: 'HIV & Wellness — March 2024', path: '/blog/hiv-testing-know-your-status', keywords: ['hiv testing', 'status', 'free'] },
];

export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return searchIndex
    .filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some(k => k.toLowerCase().includes(q))
    )
    .slice(0, 8);
}