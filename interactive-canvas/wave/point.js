export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.05;
        this.cur = index;
        this.max = Math.random() * 100 + 50;
    }

    update() {
        this.cur += this.speed;
        //  현재 값을 speed만큼 증가
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
        // sin 함수를 써서 아래위로 움직일 수 있도록..?
        // sin에 일정 값을 추가하거나 빼면 리턴이 1까지 증가했다 -1까지 감소
    }
}
