document.getElementById('audio-btn').addEventListener('click', function () {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    document.getElementById("sourceLanguageCodeDropdown").value = "auto";
    recognition.addEventListener('result', t => {
        const transcript = Array.from(t.results)
            .map(result => result[0])
            .map(result => result.transcript)
        document.getElementById('inputText').value = transcript;
        document.getElementById('clear-btn').style.display = "block";
        doTranslate()

    });
    if (speech == true) {
        recognition.start();
    }
})