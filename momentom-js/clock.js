const clockContainer = document.querySelector(".clock"),
    clockTitle = document.querySelector("h1");

function getTime() {
    // new Date = 현재 시간 불러오기
    const date = new Date();
    // getHours,Minutes,Seconds = 시,분,초 불러오기
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // clockTitle에 텍스트 넣기
    // ${hours < 10 ? `0${hours}` : hours} = small if문
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 100);
}

init();