import { Client } from "@hubspot/api-client"
import { getSecret } from "./doppler";

export async function makeClient(dopplerEnv: "dev" | "prd"): Promise<Client> {
  const accessToken = await getSecret(dopplerEnv, "HUBSPOT_PRIVATE_APP_TOKEN")

  if (!accessToken) {
    console.error(`HubSpot access token not found for env: ${dopplerEnv}.`)
    process.exit(1)
  }

  const client = new Client({ accessToken });
  return client
}
