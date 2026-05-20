import type { it } from "./it";

export const en: typeof it = {
  meta: {
    siteName: "MIMA",
    tagline: "(we cookin')",
    description:
      "The realest archive from the 046. Documents, sightings, mythology.",
  },

  nav: {
    home: "Origin",
    members: "Subjects",
    tour: "Ops",
    stories: "Archive",
    media: "Files",
    timeline: "Timeline",
    admin: "Admin",
    enterArchive: "Enter the archive",
    audioOn: "Ambient audio: ON",
    audioOff: "Ambient audio: OFF",
    languageLabel: "Language",
  },

  landing: {
    classifiedBanner: [
      "RESTRICTED ARCHIVE",
      "CLEARANCE LEVEL 5",
      "DOCUMENT AUTHENTICITY DISPUTED",
      "LIMITED DISTRIBUTION",
      "REFER TO PROTOCOL: AURA",
    ],
    heroEyebrow: "Mantua · est. 2007",
    heroTitle: "MIMA",
    heroSubtitle: "the realest collective. straight up sigma operations.",
    heroTaglines: [
      "we document. we archive. we vanish.",
      "subjects of collective interest",
      "presence confirmed · status: active",
      "afternoons turn into legend, fr",
    ],
    scrollCue: "scroll to access",

    manifestEyebrow: "Founding manifest",
    manifestTitle:
      "Seven subjects. One frequency. Documented for posterity, no cap.",
    manifestBody:
      "This archive catalogs the activity of seven friends, all born 2007, operating out of Mantua province. Every sighting verified. Every night out classified. Every move tracked by the AURA protocol. The documents within are presented without commentary — readers form their own conclusions.",

    statsEyebrow: "Operational metrics",
    statsTitle: "Data pulled from the AURA protocol",
    stats: [
      { label: "Documented sightings", value: 1247, suffix: "+" },
      { label: "Collective aura index", value: 98.7, suffix: "%" },
      { label: "Ops since 2024", value: 42, suffix: "" },
      { label: "Confirmed locations", value: 18, suffix: "" },
    ],

    membersEyebrow: "Subjects of the collective",
    membersTitle: "Meet the founders",
    membersCta: "Open all dossiers",

    recentOpsEyebrow: "Recent operations",
    recentOpsTitle: "Latest activity on record",
    recentOpsCta: "View full tour",

    enterTitle: "The archive is unlocked.",
    enterSubtitle:
      "Sections protected by the AURA protocol. Tread lightly, fam.",
    enterCta: "Open the full archive",
  },

  members: {
    pageTitle: "Documented subjects",
    pageEyebrow: "Archive · subjects",
    pageDescription:
      "Individual dossier for every member of the MIMA collective. Data gathered by the AURA protocol since 2021.",
    statsTitle: "Operational profile",
    bioTitle: "Background",
    phrasesTitle: "Documented quotes",
    achievementsTitle: "Recognitions",
    relationshipsTitle: "Internal links",
    classificationLabel: "Classification",
    schoolLabel: "Outpost",
    statLabels: {
      aura: "Aura",
      danger: "Threat level",
      alcohol_resistance: "Alcohol resistance",
      disappearing_probability: "Vanish probability",
      chaos_generation: "Chaos output",
      gym_addiction: "Gym dependency",
      emotional_stability: "Emotional stability",
      survivability: "Post-night survivability",
      negotiation: "Negotiation skill",
      spontaneous_disappearance_rate: "Random ghosting rate",
    },
  },

  tour: {
    pageTitle: "Operations · World Tour",
    pageEyebrow: "Archive · operations",
    pageDescription:
      "Chronology of the collective's operations. Nights out, trips, gatherings, unidentified events.",
    toggleList: "List",
    toggleMap: "Map",
    statusLabels: {
      planned: "PLANNED",
      live: "LIVE",
      archived: "ARCHIVED",
      classified: "CLASSIFIED",
    },
    countdownLabel: "Starts in",
  },

  stories: {
    pageTitle: "Story archive",
    pageEyebrow: "Archive · narratives",
    pageDescription:
      "Stories documented by the protocol. Some details have been redacted for security reasons.",
    readMore: "Read full document",
    classificationPublic: "Public",
    classificationRestricted: "Restricted",
    classificationClassified: "Classified",
  },

  media: {
    pageTitle: "Media library",
    pageEyebrow: "Archive · files",
    pageDescription:
      "Photographs, video and audio gathered during the operations.",
    filterAll: "All",
    filterImages: "Photos",
    filterVideos: "Videos",
    filterAudio: "Audio",
  },

  timeline: {
    pageTitle: "Collective timeline",
    pageEyebrow: "Archive · timeline",
    pageDescription:
      "Key events in the formation and rise of the MIMA collective.",
    eras: {
      origini: "Origins",
      ascesa: "Rise",
      "eta-d-oro": "Golden age",
      oggi: "Today",
    },
  },

  admin: {
    loginTitle: "Admin access",
    loginSubtitle: "Authorized personnel only.",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    loginCta: "Enter",
    loginError: "Invalid password.",
    logoutCta: "Log out",
    sections: {
      dashboard: "Dashboard",
      members: "Subjects",
      stats: "Stats",
      events: "Operations",
      stories: "Stories",
      media: "Files",
      timeline: "Timeline",
      settings: "Settings",
    },
  },

  common: {
    loading: "Loading…",
    error: "Error. Try again.",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    upload: "Upload file",
    search: "Search",
    close: "Close",
    backHome: "Back home",
  },

  footer: {
    archiveLabel: "MIMA Archive",
    locationLabel: "Mantua, IT · 46100",
    establishedLabel: "Established 2021",
    disclaimer:
      "All content is presented for documentation purposes. Any resemblance to real persons is strictly intentional.",
    builtBy: "Built with excessive seriousness",
  },
};
