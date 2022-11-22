
function swapText() {
    let inputText = document.getElementById('inputText').value;
    let outputText = document.getElementById('outputText').value;

    document.getElementById('inputText').value = outputText;
    document.getElementById('outputText').value = inputText;

    let source = document.getElementById("sourceLanguageCodeDropdown").value;
    let target = document.getElementById("targetLanguageCodeDropdown").value;

    if(source === 'auto'){
        source = 'en'
    }
    document.getElementById("sourceLanguageCodeDropdown").value = target;
    document.getElementById("targetLanguageCodeDropdown").value = source;
}

document.querySelector('button.swap').addEventListener('click', swapText)