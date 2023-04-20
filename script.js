const amount = document.getElementById('amount')
const delay = document.getElementById('delay')

async function main() {
    if (!testPopups()) { return }
    let searches = []
    for (let i = 0; i < amount.value; i++) {
        searches.push(words[Math.floor(Math.random() * words.length)])
    }

    // Split Searches Into Group Of 10 For Less Errors
    let length = searches.length / 10
    for (let _ = 0; _ < length; _++) {
        let group = searches.splice(0, 10)
        let popups = []
        await Promise.all(group.map(async (q, i) => {
            let url = `http://www.bing.com/search?q=` + encodeURIComponent(q)
            let x = (100 * i) % window.innerWidth; if (x < 100) { x = 0 }
            let y = Math.floor((100 * i) / window.innerWidth) * 100

            let newPopup = window.open(url, "_blank", `width=100,height=100,top=${y},left=${x}`)
            popups.push(newPopup)
            await new Promise(resolve => setTimeout(resolve, delay.value))
            newPopup.close()
        }))
        for (const popup of popups) { popup.close() }
    }
}

function testPopups() {
    let testPopups = window.open("", "", `top = ${window.innerHeight}, left = ${window.innerWidth}, width = 1, height = 1`)
    if (!testPopups || testPopups.closed || typeof testPopups.closed == "undefined") {
        alert("Allow popus for this to work.")
        return false
    } else { testPopups.close(); return true }
}

amount.addEventListener('input', () => amount.value = amount.value > 100 ? 100 : amount.value)
window.addEventListener('DOMContentLoaded', testPopups)
