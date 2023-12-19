[private]
default:
  just --list

# run commands against hubspot cli
hs +args:
  pnpm exec hs {{args}}
