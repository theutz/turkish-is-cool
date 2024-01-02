import { Client } from "@hubspot/api-client";
import { Page } from "@hubspot/api-client/lib/codegen/cms/pages";

type Params = {
  createdAt?: Date
  createdAfter?: Date
  createdBefore?: Date
  updatedAt?: Date
  updatedAfter?: Date
  updatedBefore?: Date
  sort?: string[]
  after?: string
  limit?: number
  archived?: boolean
  property?: string
}

export async function getPage(client: Client, params: Params = {}): Promise<Page[]> {
  const {
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
  } = params;

  const res = await client.cms.pages.sitePagesApi.getPage(
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
  )

  return res.results
}
