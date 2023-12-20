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

alias w := watch

# upload the local files to hubspot
upload:
  pnpm exec hs upload --src {{source}} --dest {{dest}}

alias u := upload

# fetch the latest files from hubspot
fetch *args:
  pnpm exec hs fetch {{dest}} {{source}} {{args}}

alias f := fetch

# fetch and then upload files to/from hubspot
sync: fetch upload

alias s := sync

# remove a file from the remote PATH
remove path:
  pnpm exec hs remove {{dest}}/{{path}}

alias rm := remove

# create a TYPE template
create name type="template":
  echo "function module react-app template vue-app webpack-serverless website-theme" \
    | tr " " "\\0" \
    | sk --read0 \
    | xargs pnpm exec hs create {{type}} {{name}}
