resource "github_repository" "this" {
  name = "turkish-is-cool"
}

resource "github_repository_environment" "prd" {
  environment = "production"
  repository  = github_repository.this.name
}
