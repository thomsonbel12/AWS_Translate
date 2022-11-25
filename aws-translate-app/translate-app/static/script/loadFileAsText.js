
let files = [],
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

document.getElementsByClassName('upload-btn')[0].addEventListener('click', function () {
    var upload_imgs_container = document.querySelector('.upload_imgs_container');
    upload_imgs_container.classList.toggle('show');
});

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
                x = 1;
            }else if(isValidFile(file[i]) === 'image'){
                files.push(file[i]);
                x = 2;
            }
        }
    }

    if (x === 1)
        loadFileAsText();
    // doTranslate();
    else if(x === 2){
        document.getElementById('submit_textract_btn').click()
    }
    showImages();
});

const delImg = i => {
    files.splice(i, 1);
    showImages();
};

function showImages() {
    let imgs = '';
    files.forEach((e, i) => {
        imgs += `<div class="img">
        <img src="${URL.createObjectURL(e)}" alt="">
        <span class="delImgbtn" onclick="delImg(${i})">&times;</span>
    </div>`;
    });
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
    for (let i = 0; i < file.length; i++) {
        if (files.every(e => e.name !== file[i].name)) {
            // if (isFileImage(file[i]))
            files.push(file[i]);
        }
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
        ảnh
    </label>`;

    form.classList.remove('dragover');
});


