const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controlsColor"),
    range = document.getElementById("jsRange"),
    mode = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave");

canvas.width = document.querySelector(".canvas").offsetWidth;
canvas.height = document.querySelector(".canvas").offsetHeight;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX,
        y = event.offsetY;
    if (painting == false) {
        ctx.beginPath(); // 경로 생성
        ctx.moveTo(x, y); // 선 시작 좌표
    } else {
        ctx.lineTo(x, y); // 선 끝 좌표
        ctx.stroke(); // 선 그리기
    }
}

function onMouseDown(event) {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log("Color : ", color);
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling == true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling == true) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

function handleSaveImage(event) {
    event.preventDefault;
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/pdf"),
        link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleSaveImage);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}