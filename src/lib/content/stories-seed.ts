import type { StoryRow } from "@/lib/supabase/types";

export const STORIES_SEED: StoryRow[] = [
  {
    id: "33333333-3333-3333-3333-333333333301",
    slug: "la-prima-serata-leggendaria",
    title_it: "La prima serata leggendaria",
    title_en: "The first legendary night",
    body_it:
      "I dettagli di questa serata sono in parte offuscati. Quel che resta è una sequenza fotografica frammentata e una serie di citazioni che ancora oggi vengono ripetute nei verbali interni. Il giorno dopo, nessuno ricorda con esattezza chi avesse il volante alle 04:12.",
    body_en:
      "The details of this night are partially redacted. What remains is a fragmented photo sequence and a set of quotes still recited in internal records. The next day, nobody remembers precisely who was at the wheel at 04:12.",
    occurred_at: "2024-06-08",
    cover_url: "/placeholders/stories/story1.svg",
    media: [
      { type: "image", url: "/placeholders/stories/story1.svg", caption: "Frame 03:42" },
    ],
    participants: [
      "11111111-1111-1111-1111-111111111101",
      "11111111-1111-1111-1111-111111111103",
      "11111111-1111-1111-1111-111111111105",
    ],
    tags: ["serata", "fondativa", "iconic"],
    classification: "restricted",
    is_published: true,
    created_at: "2024-06-09T00:00:00.000Z",
    updated_at: "2024-06-09T00:00:00.000Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333302",
    slug: "il-pomeriggio-non-identificato",
    title_it: "Il pomeriggio non identificato",
    title_en: "The unidentified afternoon",
    body_it:
      "Tra le 14:00 e le 18:30 di un giovedì di marzo, sette soggetti risultano simultaneamente non rintracciabili nei rispettivi avamposti scolastici. Le testimonianze raccolte sono incoerenti tra loro.",
    body_en:
      "Between 14:00 and 18:30 of a Thursday in March, seven subjects are simultaneously untrackable at their respective school outposts. Witness statements gathered are mutually inconsistent.",
    occurred_at: "2025-03-13",
    cover_url: "/placeholders/stories/story2.svg",
    media: null,
    participants: [
      "11111111-1111-1111-1111-111111111101",
      "11111111-1111-1111-1111-111111111102",
      "11111111-1111-1111-1111-111111111104",
      "11111111-1111-1111-1111-111111111106",
    ],
    tags: ["sparizione", "scuola"],
    classification: "public",
    is_published: true,
    created_at: "2025-03-14T00:00:00.000Z",
    updated_at: "2025-03-14T00:00:00.000Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333303",
    slug: "la-sentenza-del-maestro",
    title_it: "La sentenza del Maestro",
    title_en: "The Maestro's ruling",
    body_it:
      "Durante un vertice ordinario, Il Maestro pronuncia una sentenza che entra immediatamente nei registri orali del collettivo. Il contenuto esatto è tramandato in forma riservata. [TBD]",
    body_en:
      "During a routine summit, Il Maestro issues a ruling that immediately enters the collective's oral records. Exact contents are kept in restricted form. [TBD]",
    occurred_at: "2025-11-04",
    cover_url: "/placeholders/stories/story3.svg",
    media: null,
    participants: ["11111111-1111-1111-1111-111111111107"],
    tags: ["maestro", "doctrina", "iconic"],
    classification: "classified",
    is_published: true,
    created_at: "2025-11-05T00:00:00.000Z",
    updated_at: "2025-11-05T00:00:00.000Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333304",
    slug: "il-ritorno-dal-d-este",
    title_it: "Il ritorno dall'avamposto D'Este",
    title_en: "Return from the D'Este outpost",
    body_it:
      "Tommy rientra al perimetro principale con informazioni di rilievo strategico. Le sue rivelazioni hanno alterato la pianificazione del trimestre successivo.",
    body_en:
      "Tommy returns to the main perimeter with strategically relevant intel. His revelations altered the next quarter's planning.",
    occurred_at: "2025-10-21",
    cover_url: "/placeholders/stories/story4.svg",
    media: null,
    participants: [
      "11111111-1111-1111-1111-111111111101",
      "11111111-1111-1111-1111-111111111106",
    ],
    tags: ["intel", "d'este", "ponte"],
    classification: "public",
    is_published: true,
    created_at: "2025-10-22T00:00:00.000Z",
    updated_at: "2025-10-22T00:00:00.000Z",
  },
];
