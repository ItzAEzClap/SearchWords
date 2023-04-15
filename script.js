const amount = document.getElementById('amount')
const delay = 100
let blockedPopups = false

async function main() {
    if (blockedPopups) { return }

    for (let i = 0; i < amount.value; i++) {
        let word = words[Math.floor(Math.random() * words.length)]
        let newWindow = window.open(`http://www.bing.com/search?q=` + encodeURIComponent(word))
        await new Promise(resolve => setTimeout(resolve, delay))
        newWindow.close()
    }
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