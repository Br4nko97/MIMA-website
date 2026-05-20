"use client";

import { JsonEditorPanel } from "./json-editor-panel";
import { upsertTimelineEntry, deleteTimelineEntry } from "@/lib/admin/actions";

export function TimelineEditorClient({
  initial,
  id,
}: {
  initial: Record<string, unknown>;
  id?: string;
}) {
  return (
    <JsonEditorPanel
      title="Timeline entry"
      hint="era: origini | ascesa | eta-d-oro | oggi. importance: 1-5 (visual weight)."
      initial={initial}
      id={id}
      onSave={(data, recordId) => upsertTimelineEntry(data, recordId)}
      onDelete={id ? (rid) => deleteTimelineEntry(rid) : undefined}
      redirectAfter="/admin/timeline"
    />
  );
}
