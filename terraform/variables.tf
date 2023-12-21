variable "doppler_project" {
  type = string
  default = "turkish-is-cool"
}

variable "doppler_config" {
  type = string
}

variable "doppler_environment" {
  type = string
}

variable "doppler_token" {
  type = string
  sensitive = true
}

