import { Page } from "@hubspot/api-client/lib/codegen/cms/pages";
import { writeFile } from 'fs/promises'
import { pagesDumpFile } from './utils/const'
import { makeClient as makeHubspotClient } from "./utils/hubspotClient.ts";

const devClient = await makeHubspotClient("dev")

let pages: Array<Page>;

try {
  let msg = "Downloading pages from HubSpot..."
  console.log(msg)

  const res = await devClient.cms.pages.sitePagesApi.getPage();

  console.log(`${msg}DONE`)
  console.log(`Total pages downloaded: ${res.total}`)

  pages = res.results;
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(e);
  }
  process.exit(1)
}

try {
  let msg = `Writing pages to ${pagesDumpFile}...`
  console.log(msg)

  const json = JSON.stringify(pages);
  await writeFile(pagesDumpFile, json)

  console.log(`${msg}DONE`)
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(e)
  }
  process.exit(1)
}

// page.archivedAt = null
//
// try {
//   const upRes = await prdClient.cms.pages.sitePagesApi.create(page)
// } catch (e: unknown) {
//   if (e instanceof Error) {
//     console.error(e.message)
//   } else {
//     console.error(e);
//   }
//   process.exit(1)
// }

export { }
