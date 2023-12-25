[private]
default:
  just --list

# run commands against hubspot cli with ARGS
hs *args:
  pnpm exec hs {{args}}

source := "src"
dest := "turkish-is-cool"

# run the hubspot watcher
watch:
  pnpm exec hs watch --src {{source}} --dest {{dest}}

# upload the local files to hubspot
upload:
  pnpm exec hs upload --src {{source}} --dest {{dest}}

# fetch the latest files from hubspot
fetch *args:
  pnpm exec hs fetch {{dest}} {{source}} {{args}}

# fetch and then upload files to/from hubspot
sync: fetch upload

# remove a file from the remote PATH
remove path:
  pnpm exec hs remove {{dest}}/{{path}}

# create a TYPE template
create:
  #!/usr/bin/env zsh
  types=(
    template module function website-theme
    react-app vue-app webpack-serverless
  )
  type="$(gum choose $types)"
  dir="{{justfile_directory()}}/src"
  if [[ $type == "template" ]]; then
    dir="$dir/templates"
    if gum confirm "Is this a partial?"; then
      dir="$dir/partials"
    fi
  fi
  name="$(gum input --placeholder "Name...")"
  pnpm exec hs create $type $name $dir

# test github actions locally
act action="push":
  doppler run -c prd --mount .env -- \
    act {{action}} --container-architecture linux/amd64 --secret-file=.env

# run terraform commands with the secrets
tf *args:
  doppler run -c prd --name-transformer tf-var -- \
    terraform -chdir=terraform {{args}}

download-all-pages env="dev":
  #!/usr/bin/env zsh
  doppler run -c {{env}} -- \
      pnpm exec vite-node scripts/download-all-pages.ts
    
