import { readFile } from "fs/promises"
import { makeClient, isEnv } from "./hubspot/client"
import { pagesDumpFile } from "./utils/const"
import { BatchInputPage, Page } from "@hubspot/api-client/lib/codegen/cms/pages"
import { getPage } from "./hubspot/getPage"
import { getPageBySlug } from "./hubspot/getPageBySlug"


try {
  const env = process.argv[2]
  if (!isEnv(env)) {
    console.error("Positional argument required: env")
    process.exit(1)
  }
  const client = await makeClient(env)

  console.log(`Reading pages from ${pagesDumpFile}`)
  const data = await readFile(pagesDumpFile, { encoding: 'utf8' })
  const pages = ((await JSON.parse(data)) as Page[])

  const toUpdate = []
  const toCreate = []

  for (const page of pages) {
    page.archivedAt = null
    page.publishDate = new Date(page.publishDate)
  }

  console.log(`Uploading pages to HubSpot env: ${env}`)
  const res = await client.cms.pages.sitePagesApi.createBatch({ inputs: pages })
  console.log(res)
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(e);
  }
  process.exit(1)
}

