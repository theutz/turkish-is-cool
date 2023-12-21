import { Client } from "@hubspot/api-client"
import DopplerSDK from '@dopplerhq/node-sdk'

const dpl = {
  project: "turkish-is-cool"
}

const doppler = new DopplerSDK({ accessToken: process.env.DOPPLER_TOKEN });
const accessToken = (await doppler.secrets.get(dpl.project, "dev", "HUBSPOT_PRIVATE_APP_TOKEN")).value.computed;

const hubspotClient = new Client({ accessToken });

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

try {
  const apiResponse = await hubspotClient.cms.pages.sitePagesApi.getPage(
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
  console.log(JSON.stringify(apiResponse, null, 2));
} catch (e: any) {
  e.message === 'HTTP request failed'
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e)
}

export { }
