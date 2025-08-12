jq -r '.[] | select(.name | test("[A-Z][a-z]")) | "\(.name) (\(.text | gsub("\n"; "") | .[0:20]))"' mods.json
