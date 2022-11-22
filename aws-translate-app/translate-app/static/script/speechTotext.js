document.getElementById('audio-btn').addEventListener('click', function () {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result', t => {
        const transcript = Array.from(t.results)
            .map(result => result[0])
            .map(result => result.transcript)
        document.getElementById('inputText').value = transcript;

    });
    if (speech == true) {
        recognition.start();
    }
})