# wanjiadongli-scrape

A project to scrape and collect all Stardew Valley mods on the Chinese mod site [wanjiadongli.com](https://wanjiadongli.com), as the vast mmajority of them are stolen.

## collecting data

install the requests python library and `python3 scrape.py`

## formatting the data

run the relevant shell scripts with jq on path if you desire, or `bun generate-page.ts` for the HTML viewer with a (usually inaccurate but humans can generally tell what mod it's talking about) option to google translate all/individual mod names.
