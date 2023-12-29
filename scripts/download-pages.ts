import { Client } from "@hubspot/api-client"
import DopplerSDK from '@dopplerhq/node-sdk'
import { Page } from "@hubspot/api-client/lib/codegen/cms/pages";
import { writeFile } from 'fs/promises'

const dpl = {
  project: "turkish-is-cool"
}

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

let page: Page;

try {
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
  page = downRes.results[0];
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(e);
  }
  process.exit(1)
}

try {
  const json = JSON.stringify(page);
  await writeFile("pages.json", json)
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
