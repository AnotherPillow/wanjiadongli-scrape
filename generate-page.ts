let html = ``
import mods from './mods.json' with { type: 'json' }

html += `<!DOCTYPE HTML><html><body>`
html += `<h1>Mods on WanjiaDongli.com</h1>`
html += `<button onclick="i = 0; v = setInterval(async () => {if (i > ${mods.length}) return clearInterval(v); window['mod-translate-index-' + i].innerText = await window.translate(window['mod-translate-index-' + i].getAttribute('data-mod-name'));i++ }, 1000)">
    Translate All
</button>`
html += `<ul>`
html += `<script>
    window.translate = async function(inp) {
        console.log(\`Translating \${inp}\`)
        const res = await fetch(\`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=\${encodeURIComponent(inp)}\`) // from auto to english - https://github.com/Venkateeshh/Js-Language-Translator/blob/main/script/script.js
        const text = await res.text()
        let json = []
        try { json = JSON.parse(text) } catch (e) {}
        if (text.length < 10) return ''
            console.log('response json', json)
        return json[0][0][0]
    }
</script>`

// for (const mod of mods) {
for (let i = 0; i < mods.length; i++) {
    const mod = mods[i]
    html += `
        <li>
            <fieldset>
                <legend><a href="https://wanjiadongli.com/mods/${mod.id}"><h2>${mod.name}</h2></a></legend>
                <p><strong>Approximate Google Translated Name: </strong> <span id="mod-translate-index-${i}" data-mod-name="${mod.name.replace(/['"]/g, "")}" onclick="window.translate('${mod.name.replace(/['"]/g, "")}').then((t)=>{this.innerText=t})">Click to translate</span></p>
                <p>${mod.text.replaceAll("\n","<br>")}</p>
                <img align="right" src="${mod.cover}" height="200" loading="lazy">
            </fieldset>
        </li>
    `
}

html += `</ul></body></html>`


Bun.file('list.html').write(html)
