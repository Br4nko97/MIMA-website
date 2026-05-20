import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { MediaGrid } from "@/components/media/media-grid";
import { getMedia } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Libreria multimediale",
};

export const revalidate = 60;

export default async function MediaPage() {
  const media = await getMedia();

  return (
    <div className="pb-32 pt-36 md:pt-44">
      <PageHeader
        eyebrowKey="media"
        countLabel={`${media.length.toString().padStart(3, "0")} files`}
      />
      <div className="mx-auto max-w-7xl px-6">
        <MediaGrid media={media} />
      </div>
    </div>
  );
}
