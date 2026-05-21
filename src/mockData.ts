import { Job, ApplicationCard, TailoredVersion, InterviewEvent, UserPreferences, ActivityLog } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Google',
    location: 'Berlin, Germany (Hybrid)',
    type: 'Hybrid',
    matchScore: 92,
    sourceName: 'LinkedIn',
    sourceIcon: 'linkedin',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR7WZhHxbgiVTBu4de0kT_yynvlsKYfazueCx-FLsqr3H-D5_DH073h04sVbO2aDLOm8glA-ksZltScspQB7w5IAlaMBSYFR8Llf3mf4LLMa9WxMYXwE8SPXB1y9AHHQn99jGSDx8vjbOo4vOoCgg-TCQzQlJ5s6bf2EVJsCnB5_dB_sPloByph506KjO-ugGs0upY6Q67_TaP0yJZLTHYlmCIyilOncftUuzC2pcggiZ5kU782vXbOMeARC0gzBfwpJVSa9yqPZgJ',
    salaryRange: '€95k - €120k',
    tags: ['€95k - €120k', 'Design Systems', 'Figma Master'],
    bookmarked: false,
  },
  {
    id: '2',
    title: 'UI Engineer (Growth)',
    company: 'Spotify',
    location: 'Stockholm, SE (Remote)',
    type: 'Remote',
    matchScore: 85,
    sourceName: 'Indeed',
    sourceIcon: 'public',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYNuWsJNkwsPBK8fZeIVaOwY8dT9d4S8acGycVvkKZn9fiS-rjGWHzsytvfUd0nFvRCjqeBp7h-Z-fMvIMuhYBp2J2wLjTEOl2lKoc44ziLsmRcOMC9UQc1IkQaTnDCR_034VV4bhIEUKNO1X2KAxnqnvK2ApRqnjt8Li5vULS7kckUNMSimIuT3s2Yq3yACtJGafSorOv7nOXrIHJo3sSjNYoYy_72xNKvnaJtZGS3AYIsdp8adxnDnwR8zmYRpoB2-c8725u52eB',
    salaryRange: '€80k - €105k',
    tags: ['€80k - €105k', 'React', 'Next.js'],
    bookmarked: true,
  },
  {
    id: '3',
    title: 'Visual Designer',
    company: 'Notion',
    location: 'New York, US (Remote)',
    type: 'Remote',
    matchScore: 74,
    sourceName: 'Company Site',
    sourceIcon: 'hub',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbZexuQVlJU3gTixavEAeRf8wqabNS9hyo6BkMNgN-kGVduQpFgYH6SBkhqnhYhiC5PKtJwXUnEG5qUeyn4ixGpT_BbbhklMZJw-A6OL-NTk6ytIWcmNZ0kQj7ZX148TSbKJxY8op3QF9khPH3pRv4Kq84x8xZ6GRWDX7g6E1jYj6AlquSQlmB45Hb3ivi9e1kAtmexrr5RNwfEaSgDUiMvdFWvj1xZrWroiU2gH4i9SChDWC0zaAv0Fy1BXJEggeNcg0yzFtqm9GB',
    salaryRange: '$110k - $140k',
    tags: ['$110k - $140k', 'Illustration'],
    bookmarked: false,
  },
  {
    id: '4',
    title: 'Senior Product Designer',
    company: 'Stripe',
    location: 'Remote, US',
    type: 'Remote',
    matchScore: 96,
    sourceName: 'LinkedIn',
    sourceIcon: 'linkedin',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYkoQL4-HtAJTblwDK3Kt3NMaJQ_JY0O2iSZGRj6onKaGmCAJjDzIoMcqcUTKdyf0mBmGi0NtItlAnoJ0tHdHpFcJTMBRvkI3EJS63ADkDFhzXjo9OtqtV4jV7HqX5w2cDG_4bVYnKccqsaG_vH131hwUMt0Jn8BNI4YdRiGFGWGtfjBuFk96qiCxKmzYC8KhXnv7P6I4SHzsLq-ROz1MfFNGmMWUyvmZTFMZd0IguMWsKw1JKAuoNbHV5DBMD1PX3bYUWVNCwURML',
    salaryRange: '$180k - $220k',
    tags: ['Figma', 'Fintech', '$180k-$220k'],
    bookmarked: false,
  },
  {
    id: '5',
    title: 'UX Architect',
    company: 'Oscar Health',
    location: 'New York, NY',
    type: 'Hybrid',
    matchScore: 92,
    sourceName: 'Indeed',
    sourceIcon: 'public',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMk_WK_LsbjTyS29lgwjo77cK6soJbKKaA9viil-X-U2jo2f4YSSD3NEmDmw_ZtapGBPLLYHvatdrgdpwjsm0LC2FGBEfWP5tPfefQNbZcS5Kjc-8Z66w571TP4uaDjYYa2uUxLZROdpzOSJPlznVu2AJVa1kn8LFooMd1sEImPpraid2_MOjrLt4U8zkz_ctJy1q8CKE7i4UM4Zq5oUQJuDElKJihBMXfsdS10c4secMioMqhL4fjdWaxXtWfKZU3pT1tlERPbSND',
    salaryRange: '$165k+',
    tags: ['Strategy', 'Hybrid', '$165k+'],
    bookmarked: false,
  }
];

