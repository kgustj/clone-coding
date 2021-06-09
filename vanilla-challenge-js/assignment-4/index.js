const windows = document.getElementsByTagName('body')[0];
console.log(window.innerWidth);

function windowResize() {
    if (window.innerWidth <= 500) {
        windows.style.backgroundColor = 'blue';
    } else if (window.innerWidth > 500 && window.innerWidth <= 800) {
        windows.style.backgroundColor = 'yellow'
    } else {
        windows.style.backgroundColor = 'purple'
    }
}
window.addEventListener("resize", windowResize)