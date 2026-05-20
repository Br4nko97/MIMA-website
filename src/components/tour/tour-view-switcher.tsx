"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDictionary } from "@/lib/i18n/use-locale";
import { TourTimeline } from "./tour-timeline";
import { TourMap } from "./tour-map";
import { List, Map as MapIcon } from "lucide-react";
import type { EventRow } from "@/lib/supabase/types";

export function TourViewSwitcher({ events }: { events: EventRow[] }) {
  const { dict } = useDictionary();

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="mb-10">
        <TabsTrigger value="list">
          <List className="mr-1.5 h-3 w-3" />
          {dict.tour.toggleList}
        </TabsTrigger>
        <TabsTrigger value="map">
          <MapIcon className="mr-1.5 h-3 w-3" />
          {dict.tour.toggleMap}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <TourTimeline events={events} />
      </TabsContent>
      <TabsContent value="map">
        <TourMap events={events} />
      </TabsContent>
    </Tabs>
  );
}

// Map icon alias
