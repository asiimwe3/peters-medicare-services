export interface FaqItem {
  id: string;
  question: string;
  questionRn: string;
  answer: string;
  answerRn: string;
  category: "general" | "services" | "pricing" | "location" | "maternal" | "hiv";
}

export const faqItems: FaqItem[] = [
  {
    id: "1",
    category: "general",
    question: "Where is Peters Medicare Services located?",
    questionRn: "Peters Medicare Services eri heki?",
    answer: "We are located in Kyenjojo Town, 200 metres along the Kyenjojo–Kagadi Road. We are easy to find — just ask for the clinic near the Kagadi turn-off.",
    answerRn: "Tuli omu Kyenjojo Town, metero 200 ku kkubo rya Kyenjojo–Kagadi. Tunoonekerwa mangu — buuza kliniki ehafi n'okukyukira Kagadi.",
  },
  {
    id: "2",
    category: "general",
    question: "Are you open 24 hours?",
    questionRn: "Mugala edda wa?",
    answer: "We are open 24 hours a day, 7 days a week — including weekends and public holidays. Walk in any time, or call 0776 004 277.",
    answerRn: "Tufungurwa Orwokubiri okutuka Ow'omukaga okuva 8:00 AM okutuka 6:00 PM. Amasande, obuhwezi bw'amabara bubaho. Kw'amabara ebiri hanze ey'amasaha, turihe 0776 004 277.",
  },
  {
    id: "3",
    category: "pricing",
    question: "How much does a consultation cost?",
    questionRn: "Okukebwa kugura esente ngahe?",
    answer: "A general consultation costs UGX 5,000 — one of the most affordable rates in the region. Specialist referral consultations are UGX 10,000.",
    answerRn: "Okukebwa kwa businge kugura UGX 5,000 — n'emiciro emigyikirifu omu kitundu. Okukebwa kw'omusawo mukuru kugura UGX 10,000.",
  },
  {
    id: "4",
    category: "pricing",
    question: "Is HIV testing really free?",
    questionRn: "Okukebera HIV kuba bwereere mazima?",
    answer: "Yes — HIV counseling and testing is completely free at Peters Medicare Services. Results are confidential and available the same day.",
    answerRn: "Yego — okukebera HIV n'obukyereza biba bwereere mazima aha Peters Medicare Services. Ebisoboozi biba bya kyama era bifunibwa eizooba ery'ekyo.",
  },
  {
    id: "5",
    category: "maternal",
    question: "What maternal health services do you offer?",
    questionRn: "Mufugaho obuhwezi bwa ki bw'obuzima bw'omukazi otwara?",
    answer: "We offer comprehensive maternal care including antenatal visits (UGX 10,000), safe delivery (UGX 50,000), postnatal care, and family planning services. No appointment is needed for antenatal — walk in any weekday.",
    answerRn: "Tufugaho obuhwezi bwona bw'omukazi otwara: okukebwa embere y'okuzaara (UGX 10,000), okuzaara obugumifu (UGX 50,000), okukebwa nyuma y'okuzaara, n'obuhwezi bw'okutegeka omurimo. Otakwetaba kw'okukebwa embere — jenda olunaku lwona lw'eihuuhi.",
  },
  {
    id: "6",
    category: "services",
    question: "Do you have a laboratory and ultrasound?",
    questionRn: "Mufugaho laboratory n'ultrasound?",
    answer: "Yes. Our laboratory offers malaria RDT (UGX 3,000), full blood count (UGX 10,000), urinalysis (UGX 5,000), and many more tests. Obstetric ultrasound starts from UGX 20,000 and abdominal ultrasound from UGX 25,000.",
    answerRn: "Yego. Laboratory yaffe efugaho okukebera malaria (UGX 3,000), omusaayi (UGX 10,000), amazyo (UGX 5,000), n'ebikebwa biingi. Ultrasound y'okwitwara egusha okuva UGX 20,000 n'ey'olubuto okuva UGX 25,000.",
  },
  {
    id: "7",
    category: "services",
    question: "Do you offer dental and eye care?",
    questionRn: "Mufugaho obuhwezi bw'amenyo n'amaaso?",
    answer: "Yes. We provide dental services including extractions (UGX 15,000), scaling (UGX 20,000), and oral health advice. Eye examinations are UGX 10,000 and we treat common eye conditions.",
    answerRn: "Yego. Tufugaho obuhwezi bw'amenyo: okuggya amenyo (UGX 15,000), okukuura (UGX 20,000), n'obwegyesha bw'omwa. Okukebwa amaaso kugura UGX 10,000 era tubuuza endwara z'amaaso ezitera.",
  },
  {
    id: "8",
    category: "general",
    question: "Do I need to book an appointment in advance?",
    questionRn: "Nkwata okwendiika embere?",
    answer: "Most services are walk-in — no appointment needed. For planned procedures, deliveries, or if you prefer a specific time, WhatsApp us on 0776 004 277 to schedule.",
    answerRn: "Obuhwezi bwingi bubaho otakwetaba — jenda omwoyo. Kw'emikolo etegekebwa, okuzaara, oba omara ekiro ekitorobaine, wandiika kuri WhatsApp 0776 004 277.",
  },
  {
    id: "9",
    category: "services",
    question: "Do you offer inpatient (admitted) care?",
    questionRn: "Mufugaho obuhwezi bw'okusigara?",
    answer: "Yes, we have inpatient facilities for patients who require admission and overnight care. Our medical team provides 24-hour monitoring for admitted patients.",
    answerRn: "Yego, tufugaho endagi z'abarwaire abakwata okusigara era n'obuhwezi bw'ekiro. Abakizi baffe baroreza abarwaire abategekwa amasaha 24.",
  },
  {
    id: "10",
    category: "general",
    question: "What forms of payment do you accept?",
    questionRn: "Mwakira esente zaffe otya?",
    answer: "We accept cash, MTN Mobile Money, and Airtel Money. For donations to support community programs, we also accept Pesapal online payments.",
    answerRn: "Twakira esente, MTN Mobile Money, n'Airtel Money. Kw'okureeba obugyenyi bw'emirimu gy'okwegwisa, twakira n'okuriha kwa Pesapal.",
  },
  {
    id: "11",
    category: "general",
    question: "Are you registered with the Uganda Ministry of Health?",
    questionRn: "Mwandikibwa na Minisitiri ya Obuzima Uganda?",
    answer: "Yes. Peters Medicare Services is fully licensed and registered with the Uganda Ministry of Health. We comply with all national health standards and regulations.",
    answerRn: "Yego. Peters Medicare Services yatondoorwa kandi yandikibwa na Minisitiri ya Obuzima Uganda. Twemereza amateeka yona ay'obuzima y'ensi.",
  },
  {
    id: "12",
    category: "services",
    question: "Do you carry out community outreach programs?",
    questionRn: "Mukora emirimu gy'okwegwisa omu kibuga?",
    answer: "Yes — through our NGO arm, Community Health Empowerment Initiatives Uganda (CHEIU), we run free health days, HIV testing drives, cancer screenings, medical male circumcision programs, and maternal outreach across the Rwenzori region. Check our outreach calendar for upcoming events.",
    answerRn: "Yego — kubaako CHEIU yaffe, tukora ebizooba by'obuzima bwereere, okukebera HIV, okukebera cancer, okukebwa kw'abasajja, n'okwegwisa kw'omukazi otwara mu Rwenzori. Reba calendar y'okwegwisa gwaffe kw'emisango ejja.",
  },
];

export const faqCategories = [
  { value: "all", label: "All Questions" },
  { value: "general", label: "General" },
  { value: "services", label: "Services" },
  { value: "pricing", label: "Pricing" },
  { value: "maternal", label: "Maternal Health" },
  { value: "hiv", label: "HIV & Testing" },
  { value: "location", label: "Location" },
];
