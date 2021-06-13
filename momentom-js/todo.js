const toDoForm = document.querySelector(".toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toDoList")

const TODOS_LS = "toDos";

let toDos = [],
    idNumbers = 0;
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

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers
    idNumbers += 1;
    // idNumbers = idNumbers + 1;
    span.innerText = text;
    delBtn.innerText = "❌";
    // span과 button에 텍스트 추가
    delBtn.addEventListener("click", deleteToDo);
    // 버튼 눌렀을 경우 이벤트 감지, 함수 호출
    li.appendChild(span);
    li.appendChild(delBtn);
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

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
};

init();