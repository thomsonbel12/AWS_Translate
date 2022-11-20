// document.addEventListener('DOMContentLoaded', () => {
    const selectDrop = document.getElementsByClassName('form-select');

    fetch('./language.json').then(res => {
        return res.json();
    }).then(data => {
        let opt = "";
        // console.log(data.language[0].name)
        data.language.forEach(country => {
            opt += `<option id=${country.value} value=${country.value}>${country.name}</option>`;
            // console.log(country.cca2);
        });

        selectDrop[0].innerHTML = `<option value='auto'>Auto</option>` + opt;
        selectDrop[1].innerHTML = opt;

        // const a = document.ge
        
    }).catch(e => {
        console.log(e);
    });