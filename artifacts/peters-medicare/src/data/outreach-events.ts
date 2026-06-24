export interface OutreachEvent {
  id: string;
  date: string; // ISO date "2025-07-15"
  title: string;
  titleRn: string; // Runyoro translation
  location: string;
  district: string;
  type: 'screening' | 'immunization' | 'circumcision' | 'maternal' | 'hiv' | 'general';
  description: string;
  descriptionRn: string;
  isFree: boolean;
  contact?: string;
}

export const outreachEvents: OutreachEvent[] = [
  {
    id: '1',
    date: '2025-07-12',
    title: 'Free Cervical Cancer Screening Day',
    titleRn: 'Okukendeera Endwara ya Cancer y\'Omuhondo — Bwereere',
    location: 'Peters Medicare Services Clinic',
    district: 'Kyenjojo',
    type: 'screening',
    description: 'Free cervical cancer screening for all women aged 25–65. No appointment needed. Bring your national ID.',
    descriptionRn: 'Okukendeera endwara ya cancer y\'omuhondo kubakazi bona ab\'emyaka 25–65. Otakwetaba. Reeta identity card yo ya gavumenti.',
    isFree: true,
    contact: '0776 004 277',
  },
  {
    id: '2',
    date: '2025-07-19',
    title: 'Community HIV Testing & Counseling Drive',
    titleRn: 'Okukebera HIV omu Kibuga — Bwereere',
    location: 'Kyenjojo Town Council Grounds',
    district: 'Kyenjojo',
    type: 'hiv',
    description: 'Free, confidential HIV testing and counseling for the whole community. Results available same day.',
    descriptionRn: 'Okukebera HIV bwereere n\'obukyereza. Ebisoboozi bifunibwa eizooba ery\'ekyo.',
    isFree: true,
    contact: '0776 004 277',
  },
  {
    id: '3',
    date: '2025-07-26',
    title: 'Medical Male Circumcision Program',
    titleRn: 'Okukebwa kw\'Abasajja — Obuhwezi bwa Vuba',
    location: 'Peters Medicare Services Clinic',
    district: 'Kyenjojo',
    type: 'circumcision',
    description: 'Safe medical male circumcision for HIV prevention. Free for ages 15–49. Pre-registration required.',
    descriptionRn: 'Okukebwa kw\'abasajja obugumifu kw\'okubuuza HIV. Bwereere ab\'emyaka 15–49. Wandiika embere.',
    isFree: true,
    contact: '0776 004 277',
  },
  {
    id: '4',
    date: '2025-08-02',
    title: 'Maternal Health Outreach — Kibaale Village',
    titleRn: 'Okwegwisa kw\'Obuzima bw\'Omukazi Otwara — Kibaale',
    location: 'Kibaale Primary School Grounds',
    district: 'Kibaale',
    type: 'maternal',
    description: 'Free antenatal checkups, nutrition counseling, and family planning for expecting and new mothers.',
    descriptionRn: 'Okukyebera kw\'abakyala ababibirwa bwereere, obukyereza bw\'ebikulya, n\'okutegeka omurimo.',
    isFree: true,
    contact: '0778 989 221',
  },
  {
    id: '5',
    date: '2025-08-09',
    title: 'Children\'s Immunization Day',
    titleRn: 'Eizooba ry\'Okwesiga Ebirobyo — Abaana',
    location: 'Peters Medicare Services Clinic',
    district: 'Kyenjojo',
    type: 'immunization',
    description: 'Free childhood immunizations for children aged 0–5. Bring your child\'s health card.',
    descriptionRn: 'Okwesiga ebirobyo bwereere abaana ab\'emyaka 0–5. Reeta kaadi y\'obuzima y\'omwana wo.',
    isFree: true,
    contact: '0776 004 277',
  },
  {
    id: '6',
    date: '2025-08-23',
    title: 'Free General Health Screening Day',
    titleRn: 'Eizooba ry\'Okukendeera Obuzima Bwona — Bwereere',
    location: 'Kyegegwa Town Council',
    district: 'Kyegegwa',
    type: 'general',
    description: 'Blood pressure checks, diabetes screening, eye tests, and general health consultations — all free.',
    descriptionRn: 'Okukebera ebyomubiri — amahembe ga bulamu, obwangu bw\'obuzibu, amaaso, n\'obuhwezi bwona bwereere.',
    isFree: true,
    contact: '0776 004 277',
  },
];
