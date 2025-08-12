jq -r '.[] 
    | select(.name | test("[A-Z][a-z]")) 
    | "https://www.wanjiadongli.com/mods/\(.id): \(.name) (\(.text | gsub("\n"; "") | .[0:20]))"' mods.json
