import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { StoryGrid } from "@/components/stories/story-grid";
import { getStories } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Archivio storie",
};

export const revalidate = 60;

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="pb-32 pt-36 md:pt-44">
      <PageHeader
        eyebrowKey="stories"
        countLabel={`${stories.length.toString().padStart(3, "0")} docs`}
      />
      <div className="mx-auto max-w-7xl px-6">
        <StoryGrid stories={stories} />
      </div>
    </div>
  );
}
