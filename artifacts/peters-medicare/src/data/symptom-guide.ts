export interface SymptomQuestion {
  id: string;
  question: string;
  questionRn: string;
  options: {
    label: string;
    labelRn: string;
    nextId: string | null; // null = show result
    result?: 'emergency' | 'urgent' | 'soon' | 'monitor';
  }[];
}

export const symptomQuestions: SymptomQuestion[] = [
  {
    id: 'start',
    question: 'What is your main concern right now?',
    questionRn: 'Ekizibu kyo ekinene kiti?',
    options: [
      { label: 'Difficulty breathing or chest pain', labelRn: 'Kuzikirwa okuhumura oba ekibabi omu kifuba', nextId: null, result: 'emergency' },
      { label: 'High fever (feeling very hot)', labelRn: 'Omusujja omwingi (okwaka nnyo)', nextId: 'fever' },
      { label: 'Pregnancy-related concern', labelRn: 'Ekizibu ekyokwitwara', nextId: 'pregnancy' },
      { label: 'Wound or injury', labelRn: 'Ekisago oba okubonaboneka', nextId: 'wound' },
      { label: 'General illness (cough, cold, stomach)', labelRn: 'Obwangu bwa businge (ekikuba, enzikiza, olubuto)', nextId: 'general' },
      { label: 'I need a routine checkup', labelRn: 'Nkwata okukyebera kw\'olunaku', nextId: null, result: 'monitor' },
    ],
  },
  {
    id: 'fever',
    question: 'How long have you had the fever?',
    questionRn: 'Omusujja wagutaha edda?',
    options: [
      { label: 'More than 3 days', labelRn: 'Okusinga ennaku 3', nextId: null, result: 'urgent' },
      { label: 'Less than 3 days, but very high', labelRn: 'Wansi w\'ennaku 3, naye omwingi nnyo', nextId: null, result: 'urgent' },
      { label: 'Started today, mild', labelRn: 'Yatandika eizooba, ntono', nextId: null, result: 'soon' },
    ],
  },
  {
    id: 'pregnancy',
    question: 'What is the pregnancy concern?',
    questionRn: 'Ekizibu ky\'okwitwara ki?',
    options: [
      { label: 'Heavy bleeding', labelRn: 'Omusaayi omwingi', nextId: null, result: 'emergency' },
      { label: 'Severe abdominal pain', labelRn: 'Kubonaboneka ennyo omu lubuto', nextId: null, result: 'emergency' },
      { label: 'Baby not moving (after 28 weeks)', labelRn: 'Omwana tazimba (emabega w\'emyezi 7)', nextId: null, result: 'emergency' },
      { label: 'Routine antenatal visit due', labelRn: 'Ekiro ky\'okukyebera kw\'embere', nextId: null, result: 'soon' },
    ],
  },
  {
    id: 'wound',
    question: 'How serious is the wound?',
    questionRn: 'Ekisago kimeka?',
    options: [
      { label: 'Deep cut or won\'t stop bleeding', labelRn: 'Ekisago ekijingi oba omusaayi gutazibirira', nextId: null, result: 'emergency' },
      { label: 'Animal or human bite', labelRn: 'Okusumiirwa omubisi oba omuntu', nextId: null, result: 'urgent' },
      { label: 'Small wound, some swelling or redness', labelRn: 'Ekisago kinono, okwota oba okubebuka', nextId: null, result: 'soon' },
    ],
  },
  {
    id: 'general',
    question: 'How long have you felt unwell?',
    questionRn: 'Wabonarirwa edda wa?',
    options: [
      { label: 'More than a week', labelRn: 'Okusinga wiiki emu', nextId: null, result: 'urgent' },
      { label: '3–7 days and getting worse', labelRn: 'Ennaku 3–7 era bikola bibiize', nextId: null, result: 'urgent' },
      { label: '1–3 days, manageable', labelRn: 'Ennaku 1–3, bisoboka', nextId: null, result: 'soon' },
      { label: 'Just started today', labelRn: 'Byatandika eizooba', nextId: null, result: 'monitor' },
    ],
  },
];

export const results = {
  emergency: {
    level: 'emergency',
    title: 'Go to the Clinic Immediately',
    titleRn: 'Jenda Vuba omu Kliniki',
    color: 'red',
    description: 'Your symptoms may be serious. Please go to Peters Medicare Services now or call us immediately.',
    descriptionRn: 'Ebizibu byo birashobora kuba bikadde. Jenda vuba oba turihe kati.',
    action: 'Call Now: 0776 004 277',
    actionRn: 'Turiha Kati: 0776 004 277',
    actionLink: 'tel:+256776004277',
  },
  urgent: {
    level: 'urgent',
    title: 'Visit Us Today or Tomorrow',
    titleRn: 'Jenda Eizooba Ery\'ekino oba Ery\'enkya',
    color: 'orange',
    description: 'You should see a doctor soon. Walk in today — no appointment needed.',
    descriptionRn: 'Okolekwa omusawo mangu. Jenda eizooba — otakwetaba.',
    action: 'Book via WhatsApp',
    actionRn: 'Ndika na WhatsApp',
    actionLink: 'https://wa.me/256776004277?text=I need an urgent appointment at Peters Medicare',
  },
  soon: {
    level: 'soon',
    title: 'See a Doctor Within 2–3 Days',
    titleRn: 'Raba Omusawo mu Nnaku 2–3',
    color: 'yellow',
    description: 'Your condition should be checked soon. Book an appointment or walk in.',
    descriptionRn: 'Endwara yo ekolekwa okukebwa mangu. Ndika ekiro oba jenda.',
    action: 'Book Appointment',
    actionRn: 'Ndika Ekiro',
    actionLink: 'https://wa.me/256776004277?text=I would like to book an appointment at Peters Medicare',
  },
  monitor: {
    level: 'monitor',
    title: 'Monitor at Home for Now',
    titleRn: 'Rondera Endwara Munju Okwegatta',
    color: 'green',
    description: 'Rest, drink water, and monitor your symptoms. Come in if things get worse or you\'re concerned.',
    descriptionRn: 'Eka, nywa amazzi, era roreza ebizibu byo. Jenda nabyo bibiize oba obonabonerwa.',
    action: 'Call If Worried',
    actionRn: 'Turiha Omara Okubonerwa',
    actionLink: 'tel:+256776004277',
  },
};
