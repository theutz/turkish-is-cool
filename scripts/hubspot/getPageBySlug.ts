import { Client } from "@hubspot/api-client";
import { Page } from "@hubspot/api-client/lib/codegen/cms/pages";

export async function getPageBySlug(client: Client, slug: string): Promise<Page | null> {
  const res = await client.apiRequest({
    method: 'GET',
    path: '/cms/v3/pages/site-pages',
    qs: {
      "slug__is": slug
    }
  })
  const json = await res.json()
  if (json.total < 1) {
    return null
  }
  if (json.total > 1) {
    throw new Error(`More than one page with slug ${slug} found`)
  }
  return json.results[0] as Page
}
