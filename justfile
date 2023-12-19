[private]
default:
  just --list

# run commands against hubspot cli
hs +args:
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
fetch:
  pnpm exec hs fetch {{dest}} {{source}}

alias f := fetch

# fetch and then upload files to/from hubspot
sync: fetch upload

alias s := sync
