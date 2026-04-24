import { useQuery } from "@tanstack/react-query";
import type { SiteData } from "@/types/site";

async function fetchSiteData(): Promise<SiteData> {
  const res = await fetch("/data.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to load site data");
  return res.json();
}

export function useSiteData() {
  return useQuery({
    queryKey: ["site-data"],
    queryFn: fetchSiteData,
    staleTime: 1000 * 60 * 5,
  });
}
