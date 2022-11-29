function copyText(){
    // var copy_btn = document.getElementById('copy-btn')
    var text = document.getElementById('outputText')
    // text.select();
    navigator.clipboard.writeText(text.value)
}
document.getElementById('copy-btn').addEventListener('click', copyText)