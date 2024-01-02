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

  const toUpdate: Page[] = []
  const toCreate: Page[] = []

  for (const page of pages) {
    // @ts-ignore the update/create endpoint doesn't expect this to exist, apparently
    page.archivedAt = null
    page.publishDate = new Date(page.publishDate)
    const existing = await getPageBySlug(client, page.slug)
    if (!!existing) {
      page.id = existing.id
      console.log(`"${page.slug}" exists. Updating.`)
      toUpdate.push(page)
    } else {
      console.log(`"${page.slug}" doesn't exist. Creating.`)
      toCreate.push(page)
    }
  }

  console.log(`Creating and updating pages in ${env}`)
  const create = client.cms.pages.sitePagesApi.createBatch({ inputs: toCreate })
  const update = client.cms.pages.sitePagesApi.updateBatch({ inputs: toUpdate })
  await Promise.all([create, update])
  console.log("DONE")
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(e);
  }
  process.exit(1)
}

