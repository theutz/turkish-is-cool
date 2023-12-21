resource "github_repository" "this" {
  name = "turkish-is-cool"
}

resource "github_repository_environment" "prd" {
  environment = "production"
  repository  = github_repository.this.name
}

resource "github_actions_environment_variable" "hubspot_portal_id" {
  repository    = github_repository.this.name
  environment   = github_repository_environment.prd.environment
  variable_name = "HUBSPOT_PORTAL_ID"
  value         = "44731386"
}

resource "github_actions_environment_secret" "hubspot_personal_access_key" {
  repository      = github_repository.this.name
  environment     = github_repository_environment.prd.environment
  secret_name     = "HUBSPOT_PERSONAL_ACCESS_KEY"
  plaintext_value = data.doppler_secrets.prd.map.HUBSPOT_PERSONAL_ACCESS_KEY
}
