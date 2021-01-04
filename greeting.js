const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);    //브라우저 localStorage (Key, Value)
}

function handleSubmit(event) {
    event.preventDefault(); //자동으로 일어나는 이벤트를 막음.
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN); //클래스 추가
    form.addEventListener("submit", handleSubmit);  //submit할 때 handleSubmit 함수 작동.
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);  //클래스 제거
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();