export const INITIAL_APPLICATIONS: ApplicationCard[] = [
  {
    id: 'a1',
    company: 'Nvidia',
    title: 'Senior AI Architect',
    matchScore: 92,
    stage: 'saved',
    dateText: '2 days ago',
    attentionNeeded: true,
  },
  {
    id: 'a2',
    company: 'Stripe',
    title: 'Staff Product Designer',
    matchScore: 88,
    stage: 'saved',
    dateText: '5 days ago',
  },
  {
    id: 'a3',
    company: 'OpenAI',
    title: 'Technical Lead, Research',
    matchScore: 95,
    stage: 'applied',
    dateText: '1 day ago',
    attentionNeeded: true,
  },
  {
    id: 'a4',
    company: 'Apple',
    title: 'Frontend Engineer',
    matchScore: 81,
    stage: 'applied',
    dateText: '4 days ago',
  },
  {
    id: 'a5',
    company: 'Figma',
    title: 'Systems Engineer',
    matchScore: 76,
    stage: 'screening',
    dateText: 'Today at 2:00 PM',
  },
  {
    id: 'a6',
    company: 'Anthropic',
    title: 'Lead Data Scientist',
    matchScore: 98,
    stage: 'interview',
    dateText: '3 hours ago',
    stageDetails: 'Phase 3: Final',
  }
];

export const INITIAL_TAILORED: TailoredVersion[] = [
  {
    id: 't1',
    title: 'Senior UX - Stripe',
    score: 94,
    timeText: '3h ago',
    format: 'PDF',
  },
  {
    id: 't2',
    title: 'Product Design - Vercel',
    score: 88,
    timeText: 'Yesterday',
    format: 'DOCX',
  },
  {
    id: 't3',
    title: 'Lead UI/UX - Figma',
    score: 91,
    timeText: '4 days ago',
    format: 'PDF',
  }
];

export const CURRENT_DATE_STRING = 'Thursday, May 21, 2026';

