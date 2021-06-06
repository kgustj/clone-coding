export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius;
        // 반지름 지정
        this.vx = speed;
        this.vy = speed;
        // vx와 vy에 x,y의 이동 속도 지정

        const diameter = this.radius * 2;
        // diameter = 지름
        this.x = diameter + (Math.random() * stageWidth - diameter);
        this.y = diameter + (Math.random() * stageHeight - diameter);
        // 스테이지에 랜덤으로 위치할 수 있도록 함수 정의

    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx;
        this.y += this.vy;
        // x,y값에 각각 vx,vy값을 더해주며 첫 애니메이션 시작

        this.bounceWindow(stageWidth, stageHeight);
        // bounceWindow 함수 실행해서 벽에 튕기는 효과 넣기

        this.bounceBlock(block);
        console.log(block);

        ctx.fillStyle = '#fdd700';
        // 채울 스타일을 정의(..?)
        ctx.beginPath();
        // 새로운 경로를 만드는 함수(..?)
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // arc(x, y, radius, startAngle, endAngle, anticlockwise)
        // 원을 그릴 때 사용하는 함수, anticlockwise = 방향 (기본값은 시계방향)
        // Math.PI = 3.14159265..
        ctx.fill();
        // 경로의 내부를 채워서 도형을 그리는 함수
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;
        // && = and , || = or
        if (this.x <= minX || this.x >= maxX) {
            // x값이 반지름보다 작거나 같다면 or 스테이지-반지름보다 크거나 같다면
            this.vx *= -1;
            // vx값에 -1을 곱함 (방향 변경)
            this.x += this.vx;
        } else if (this.y <= minY || this.y >= maxY) {
            // y값이 반지름보다 작거나 같다면 or 스테이지-반지름보다 크거나 같다면
            this.vy *= -1;
            this.y += this.vy;
            // vy값에 -1을 곱함 (방향 변경)
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius,
            maxX = block.maxX + this.radius,
            minY = block.y - this.radius,
            maxY = block.maxY + this.radius;

        if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x),
                x2 = Math.abs(this.x - maxX),
                y1 = Math.abs(minY - this.y),
                y2 = Math.abs(this.y - maxY),
                min1 = Math.min(x1, x2),
                min2 = Math.min(y1, y2),
                min = Math.min(min1, min2);

            if (min == min1) {
                this.vx *= -1;
                this.x += this.vx;
            } else if (min == min2) {
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}