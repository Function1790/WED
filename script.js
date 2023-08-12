const codeEditor = document.getElementsByClassName("codeEditor")[0]
const codeInput = [...document.getElementsByClassName('codeInput')]

function createNewLine() {
    const line = document.createElement('div')
    line.className = 'codeLine'
    line.innerHTML = `
                <div class="lineIndex">${codeInput.length + 1}</div>
            `
    const input = document.createElement('input')
    input.className = "codeInput"
    input.addEventListener("keydown", onKeydown)

    line.appendChild(input)
    codeEditor.appendChild(line)
    codeInput.push(input)
    codeInput[codeInput.length - 1].focus()
}

function deleteLine(index) {
    codeEditor.removeChild(codeEditor.children[index])
    codeInput.splice(index, 1)
    codeInput[index - 1].focus()
    for (var i = 0; i < codeEditor.children.length; i++) {
        codeEditor.children[i].querySelector("div.lineIndex").innerText = `${i + 1}`
    }
}

function onKeydown(event) {
    const index = codeInput.indexOf(this)
    switch (event.key) {
        case "Enter":
            if (index == codeInput.length - 1) {
                createNewLine()
            } else {
                codeInput[codeInput.length - 1].focus()
            }
            break
        case "Backspace":
            if (this.value == "" && index != 0) {
                deleteLine(index)
            }
            break
    }
}

for (var i = 0; i < codeInput.length; i++) {
    codeInput[i].addEventListener('keydown', onKeydown)
}