import { Client } from "@hubspot/api-client"
import { getSecret } from "./doppler";

type env = "dev" | "prd";

export function isEnv(env: string): env is env {
  switch (env) {
    case "dev":
    case "prd":
      return true;
    default:
      return false;
  }
}

export async function makeClient(dopplerEnv: "dev" | "prd"): Promise<Client> {
  const accessToken = await getSecret(dopplerEnv, "HUBSPOT_PRIVATE_APP_TOKEN")

  if (!accessToken) {
    throw new Error(`HubSpot access token not found for env: ${dopplerEnv}.`);
  }

  const client = new Client({ accessToken });
  return client
}
