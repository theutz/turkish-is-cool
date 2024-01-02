import { writeFile } from 'fs/promises'
import { pagesDumpFile } from './utils/const'
import { makeClient } from "./utils/hubspotClient.ts";

try {
  const client = await makeClient("dev")

  console.log("Downloading pages from HubSpot...")
  const res = await client.cms.pages.sitePagesApi.getPage();
  console.log(`Total pages downloaded: ${res.total}`)

  console.log(`Writing results to ${pagesDumpFile}`)
  await writeFile(pagesDumpFile, JSON.stringify(res.results))
  console.log("DONE")
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(e);
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
