"use client";

import { JsonEditorPanel } from "./json-editor-panel";
import { upsertEvent, deleteEvent } from "@/lib/admin/actions";

export function EventEditorClient({
  initial,
  id,
}: {
  initial: Record<string, unknown>;
  id?: string;
}) {
  return (
    <JsonEditorPanel
      title="Event payload"
      hint="Edit JSON. Lat/Lng go to the SVG map. Status: planned | live | archived | classified."
      initial={initial}
      id={id}
      onSave={(data, recordId) => upsertEvent(data, recordId)}
      onDelete={id ? (rid) => deleteEvent(rid) : undefined}
      redirectAfter="/admin/events"
    />
  );
}
