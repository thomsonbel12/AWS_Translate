function clearInputs() {
    document.getElementById('inputText').value = "";
    document.getElementById('outputText').value = "";
    document.getElementById("sourceLanguageCodeDropdown").value = "auto";
    document.getElementById("targetLanguageCodeDropdown").value = "vi";
    // document.getElementById("filename").value = "";

    document.getElementById('clear-btn').style.display = "none";

    for(let i = 0 ;i < poly_btn.length ;i++){
        poly_btn[i].setAttribute('disabled','disabled')
        poly_btn[i].classList.add('disabled')
    }
}

document.getElementById('clear-btn').addEventListener('click', clearInputs)