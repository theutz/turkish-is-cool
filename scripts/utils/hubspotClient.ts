import { Client } from "@hubspot/api-client"
import { getSecret } from "./doppler";

export async function makeClient(dopplerEnv: "dev" | "prd"): Promise<Client> {
  const accessToken = await getSecret(dopplerEnv, "HUBSPOT_PRIVATE_APP_TOKEN")

  if (!accessToken) {
    throw new Error(`HubSpot access token not found for env: ${dopplerEnv}.`);
  }

  const client = new Client({ accessToken });
  return client
}
