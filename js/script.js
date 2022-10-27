const start = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')

const timer = document.querySelector('#time') 

const board = document.querySelector('#board')

const arr = ['red', 'blue', 'green', 'yellow']

let time = 20;

let score = 0;

start.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.dataset.time)
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove()
        getRandomCircle()
    }
})

function setTime() {

    if (time === 0) {
        finishGame()
    }

    let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    timer.innerHTML = `00:${current}`;
}

function startGame() {
    setInterval(setTime, 1000)
    getRandomCircle()
}

function getRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    board.append(circle)
    getRandomColor(circle)
    const size = getRandomNumber(10, 50);
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
}

function getRandomNumber(min, max) {
    return  Math.round(Math.random() * (max - min) + min)
}

function finishGame() {
    timer.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class='primary'>${score}</span></h1>`
}

function getRandomColor(elem) {
    elem.style.background = `${arr[Math.floor(Math.random() * arr.length)]}`
}

function winTheGame() {
    function kill() {
        let circle = document.querySelector('.circle');
        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 75)
}

