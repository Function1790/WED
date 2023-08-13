const codeEditor = document.getElementsByClassName("codeEditor")[0]
const codeInput = [...document.getElementsByClassName('codeInput')]

function createNewLine() {
    const line = document.createElement('div')
    line.className = 'codeLine'
    line.innerHTML = `
                <div class="lineIndex">${codeInput.length + 1}</div>
            `
    const input = document.createElement('div')
    input.className = "codeInput"
    input.spellcheck = false
    input.contentEditable = true
    input.addEventListener("keydown", onKeydown)

    line.appendChild(input)
    codeEditor.appendChild(line)
    codeInput.push(input)
    codeInput[codeInput.length - 1].focus()
}

function deleteLine(index) {
    codeInput[index - 1].focus()
    var leftData = codeInput[index].textContent
    codeEditor.removeChild(codeEditor.children[index])
    codeInput.splice(index, 1)
    for (var i = 0; i < codeEditor.children.length; i++) {
        codeEditor.children[i].querySelector("div.lineIndex").innerText = `${i + 1}`
    }
    var before_len = codeInput[index - 1].textContent.length
    codeInput[index - 1].textContent += leftData
    codeInput[index - 1].setSelectionRange(before_len, before_len)
}

function onKeydown(event) {
    const index = codeInput.indexOf(this)
    //console.log(event.key)
    switch (event.key) {
        case "Enter": //\n 없애기
            event.preventDefault()
            if (index == codeInput.length - 1) {
                createNewLine()
            } else {
                if (index + 1 < codeInput.length) {
                    codeInput[index + 1].focus()
                }
            }
            break
        case "Backspace"://selectionStart 고치기
            console.log("test")
            if ( index != 0) {
                console.log("test2")
                event.preventDefault()
                deleteLine(index)
            }
            break
        case "ArrowUp":
            if (index - 1 >= 0) {
                codeInput[index - 1].focus()
            }
            break
        case "ArrowDown":
            if (index + 1 < codeInput.length) {
                codeInput[index + 1].focus()
            }
            break
        case "ArrowRight":
            const coloredSpan = editableDiv.querySelector('.colored');
            coloredSpan.style.color = 'red'; // 원하는 색상으로 변경

    }
}

for (var i = 0; i < codeInput.length; i++) {
    codeInput[i].addEventListener('keydown', onKeydown)
}