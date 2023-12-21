provider "doppler" {
  doppler_token = var.doppler_token
}

provider "github" {
  token = data.doppler_secrets.prd.map.GITHUB_TOKEN
}