export const INITIAL_INTERVIEWS: InterviewEvent[] = [
  {
    id: 'i1',
    company: 'Linear',
    title: 'Sr. Product Designer',
    dateText: 'Oct 24, 10:00 AM',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUqj6bcYEFal5NB_XJGzc64A1KNwmrLYLC3D_zovvg7TNPGXsqp_dVvIQzcPrHN9-NPXX-r3l--L2yi8gKNttTlhaBHioMOv6T6t3kp0DgUgwF68jYvHP1rK7AQEZ36PYogS86xo3Lmp6Le1zAcw4Vv8EJBo4B5ZDz4C08hufPSLBdKe7YnANZorxhRdP80GGnKgV67vV266Qd67ttoBtJ4yRfTlprnaAxjgbu4bDjwXIlJkaThmOL5j-eSv7hH1SG8MMlsfeCgCfo',
    type: 'Google Meet',
    statusText: 'In 2 Days',
    matchScore: 94,
    focusAreas: 'Design Systems & Interaction Design',
    salaryMinMax: '$145k - $190k',
    cultureDescription: "Hyper-focused on craft, speed, and 'magical' user experiences. They value engineers who think like designers.",
    recentNews: [
      'Raised $35M Series B',
      "Launched 'Linear Insights' module"
    ],
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAryIuGNoQnjvOKNvbDSnZrfUeAF5Y1es3FQK3_wRhny1FXvUmLxVjQo5H2AvKKb7_loRA2NmrgHIZElsk56_0pJa4BLg9plSxyG7ay3Cc16hHBxgSi_G4SGy-AC5ViLF3ZOqhprxYy0aLJG3DMLeEdKJXFMwu5yoRTAag5OTdqMu-XWMo5KqZUSobCUF3SW-wGr-x3ysyUCXC9us3sN3RRPEHXJTitj-oDKKaAOKMzOaJ71lNf4PRil5or2D4IA7aBxfPdEjdL7LmU',
    questions: [
      {
        id: 'q1',
        question: '1. How would you improve the current Linear issue tracking interface for power users?',
        answer: 'Draw upon your experience at Stripe where you implemented keyboard-first navigation. Propose a "Command Palette" expansion for bulk-editing issues, referencing your expertise in high-density data visualization.'
      },
      {
        id: 'q2',
        question: '2. Tell us about a time you had a conflict with an engineering lead on design feasibility.',
        answer: 'Reference your fintech experience where you reconciled strict performance budgets with rich fluid motion layouts. Describe how you built interactive wireframes early on to calculate layout cycles and prevent repaint bottlenecks.'
      },
      {
        id: 'q3',
        question: '3. How do you balance aesthetic minimalism with complex functional requirements?',
        answer: "Speak about context-aware progressive disclosure. You layer complexity by keeping secondary metadata inside hover drawers or clean collapse groups, prioritizing the primary user task interface while fully retaining the developer's keyboard accelerators."
      }
    ],
    checklist: [
      { id: 'ch1', text: 'Deep dive into recent product updates', checked: true },
      { id: 'ch2', text: 'Prepare 3 specific questions for the Lead', checked: true },
      { id: 'ch3', text: 'Tech Check: Microphone & Lighting', checked: false },
      { id: 'ch4', text: 'Review Salary Benchmarks (San Francisco)', checked: false },
      { id: 'ch5', text: 'Dry run Portfolio Presentation', checked: false }
    ]
  },
  {
    id: 'i2',
    company: 'Stripe',
    title: 'Design Engineer',
    dateText: 'Oct 28, Google Meet',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYkoQL4-HtAJTblwDK3Kt3NMaJQ_JY0O2iSZGRj6onKaGmCAJjDzIoMcqcUTKdyf0mBmGi0NtItlAnoJ0tHdHpFcJTMBRvkI3EJS63ADkDFhzXjo9OtqtV4jV7HqX5w2cDG_4bVYnKccqsaG_vH131hwUMt0Jn8BNI4YdRiGFGWGtfjBuFk96qiCxKmzYC8KhXnv7P6I4SHzsLq-ROz1MfFNGmMWUyvmZTFMZd0IguMWsKw1JKAuoNbHV5DBMD1PX3bYUWVNCwURML',
    type: 'Google Meet',
    statusText: 'Oct 28',
    matchScore: 91,
    focusAreas: 'Scalable Fintech System Components & SDKs',
    salaryMinMax: '$160k - $210k',
    cultureDescription: 'Extremely rigorous writing and rigorous systems engineering culture. Design and development are blurred—engineers are expected to write production CSS and design specs.',
    recentNews: [
      'Expanded Stripe Billing support globally',
      'Released updated Web Elements component styling standard'
    ],
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAryIuGNoQnjvOKNvbDSnZrfUeAF5Y1es3FQK3_wRhny1FXvUmLxVjQo5H2AvKKb7_loRA2NmrgHIZElsk56_0pJa4BLg9plSxyG7ay3Cc16hHBxgSi_G4SGy-AC5ViLF3ZOqhprxYy0aLJG3DMLeEdKJXFMwu5yoRTAag5OTdqMu-XWMo5KqZUSobCUF3SW-wGr-x3ysyUCXC9us3sN3RRPEHXJTitj-oDKKaAOKMzOaJ71lNf4PRil5or2D4IA7aBxfPdEjdL7LmU',
    questions: [
      {
        id: 'sq1',
        question: '1. How do you design APIs that developers trust and find highly interactive?',
        answer: 'Speak about complete, fully copyable quickstart snippets, robust error codes, and strict semantic element state mappings.'
      }
    ],
    checklist: [
      { id: 'sch1', text: 'Analyze Stripe Web Elements codebase API', checked: false }
    ]
  },
  {
    id: 'i3',
    company: 'Figma',
    title: 'UI Designer',
    dateText: 'Nov 02, Zoom video',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVXvg_5hLxZLEiRw7mBUMe23yZzgQFokqb7csTB6Hfs51eqccdC2YOGONDjzHy4trWjBRedlCxl7qSOzGrPNdzZPN3paHBqFvGRaXDxtP0YvwrQISC5qE12HKeMmmE1RKoYXghnb1kdNWe5p11g4klAQxK8HEqeNFC0JVvKJrQvntZdZ3RVL-3jxsrsNOAbZWMyrgnDbg-2KpjXwPLGVYHitVDDwGwX5bFmXleGajZR_1Dwp_Sb45MBcnnMjbY-iJrltRwD98lS80R',
    type: 'Zoom Video',
    statusText: 'Nov 02',
    matchScore: 89,
    salaryMinMax: '$135k - $175k',
    focusAreas: 'Design Tools Canvas Layout & Collaborative Prototyping',
    cultureDescription: 'Highly collaborative, playful, creative, and craft-driven organization working on productivity tools.',
    recentNews: [
      'Released expanded Variable modes support',
      'Config Conference announced major layout updates'
    ],
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAryIuGNoQnjvOKNvbDSnZrfUeAF5Y1es3FQK3_wRhny1FXvUmLxVjQo5H2AvKKb7_loRA2NmrgHIZElsk56_0pJa4BLg9plSxyG7ay3Cc16hHBxgSi_G4SGy-AC5ViLF3ZOqhprxYy0aLJG3DMLeEdKJXFMwu5yoRTAag5OTdqMu-XWMo5KqZUSobCUF3SW-wGr-x3ysyUCXC9us3sN3RRPEHXJTitj-oDKKaAOKMzOaJ71lNf4PRil5or2D4IA7aBxfPdEjdL7LmU',
    questions: [
      {
        id: 'fq1',
        question: '1. What are your suggestions for improving real-time multi-player comments overlays?',
        answer: 'Contrast static comment nodes with contextual, cursor-associated tooltips that fade out when active work focuses on the relevant vector layers.'
      }
    ],
    checklist: [
      { id: 'fch1', text: 'Review Config video tutorials on UI variables', checked: true }
    ]
  }
];

export const INITIAL_PREFERENCES: UserPreferences = {
  targetRoles: 'Senior Product Designer',
  targetLocations: 'Remote, Berlin, London',
  minSalary: '120,000',
  language: 'English',
  blockedCompanies: ['Amazon', 'Meta'],
  excludedKeywords: ['Junior', 'Intern', 'Crypto'],
  emailReport: true,
  pushNotifications: false,
  deliveryTime: '08:00 AM (EST)',
  theme: 'dark',
  masterResumeName: 'Alex_Chen_Master_2024.pdf',
  masterResumeUpdated: 'Updated 2 days ago'
};

export const INITIAL_ACTIVITY: ActivityLog[] = [
  {
    id: 'act1',
    action: 'Auto-Application Sent',
    target: 'Figma • Lead Designer',
    status: 'SUCCESS',
    timeText: '2h ago'
  },
  {
    id: 'act2',
    action: 'Referral Requested',
    target: 'Google • UX Architect',
    status: 'PENDING',
    timeText: '5h ago'
  },
  {
    id: 'act3',
    action: 'Scanned Job Boards',
    target: 'All Channels (12 Boards)',
    status: 'COMPLETED',
    timeText: '8h ago'
  }
];
