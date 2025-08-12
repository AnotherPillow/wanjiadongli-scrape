import requests, json


def doRequest(offsetPages: int = 1):
    # max per request is 100
    # 1158 is stardew id
    r = requests.get(f'https://api.wanjiadongli.com/www/mods/?current={offsetPages}&size=100&gameId=1158&sort=1', headers={
        'Referer': 'https://www.wanjiadongli.com/games/1158',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0',
    })

    j = r.json()

    if j['message'] != 'ok':
        print(f'Page {offsetPages} failed to get! Got mesasge: [{j["code"]}] {j["message"]}')
        return {'mods': [], 'total': 0}

    mods = j['result']['data']

    totalCount = j['result']['total']

    return {
        'mods': mods,
        'total': totalCount,
    }

totalCount = 1
page = 1
i = 0

allMods = []

while i < totalCount:
    print(f'Getting mods from {i}')
    req = doRequest(page)
    if totalCount < 2:
        totalCount = req['total']

    allMods += req['mods'] # yes you can do that in python

    i += len(req['mods'])

    page += 1
    print(f'Got {i}/{totalCount} mods (page {page})')

print(f'Done! Got {len(allMods)} mods. Writing to mods.json')

with open('mods.json', 'w', encoding='utf-8') as f:
    json.dump(allMods, f, indent=4, ensure_ascii=False)
    print('File written')

