jq -r '.[] | "\(.name) (\(.text | gsub("\n"; "") | .[0:20]))"' mods.json
