const form = document.querySelector(".form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
    // localStorage의 USER_LS에 text값 저장
}

function handleSubmit(event) {
    event.preventDefault();
    // event가 발생하면서 생기는 기본 동작 막기
    const currentValue = input.value;
    // input에서 받아온 value를 상수 currentValue로 지정
    paintGreeting(currentValue);
    // paintGreeting 함수를 실행해 text 출력
    saveName(currentValue);
    // saveName 함수를 실행해 localStorage에 input에서 받아온 text 저장
}

function askForName() {
    form.classList.add(SHOWING_CN);
    // form에 class showing을 추가
    form.addEventListener("submit", handleSubmit)
    // 사용자가 form에 (text를) 제출했을 때, handleSubmit 실행
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    // form의 class showing을 삭제
    greeting.classList.add(SHOWING_CN);
    // greeting에 class showing을 추가
    greeting.innerText = `Hello ${text} :)`;
    // greeting에 text 넣기
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    // localStorage에서 currentUser의 값을 불러오기
    if (currentUser == null) {
        askForName();
        // currentUser의 값이 null이면 askForName 함수 실행

    } else {
        paintGreeting(currentUser);
        // currentUser의 값이 null이 아니면 paintGreeting 함수 실행
    }
};

function init() {
    loadName();
}

init();