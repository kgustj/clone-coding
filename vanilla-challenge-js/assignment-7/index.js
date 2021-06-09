const toDoForm = document.querySelector(".toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toDoList"),
    finDoList = document.querySelector(".finDoList");

const TODOS_LS = "PENDING",
    FINDOS_LS = "FINISHED";

let toDos = [],
    finDos = [];
// 첫 번째 목록을 0에서 시작하도록 할당


function deleteToDo(event) {
    const btn = event.target;
    // 이벤트 발생시 정보 호출
    const li = btn.parentNode;
    // 버튼에 대한 부모요소 확인
    toDoList.removeChild(li);
    // 자식 li 태그 제거
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    // filter로 함수가 toDos의 모든 items들에게 실행, true인 item으로 다시 배열 구성
    toDos = cleanToDos
    // toDos를 필터된 배열로 다시 할당
    saveToDos();
    // local storage에 저장
}
function toDoToFin(event) {
    const btn = event.target;
    // 이벤트 발생시 정보 호출
    const li = btn.parentNode;
    // 버튼에 대한 부모요소 확인
    const newId = toDos.length + 10000,
    text = li.querySelector('span'),
    finBtn = li.querySelector('.todoFin');
    // finBtn.className = "finDoFin";

    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    // filter로 함수가 toDos의 모든 items들에게 실행, true인 item으로 다시 배열 구성
    finDoList.appendChild(li);
    finBtn.innerText = '◀️';

    const finDoObj = {
        text: text.innerText,
        id: newId
    };
    console.log(finDoObj);
    finDos.push(finDoObj);
    saveFinDos();
}

function deleteFinDo(event) {
    const btn = event.target;
    // 이벤트 발생시 정보 호출
    const li = btn.parentNode;
    // 버튼에 대한 부모요소 확인
    finDoList.removeChild(li);
    // 자식 li 태그 제거
    const cleanFinDos = finDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    // filter로 함수가 toDos의 모든 items들에게 실행, true인 item으로 다시 배열 구성
    finDos = cleanFinDos
    // toDos를 필터된 배열로 다시 할당
    saveFinDos();
    // local storage에 저장
}

function finDoToDo(event) {
    const btn = event.target;
    // 이벤트 발생시 정보 호출
    const li = btn.parentNode;
    // 버튼에 대한 부모요소 확인
    const newId = toDos.length + 1;
    text = li.querySelector('span'),
    finBtn = li.querySelector('.todoFin');

    const cleanFinDos = finDos.filter(function (finDo) {
        return finDo.id !== parseInt(li.id);
    });
    finDos = cleanFinDos
    // filter로 함수가 toDos의 모든 items들에게 실행, true인 item으로 다시 배열 구성
    finBtn.innerText = '✅';
    toDoList.appendChild(li);

    const toDoObj = {
        text: text.innerText,
        id: newId
    };
    console.log(toDoObj);
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFinDos() {
    localStorage.setItem(FINDOS_LS, JSON.stringify(finDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.className = "todoDel";
    finBtn.innerText = "✅";
    finBtn.className = "todoFin";
    // span과 button에 텍스트 추가
    delBtn.addEventListener("click", deleteToDo);
    finBtn.addEventListener("click", deleteToDo);
    finBtn.addEventListener("click", toDoToFin);
    // 버튼 눌렀을 경우 이벤트 감지, 함수 호출
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    // span과 button태그를 부모 li의 자식 요소로 추가
    li.id = newId;
    // 생성된 li에 id 값 부여
    toDoList.appendChild(li);
    // li 태그를 toDoList(ui)의 자식요소로 추가
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    // toDos 배열에 object값 추가
    saveToDos()
    // 저장
}

function paintFinDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = finDos.length + 10000
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.className = "findoDel";
    finBtn.innerText = "◀️";
    finBtn.className = "todoFin";
    // span과 button에 텍스트 추가
    delBtn.addEventListener("click", deleteFinDo);
    finBtn.addEventListener("click", deleteFinDo);
    finBtn.addEventListener("click", finDoToDo)
    // 버튼 눌렀을 경우 이벤트 감지, 함수 호출
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    // span과 button태그를 부모 li의 자식 요소로 추가
    li.id = newId;
    // 생성된 li에 id 값 부여
    finDoList.appendChild(li);
    // li 태그를 toDoList(ui)의 자식요소로 추가
    const toDoObj = {
        text: text,
        id: newId
    };
    finDos.push(toDoObj);
    // toDos 배열에 object값 추가
    saveToDos()
    // 저장
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS)
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function loadFinDos() {
    const loadedFinDos = localStorage.getItem(FINDOS_LS)
    if (loadedFinDos !== null) {
        const parsedFinDos = JSON.parse(loadedFinDos);
        parsedFinDos.forEach(function (toDo) {
            paintFinDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    loadFinDos();
    toDoForm.addEventListener("submit", handleSubmit)
};

init();