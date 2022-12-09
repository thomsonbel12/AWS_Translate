
let files = [],
    type = [],
    form = document.querySelector('.img_card .add_img_form'),
    input_img = document.querySelector('.add_img_form input'),
    imgs_container = document.querySelector('.imgs_container'),
    text_inner = document.querySelector('.text_inner');
// delAllImg = document.querySelector('.delAllImg > div');


function loadFileAsText() {
    var fileToLoad = document.getElementById("img_select_btn").files;
    // console.log(fileToLoad);
    var fileReader = new FileReader();
    fileReader.onload = function () {
        var textFromFileLoaded = fileReader.result;
        document.getElementById("inputText").value = textFromFileLoaded;
        // console.log(fileToLoad.result);
        doTranslate();
    };

    fileReader.readAsText(fileToLoad[0], "UTF-8");
}

function readDocxFile() {
    var fileToLoad = document.getElementById("img_select_btn").files;

    var reader = new FileReader();
    reader.onload = function () {
        try{
            var zip = new JSZip(reader.result);
            var doc = new window.docxtemplater().loadZip(zip);
            var text = doc.getFullText();
            document.getElementById("inputText").value = text;
            doTranslate();

        }catch{
            alert("Không hỗ Trợ định đạng file này")
        }
    };
    reader.readAsBinaryString(fileToLoad[0]);
}


function isValidFile(file) {
    // let x = 
    let x = file && file['type'].split('/')[0];
    // let x = file.split('.').pop();
    console.log(x);
    return x;
}


input_img.addEventListener('change', function () {
    clearInputs();

    let file = input_img.files;
    let x = 0;
    for (let i = 0; i < file.length; i++) {
        if (files.every(e => e.name !== file[i].name)) {
            // console
            if (isValidFile(file[i]) === 'text') {
                files.push(file[i]);
                type.push(1);
                x = 1;
            } else if (isValidFile(file[i]) === 'image') {
                files.push(file[i]);
                type.push(2);
                x = 2;
            }
            else {
                // console.log(isValidFile(file[i]));
                files.push(file[i])
                type.push(3)
                x = 3;
            }
        }
    }

    if (x === 1) {
        loadFileAsText();
        showImages();
    }
    // doTranslate();
    else if (x === 2) {

        showImages();
        document.getElementById('submit_textract_btn').click();
    }
    else{
        try{
            readDocxFile()
            showImages()
        }catch{
            alert("Không hỗ Trợ định đạng file này")
        }
    }
});

const delImg = i => {
    files.splice(i, 1);
    // input_img.value = files
    showImages();
};


function showImages() {
    let imgs = '';

    // if (type === 1) {
    files.forEach((e, i) => {
        if (type[i] === 1) {
            imgs += `<div class="img">
            <img src='https://e7.pngegg.com/pngimages/411/777/png-clipart-computer-icons-text-file-computer-file-file-txt-icon-angle-text.png'
            alt="${files[i].name}">
            <span>${files[i].name}</span>
            <span class="delImgbtn" onclick="delImg(${i})">&times;</span>
        </div>`;
        }
        else if (type[i] === 2) {
            imgs += `<div class="img">
            <img src="${URL.createObjectURL(e)}" alt="">
            <span>${files[i].name}</span>
            <span class="delImgbtn" onclick="delImg(${i})">&times;</span>
        </div>`;
        }else{
            imgs += `<div class="img">
            <img src='https://www.pngall.com/wp-content/uploads/5/Mobile-Application-PNG-Image.png'
            alt="${files[i].name}">
            <span>${files[i].name}</span>
            <span class="delImgbtn" onclick="delImg(${i})">&times;</span>
        </div>`;
        }
    });
    // }
    // else if (type === 2) {
    // }
    imgs_container.innerHTML = imgs;
}

// function delAllImgFunct() {
//     files = [];
//     showImages();
// }
// delAllImg.addEventListener('click', delAllImgFunct);


form.addEventListener('dragover', function (e) {
    // console.log("d")
    e.preventDefault();
    form.classList.add('dragover');
    text_inner.innerHTML = "THẢ FILE NGAY ĐÂY";
});
form.addEventListener('drop', (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files;
    input_img.files = file;
    let x = 0;
    for (let i = 0; i < file.length; i++) {
        if (files.every(e => e.name !== file[i].name)) {
            // console
            if (isValidFile(file[i]) === 'text') {
                files.push(file[i]);
                type.push(1);
                x = 1;
            } else if (isValidFile(file[i]) === 'image') {
                files.push(file[i]);
                type.push(2);
                x = 2;
            }
            else {
                // console.log(isValidFile(file[i]));
                files.push(file[i])
                type.push(3)
                x = 3;
            }
        }
    }

    if (x === 1) {
        loadFileAsText();
        showImages();
    }
    // doTranslate();
    else if (x === 2) {
        // document.getElementById('submit_textract_btn').click()
        showImages();
    }
    text_inner.innerHTML = `Kéo & thả file ở đây hoặc
    <label for="img_select_btn"
    class="select fontWeight-600">Chọn
    ảnh
    </label>`;

    form.classList.remove('dragover');

    showImages();

});
form.addEventListener('dragleave', function (e) {
    // console.log("d")
    e.preventDefault();
    text_inner.innerHTML = `Kéo & thả file ở đây hoặc
    <label for="img_select_btn"
    class="select fontWeight-600">Chọn
    file
    </label>`;

    form.classList.remove('dragover');
});


