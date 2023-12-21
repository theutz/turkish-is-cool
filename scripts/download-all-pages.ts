import { Client } from "@hubspot/api-client"

const hubspotClient = new Client({ "accessToken": process.env.HUBSPOT_PRIVATE_APP_TOKEN });

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
