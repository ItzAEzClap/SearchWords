const amount = document.getElementById('amount')
const delay = document.getElementById('delay')
let blockedPopups = true

async function main() {
    if (blockedPopups) { return }
    let searches = []
    for (let i = 0; i < amount.value; i++) {
        searches.push(words[Math.floor(Math.random() * words.length)])
    }

    // Split Searches Into Group Of 10 For Less Errors
    let length = searches.length / 10
    for (let _ = 0; _ < length; _++) {
        let group = searches.splice(0, 10)
        await Promise.all(group.map(async (q, i) => {
            let url = `http://www.bing.com/search?q=` + encodeURIComponent(q)
            let x = (100 * i) % window.innerWidth; if (x < 100) { x = 0 }
            let y = Math.floor((100 * i) / window.innerWidth) * 100

            let newPopup = window.open(url, "_blank", `width=100,height=100,top=${y},left=${x}`)
            await new Promise(resolve => setTimeout(resolve, delay.value))
            newPopup.close()
        }))
    }
}

function testPopups() {
    let testPopups = window.open("", "", `top = ${window.innerHeight}, left = ${window.innerWidth}, width = 1, height = 1`)
    if (!testPopups || testPopups.closed || typeof testPopups.closed == "undefined") {
        blockedPopups = true
        return false
    } else { testPopups.close(); return true }
}

amount.addEventListener('input', () => amount.value = amount.value > 100 ? 100 : amount.value)
window.addEventListener('DOMContentLoaded', testPopups)


window.addEventListener('load', () => {
    if (!testPopups()) { alert("Allow popus for this to work."); return }
    else { blockedPopups = false }

    let url = new URL(location)
    let params = url.searchParams
    let timeDelay = params.get("delay")
    let amountOfSearches = params.get("searches")
    if (timeDelay) { delay.value = timeDelay }
    if (amountOfSearches) { amount.value = Math.min(amountOfSearches, 100) }
    document.getElementById('search').click()
})