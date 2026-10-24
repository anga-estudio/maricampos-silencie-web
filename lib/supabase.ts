import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: (url, options) =>
        fetch(url, { ...options, cache: "no-store" }),
    },
  }
);

export async function getSiteContent(site: string) {
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value")
    .eq("site", site);

  if (error) throw error;

  const content: Record<string, unknown> = {};
  for (const row of data) {
    content[row.key] = row.value;
  }
  return content;
}
