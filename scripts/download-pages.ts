import { writeFile } from 'fs/promises'
import { pagesDumpFile } from './utils/const'
import { makeClient, isEnv } from "./utils/hubspotClient.ts";
import { getPage } from './utils/getPage.ts';

try {
  const env = process.argv[2]
  if (!isEnv(env)) {
    console.error("Positional argument required: env")
    process.exit(1)
  }
  const client = await makeClient(env)

  console.log(`Downloading pages from HubSpot env: ${env}...`)
  const res = await getPage(client)

  console.log(`Writing results to ${pagesDumpFile}`)
  await writeFile(pagesDumpFile, JSON.stringify(res))
  console.log("DONE")
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(e);
  }
  process.exit(1)
}

export { }
