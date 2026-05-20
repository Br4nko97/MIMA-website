import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { TimelineVertical } from "@/components/timeline/timeline-vertical";
import { getTimeline } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Cronologia del collettivo",
};

export const revalidate = 60;

export default async function TimelinePage() {
  const entries = await getTimeline();

  return (
    <div className="pb-32 pt-36 md:pt-44">
      <PageHeader
        eyebrowKey="timeline"
        countLabel={`${entries.length.toString().padStart(2, "0")} events`}
      />
      <div className="mx-auto max-w-5xl px-6">
        <TimelineVertical entries={entries} />
      </div>
    </div>
  );
}
