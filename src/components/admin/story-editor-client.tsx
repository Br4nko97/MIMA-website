"use client";

import { JsonEditorPanel } from "./json-editor-panel";
import { upsertStory, deleteStory } from "@/lib/admin/actions";

export function StoryEditorClient({
  initial,
  id,
}: {
  initial: Record<string, unknown>;
  id?: string;
}) {
  return (
    <JsonEditorPanel
      title="Story payload"
      hint='media is an array: [{"type":"image"|"video"|"audio","url":"…","caption":"…"}]. classification: public | restricted | classified.'
      initial={initial}
      id={id}
      onSave={(data, recordId) => upsertStory(data, recordId)}
      onDelete={id ? (rid) => deleteStory(rid) : undefined}
      redirectAfter="/admin/stories"
    />
  );
}
