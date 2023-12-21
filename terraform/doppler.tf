resource "doppler_project" "this" {
  name = "turkish-is-cool"
}

resource "doppler_environment" "prd" {
  project = doppler_project.this.name
  slug    = "prd"
  name    = "Production"
}

resource "doppler_config" "prd" {
  project     = doppler_project.this.name
  environment = doppler_environment.prd.slug
  name        = "prd"
}

data "doppler_secrets" "prd" {
  project = doppler_project.this.name
  config  = doppler_config.prd.name
}
