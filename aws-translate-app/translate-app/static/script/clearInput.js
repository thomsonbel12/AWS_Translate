function clearInputs() {
    document.getElementById('inputText').value = "";
    document.getElementById('outputText').value = "";
    document.getElementById('clear-btn').style.display = "none";
    document.getElementById('copy-btn').style.display = "none";

    poly_btn[0].style.display = "none";
    poly_btn[1].style.display = "none";
}

document.getElementById('clear-btn').addEventListener('click', clearInputs);