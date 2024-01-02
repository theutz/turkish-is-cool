import { Client } from "@hubspot/api-client"
import { getSecret } from "../utils/doppler.ts";

type Envs = "dev" | "prd";

export function isEnv(env: string): env is Envs {
  return ["dev", "prd"].includes(env)
}

export async function makeClient(dopplerEnv: Envs): Promise<Client> {
  const accessToken = await getSecret(dopplerEnv, "HUBSPOT_PRIVATE_APP_TOKEN")

  if (!accessToken) {
    throw new Error(`HubSpot access token not found for env: ${dopplerEnv}.`);
  }

  const client = new Client({ accessToken });
  return client
}
