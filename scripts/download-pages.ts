import { Client } from "@hubspot/api-client"
import DopplerSDK from '@dopplerhq/node-sdk'
import { Page } from "@hubspot/api-client/lib/codegen/cms/pages";
import { writeFile } from 'fs/promises'
import { dpl, pagesDumpFile } from './utils/const'

const doppler = new DopplerSDK({ accessToken: process.env.DOPPLER_TOKEN });
const devAccessToken = (await doppler.secrets.get(dpl.project, "dev", "HUBSPOT_PRIVATE_APP_TOKEN")).value.computed;
// const prdAccessToken = (await doppler.secrets.get(dpl.project, "prd", "HUBSPOT_PRIVATE_APP_TOKEN")).value.computed;

const devClient = new Client({ accessToken: devAccessToken });
// const prdClient = new Client({ accessToken: prdAccessToken });

const createdAt = undefined;
const createdAfter = undefined;
const createdBefore = undefined;
const updatedAt = undefined;
const updatedAfter = undefined;
const updatedBefore = undefined;
const sort = undefined;
const after = undefined;
const limit = undefined;
const archived = undefined;
const property = undefined;

let pages: Array<Page>;

try {
  let msg = "Downloading pages from HubSpot..."
  console.log(msg)

  const downRes = await devClient.cms.pages.sitePagesApi.getPage(
    createdAt,
    createdAfter,
    createdBefore,
    updatedAt,
    updatedAfter,
    updatedBefore,
    sort,
    after,
    limit,
    archived,
    property
  );

  console.log(`${msg}DONE`)
  console.log(`Total pages downloaded: ${downRes.total}`)

  pages = downRes.results;
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
