-- =============================================================
-- MIMA · seed.sql
-- Seed members, stats, events, stories, timeline. Idempotent (uses upsert).
-- Run AFTER migrations have been applied.
-- =============================================================

-- --------- members
insert into public.members
  (id, slug, full_name, nickname, role_title, school, classification,
   avatar_url, cover_url, bio_it, bio_en, favorite_phrases, achievements,
   badges, display_order, is_active)
values
  ('11111111-1111-1111-1111-111111111101', 'branko', 'Riccardo Brancolini', 'Branko',
   'Founding Operator', 'Fermi', 'LEGEND',
   '/placeholders/members/branko.svg', '/placeholders/members/branko-cover.svg',
   'Soggetto di interesse primario. Frequenza operativa elevata, presenza riconosciuta in oltre il 92% delle apparizioni documentate.',
   'Primary subject of interest. High operational frequency, confirmed presence in 92%+ of documented sightings.',
   '["[TBD — frase iconica n.1]","[TBD — frase iconica n.2]"]'::jsonb,
   '["Fondatore del collettivo (2021)","Cofirma del protocollo AURA","[TBD]"]'::jsonb,
   array['fondatore','operatore','icona'], 1, true),

  ('11111111-1111-1111-1111-111111111102', 'glingo', 'Simone Glingani', 'Glingo',
   'Tactical Anchor', 'Fermi', 'DOCUMENTED',
   '/placeholders/members/glingo.svg', '/placeholders/members/glingo-cover.svg',
   'Stabilizzatore strategico del collettivo. Quando la serata vacilla, è la sua voce che riallinea le coordinate.',
   'Tactical anchor of the collective. When the night wobbles, his voice realigns the coordinates.',
   '["[TBD]","[TBD]"]'::jsonb,
   '["Stabilizzatore in 3 operazioni ad alto rischio","[TBD]"]'::jsonb,
   array['negoziatore','ancora','voce della ragione'], 2, true),

  ('11111111-1111-1111-1111-111111111103', 'moncio', 'Simone Monici', 'Moncio',
   'Chaos Vector', 'Fermi', 'UNSTABLE',
   '/placeholders/members/moncio.svg', '/placeholders/members/moncio-cover.svg',
   'Variabile imprevista in qualsiasi equazione. Catalizzatore di almeno quattro eventi non pianificati.',
   'Unpredictable variable in any equation. Catalyst of at least four unplanned events.',
   '["[TBD]","[TBD]"]'::jsonb,
   '["Catalizzatore di 4 incidenti storici","[TBD]"]'::jsonb,
   array['vettore del caos','imprevedibile','agente libero'], 3, true),

  ('11111111-1111-1111-1111-111111111104', 'fillo', 'Filippo Guerzoni', 'Fillo',
   'Silent Architect', 'Fermi', 'CLASSIFIED',
   '/placeholders/members/fillo.svg', '/placeholders/members/fillo-cover.svg',
   'Pianificatore d''ombra. Le sue mosse non vengono percepite finché non sono già concluse.',
   'Shadow planner. His moves go unnoticed until they''re already done.',
   '["[TBD]","[TBD]"]'::jsonb,
   '["Architetto di 6 operazioni notturne","Sparizione tattica record (4h)","[TBD]"]'::jsonb,
   array['pianificatore','fantasma tattico'], 4, true),

  ('11111111-1111-1111-1111-111111111105', 'sgurlotto', 'Giulio Morelli', 'Sgurlotto',
   'Frequency Carrier', 'Fermi', 'LEGEND',
   '/placeholders/members/sgurlotto.svg', '/placeholders/members/sgurlotto-cover.svg',
   'Vettore di energia collettiva. La sua sola presenza eleva l''indice AURA del gruppo.',
   'Carrier of collective energy. His mere presence boosts the group''s AURA index.',
   '["[TBD]","[TBD]"]'::jsonb,
   '["Indice AURA personale: 97","[TBD]"]'::jsonb,
   array['alta frequenza','aura carrier','leggenda'], 5, true),

  ('11111111-1111-1111-1111-111111111106', 'tommy', 'Tommaso Antoniazzi', 'Tommy',
   'External Outpost', 'D''Este', 'RESTRICTED',
   '/placeholders/members/tommy.svg', '/placeholders/members/tommy-cover.svg',
   'Avamposto esterno — unico membro operativo dal Liceo D''Este.',
   'External outpost — the only operator based at Liceo D''Este.',
   '["[TBD]","[TBD]"]'::jsonb,
   '["Avamposto D''Este (2021–presente)","[TBD]"]'::jsonb,
   array['avamposto','ponte tattico'], 6, true),

  ('11111111-1111-1111-1111-111111111107', 'il-maestro', 'Alessandro Turetta', 'Il Maestro',
   'Doctrinal Authority', 'Fermi', 'LEGEND',
   '/placeholders/members/maestro.svg', '/placeholders/members/maestro-cover.svg',
   'Figura dottrinaria del collettivo. Le sue sentenze sono raccolte in registri non ufficiali.',
   'Doctrinal figure of the collective. His rulings are recorded in unofficial logs.',
   '["[TBD]","[TBD]"]'::jsonb,
   '["Aura record: 99/100","Sentenze raccolte (oltre 40)","[TBD]"]'::jsonb,
   array['maestro','autorità','aura massima'], 7, true)

on conflict (id) do update set
  full_name = excluded.full_name,
  nickname = excluded.nickname,
  role_title = excluded.role_title,
  school = excluded.school,
  classification = excluded.classification,
  bio_it = excluded.bio_it,
  bio_en = excluded.bio_en,
  badges = excluded.badges,
  display_order = excluded.display_order,
  updated_at = now();

