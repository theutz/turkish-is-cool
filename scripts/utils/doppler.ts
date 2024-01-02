import DopplerSDK from '@dopplerhq/node-sdk'

const settings = {
  project: "turkish-is-cool"
}

const doppler = new DopplerSDK({ accessToken: process.env.DOPPLER_TOKEN });

export async function getSecret(env: string = "dev", key: string): Promise<string | null> {
  return (await doppler.secrets.get(settings.project, env, key)).value?.computed ?? null
}
