import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { TourViewSwitcher } from "@/components/tour/tour-view-switcher";
import { getEvents } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Operazioni · World Tour",
};

export const revalidate = 60;

export default async function TourPage() {
  const events = await getEvents();

  return (
    <div className="pb-32 pt-36 md:pt-44">
      <PageHeader
        eyebrowKey="tour"
        countLabel={`${events.length.toString().padStart(2, "0")} ops`}
      />
      <div className="mx-auto max-w-7xl px-6">
        <TourViewSwitcher events={events} />
      </div>
    </div>
  );
}
