terraform {
  cloud {
    organization = "delegator-llc"

    workspaces {
      name = "turkish-is-cool"
    }
  }

  required_providers {
    doppler = {
      source  = "DopplerHQ/doppler"
      version = "1.3.0"
    }
  }
}