-- --------- member_stats
insert into public.member_stats (member_id, aura, danger, alcohol_resistance, disappearing_probability, chaos_generation, gym_addiction, emotional_stability, survivability, negotiation, spontaneous_disappearance_rate) values
  ('11111111-1111-1111-1111-111111111101', 94, 78, 82, 28, 71, 64, 70, 88, 81, 19),
  ('11111111-1111-1111-1111-111111111102', 86, 54, 68, 14, 41, 58, 89, 92, 96, 9),
  ('11111111-1111-1111-1111-111111111103', 91, 89, 72, 76, 97, 49, 38, 71, 44, 81),
  ('11111111-1111-1111-1111-111111111104', 88, 70, 65, 84, 52, 71, 81, 86, 73, 78),
  ('11111111-1111-1111-1111-111111111105', 97, 67, 79, 33, 78, 55, 72, 84, 68, 27),
  ('11111111-1111-1111-1111-111111111106', 83, 61, 70, 31, 64, 60, 75, 80, 78, 25),
  ('11111111-1111-1111-1111-111111111107', 99, 76, 74, 22, 81, 88, 84, 91, 87, 15)
on conflict (member_id) do update set
  aura = excluded.aura,
  danger = excluded.danger,
  chaos_generation = excluded.chaos_generation,
  emotional_stability = excluded.emotional_stability,
  survivability = excluded.survivability,
  negotiation = excluded.negotiation;

-- --------- events (a few; the rest can be edited from admin)
insert into public.events (id, slug, codename, title_it, title_en, description_it, description_en, location, lat, lng, starts_at, ends_at, status, cover_url, tags) values
  ('22222222-2222-2222-2222-222222222201','operation-trastevere','OPERATION TRASTEVERE','Operazione Trastevere','Operation Trastevere',
   'Missione di ricognizione urbana nella capitale. Tutti i sette soggetti confermati sul perimetro.',
   'Urban recon mission in the capital. All seven subjects confirmed on the perimeter.',
   'Roma, IT', 41.8898, 12.4683, '2025-09-12 19:00:00+00', '2025-09-15 03:30:00+00', 'archived',
   '/placeholders/events/event1.svg', array['expedition','iconic','urban']),

  ('22222222-2222-2222-2222-222222222202','sevilla-expedition-2025','SEVILLA EXPEDITION','Spedizione Sivigliana','Sevilla Expedition',
   'Operazione transnazionale. Coordinate confermate, partecipazione completa.',
   'Cross-border operation. Coordinates confirmed, full attendance.',
   'Sevilla, ES', 37.3886, -5.9823, '2025-07-04 12:00:00+00', '2025-07-09 22:00:00+00', 'archived',
   '/placeholders/events/event2.svg', array['expedition','vacation','international']),

  ('22222222-2222-2222-2222-222222222205','piazza-sordello-summit','SORDELLO SUMMIT','Vertice di Piazza Sordello','Sordello Summit',
   'Riunione operativa nella sede ufficiosa del collettivo.',
   'Operational meeting in the collective''s unofficial HQ.',
   'Mantova, IT — Piazza Sordello', 45.1606, 10.7917, '2026-05-20 21:00:00+00', '2026-05-21 01:30:00+00', 'live',
   '/placeholders/events/event5.svg', array['summit','mantua','iconic'])
on conflict (id) do nothing;

-- --------- stories
insert into public.stories (id, slug, title_it, title_en, body_it, body_en, occurred_at, classification, is_published, tags) values
  ('33333333-3333-3333-3333-333333333301','la-prima-serata-leggendaria','La prima serata leggendaria','The first legendary night',
   'I dettagli di questa serata sono in parte offuscati. Quel che resta è una sequenza fotografica frammentata.',
   'The details of this night are partially redacted. What remains is a fragmented photo sequence.',
   '2024-06-08', 'restricted', true, array['serata','fondativa','iconic']),

  ('33333333-3333-3333-3333-333333333303','la-sentenza-del-maestro','La sentenza del Maestro','The Maestro''s ruling',
   'Durante un vertice ordinario, Il Maestro pronuncia una sentenza che entra immediatamente nei registri orali.',
   'During a routine summit, Il Maestro issues a ruling that immediately enters the oral records.',
   '2025-11-04', 'classified', true, array['maestro','doctrina','iconic'])
on conflict (id) do nothing;

-- --------- timeline_entries
insert into public.timeline_entries (id, occurred_at, era, title_it, title_en, description_it, description_en, importance) values
  ('44444444-4444-4444-4444-444444444401', '2021-09-13', 'origini', 'Formazione del collettivo', 'Formation of the collective',
   'Sette soggetti, prima volta nello stesso edificio.', 'Seven subjects, first time in the same building.', 5),
  ('44444444-4444-4444-4444-444444444403', '2023-04-29', 'ascesa', 'Codifica del protocollo AURA', 'Codification of the AURA protocol',
   'I parametri operativi vengono formalizzati.', 'Operational parameters get formalized.', 5),
  ('44444444-4444-4444-4444-444444444404', '2024-06-08', 'ascesa', 'La prima serata leggendaria', 'The first legendary night',
   'Evento documentato in modo frammentario.', 'Event documented in fragments.', 5),
  ('44444444-4444-4444-4444-444444444407', '2025-09-12', 'eta-d-oro', 'Operazione Trastevere', 'Operation Trastevere',
   'Missione di ricognizione urbana nella capitale.', 'Urban recon mission in the capital.', 4),
  ('44444444-4444-4444-4444-444444444408', '2026-05-20', 'oggi', 'Vertice di Piazza Sordello', 'Sordello Summit',
   'Riunione operativa nella sede ufficiosa del collettivo.', 'Operational meeting in the collective''s unofficial HQ.', 3)
on conflict (id) do nothing;
