import { writeFile } from 'fs/promises'
import { pagesDumpFile } from './utils/const'
import { makeClient, isEnv } from "./utils/hubspotClient.ts";

try {
  const env = process.argv[2]
  if (!isEnv(env)) {
    console.error("Positional argument required: env")
    process.exit(1)
  }
  const client = await makeClient(env)

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
