resource "doppler_project" "this" {
  name = var.doppler_project
}

resource "doppler_environment" "prd" {
  project = doppler_project.this.name
  slug = "prd"
  name = "Production"
}

resource "doppler_config" "prd" {
  project = doppler_project.this.name
  environment = doppler_environment.prd.slug
  name = "prd"
}
