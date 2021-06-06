import {
    Ball
} from './ball.js';

import {
    Block
} from './block.js';


class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
        // body에 canvas 넣기

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 30, 10);
        // ball에 스테이지의 xy값, 반지름, 속도 정의
        this.block = new Block(700,30,300,450);
        // block에 넓이, 높이, x, y값 정의

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
        // for Retina display
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        // 새로운 공을 생성하기 전 이전 프레임을 지워줌

        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }
}

window.onload = () => {
    new App();
}