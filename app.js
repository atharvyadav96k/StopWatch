let cir = document.getElementById("cir");
let time = 25;
let shortBreak = 2;
let longBreak = 15;
// cir.style.strokeDashoffset = 200;

class option {
    constructor() {
        this.valtime = new clock();
        this.start = document.getElementById("move");
        this.options = Array.from(document.getElementsByClassName("options"));
        this.apply = document.getElementById("apply")
        this.apply.addEventListener("click", () => {
            this.valtime.applyTime()
            this.valtime.selected = index;
            this.valtime.resetAnimation();
            this.valtime.setAnimation();
            this.valtime.stop();
            this.valtime.displayTime();
        })
        this.pause = true;
        gsap.to(this.options[0], {
            color: "white"
        })
        this.options.forEach((ele, index) => {
            ele.addEventListener("click", () => {
                gsap.to("#back", {
                    x: 115 * index
                })
                gsap.to(".options", {
                    color: '#6d718f'
                })
                gsap.to(ele, {
                    color: "white"
                })
                this.valtime.selected = index;
                this.valtime.resetAnimation();
                this.valtime.setAnimation();
                this.valtime.stop();
                this.valtime.displayTime();
            })
        })
        this.start.addEventListener('click', () => {
            if (this.pause) {
                this.valtime.startTimer();
                this.start.innerText = "pause";
                this.pause = false
            }
            else {
                this.valtime.stop();
                this.start.innerText = "start";
                this.pause = true
            }

        })
    }
}
class clock {
    constructor() {
        this.time = document.getElementById("mainTime");
        this.time.value = time
        this.short = document.getElementById("short");
        this.short.value = shortBreak
        this.long = document.getElementById("long");
        this.long.value = longBreak
        this.display = document.getElementById("time")
        this.curretTime = [this.time.value, this.short.value, this.long.value];
        this.selected = 0;
        this.sec = 0;
        this.displayTime();
        // this.startTimer();
        this.setAnimation(this.curretTime[this.selected])
    }
    setTime() {
        this.curretTime = [this.time.value, this.short.value, this.long.value];
    }
    startTimer() {
        this.timer = setInterval(() => {
            if (this.curretTime[this.selected] > 0) {
                this.sec += 1;
                if (this.sec > 59) {
                    this.sec = 0;
                    this.curretTime[this.selected] -= 1;
                    if (this.curretTime[this.selected] < 1) {
                        this.curretTime[this.selected] = 0
                        this.stop()
                    }
                }
                this.animation()
            }
            this.displayTime()
            console.log(this.curretTime[this.selected])
        }, 1)

    }
    stop() {
        clearInterval(this.timer)
        // cir.style.strokeDashoffset = 0;
    }
    timeText(num) {
        if (num < 10) {
            return '0' + num;
        }
        else {
            return num
        }
    }
    displayTime() {
        this.display.innerText = `${this.timeText(this.curretTime[this.selected])}:${this.timeText(this.sec)}`

    }
    resetAnimation() {
        cir.style.strokeDashoffset = 0
    }
    applyTime() {
        this.curretTime = [this.time.value, this.short.value, this.long.value];
    }
    setAnimation() {
        this.animationAngle = 815 / (this.curretTime[this.selected] * 60);
        this.animationValue = 0;
    }
    animation() {
        this.animationValue += this.animationAngle;
        cir.style.strokeDashoffset = this.animationValue;
    }
}
class fonts {
    constructor() {
        let font = Array.from(document.getElementsByClassName("font"));
        let main = document.getElementById("main");
        let Family = ["Smooch Sans, sans-serif", "Montserrat, sans-serif", "Vina Sans, sans-serif"]

        font.forEach((ele, index) => {
            ele.addEventListener("click", () => {
                font.forEach((f) => {
                    f.style.backgroundColor = '#a0a5cb';
                    f.style.color = '#131734';
                })
                main.style.fontFamily = Family[index];
                ele.style.backgroundColor = '#131734';
                ele.style.color = '#a0a5cb';
            })
        })
    }
}
const font = new fonts()
const op = new option();
