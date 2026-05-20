import type { TimelineEntryRow } from "@/lib/supabase/types";

export const TIMELINE_SEED: TimelineEntryRow[] = [
  {
    id: "44444444-4444-4444-4444-444444444401",
    occurred_at: "2021-09-13",
    era: "origini",
    title_it: "Formazione del collettivo",
    title_en: "Formation of the collective",
    description_it:
      "Sette soggetti, prima volta nello stesso edificio. Le coordinate iniziali del protocollo AURA vengono tracciate.",
    description_en:
      "Seven subjects, first time in the same building. Initial AURA protocol coordinates are mapped.",
    icon: "spark",
    importance: 5,
    related_event_id: null,
    related_story_id: null,
    created_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444402",
    occurred_at: "2022-06-20",
    era: "origini",
    title_it: "Primo perimetro estivo",
    title_en: "First summer perimeter",
    description_it:
      "Le operazioni si espandono fuori dal quadrante scolastico. Lungolago confermato come zona neutrale.",
    description_en:
      "Operations expand beyond the school quadrant. Lungolago confirmed as a neutral zone.",
    icon: "compass",
    importance: 3,
    related_event_id: null,
    related_story_id: null,
    created_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444403",
    occurred_at: "2023-04-29",
    era: "ascesa",
    title_it: "Codifica del protocollo AURA",
    title_en: "Codification of the AURA protocol",
    description_it:
      "I parametri operativi vengono formalizzati. L'indice AURA diventa metrica standard del collettivo.",
    description_en:
      "Operational parameters get formalized. AURA index becomes the collective's standard metric.",
    icon: "shield",
    importance: 5,
    related_event_id: null,
    related_story_id: null,
    created_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444404",
    occurred_at: "2024-06-08",
    era: "ascesa",
    title_it: "La prima serata leggendaria",
    title_en: "The first legendary night",
    description_it:
      "Evento documentato in modo frammentario. Considerato spartiacque nella storia operativa del collettivo.",
    description_en:
      "Event documented in fragments. Considered a watershed in the collective's operational history.",
    icon: "flame",
    importance: 5,
    related_event_id: null,
    related_story_id: "33333333-3333-3333-3333-333333333301",
    created_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444405",
    occurred_at: "2025-07-04",
    era: "eta-d-oro",
    title_it: "Spedizione Sivigliana",
    title_en: "Sevilla Expedition",
    description_it:
      "Prima operazione transfrontaliera completa. Punto di svolta documentato.",
    description_en:
      "First complete cross-border operation. Documented turning point.",
    icon: "plane",
    importance: 4,
    related_event_id: "22222222-2222-2222-2222-222222222202",
    related_story_id: null,
    created_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444406",
    occurred_at: "2025-08-15",
    era: "eta-d-oro",
    title_it: "L'Incidente del Garda",
    title_en: "The Lago di Garda Incident",
    description_it:
      "Evento ad alta densità di caos. Classificato. Documentazione contestata.",
    description_en:
      "High chaos-density event. Classified. Documentation disputed.",
    icon: "alert",
    importance: 4,
    related_event_id: "22222222-2222-2222-2222-222222222203",
    related_story_id: null,
    created_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444407",
    occurred_at: "2025-09-12",
    era: "eta-d-oro",
    title_it: "Operazione Trastevere",
    title_en: "Operation Trastevere",
    description_it:
      "Missione di ricognizione urbana nella capitale. Tutti i sette soggetti confermati.",
    description_en:
      "Urban recon mission in the capital. All seven subjects confirmed.",
    icon: "target",
    importance: 4,
    related_event_id: "22222222-2222-2222-2222-222222222201",
    related_story_id: null,
    created_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444408",
    occurred_at: "2026-05-20",
    era: "oggi",
    title_it: "Vertice di Piazza Sordello",
    title_en: "Sordello Summit",
    description_it:
      "Riunione operativa nella sede ufficiosa del collettivo. Pianificazione del prossimo trimestre.",
    description_en:
      "Operational meeting in the collective's unofficial HQ. Planning for the next quarter.",
    icon: "compass",
    importance: 3,
    related_event_id: "22222222-2222-2222-2222-222222222205",
    related_story_id: null,
    created_at: "2026-05-01T00:00:00.000Z",
  },
];

export const ERAS = ["origini", "ascesa", "eta-d-oro", "oggi"] as const;
export type Era = (typeof ERAS)[number];
