const body = document.querySelector("body");
const h1 = document.querySelector("h1");

const IMG_NUMBER = 3;

function handleImgLoad() {
    console.log("Finished Loading");
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/neon${imgNumber + 1}.jpg`;

    if(imgNumber === 1) {
        h1.classList.toggle("flux");    //toggle -> 클래스가 있으면 삭제, 없으면 추가
        h1.classList.toggle("neon");
    } else if(imgNumber === 2){
        h1.classList.toggle("flux");
        h1.classList.toggle("neon");
    }

    image.classList.add("bgImage");
    body.prepend(image);
    //image.addEventListener("loadend", handleImgLoad);
}

function genRandom() {
    const number = Math.floor(Math.random() * 2);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();