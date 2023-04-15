const amount = document.getElementById('amount')
const delay = 100
let blockedPopups = false

async function main() {
    if (blockedPopups) { return }
    const searchWords = []
    for (let i = 0; i < amount.value; i++) {
        searchWords.push(words[Math.floor(Math.random() * words.length)])
    }
    await Promise.all(searchWords.map(async q =>  {
        let newWindow = window.open(`http://www.bing.com/search?q=` + encodeURIComponent(q))
    }))
}

amount.addEventListener('input', () => amount.value = amount.value > 100 ? 100 : amount.value)

window.addEventListener('DOMContentLoaded', () => {
    // Test Popup
    let test = window.open("", "", `top = ${window.innerHeight}, left = ${window.innerWidth},width = 1, height = 1`)
    if (!test || test.closed || typeof test.closed == "undefined") {
        blockedPopups = true
        alert("Allow popus for this to owrk.")
    } else { test.close() }
})