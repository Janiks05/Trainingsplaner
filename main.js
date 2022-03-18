//html DOM
const dayIcon = document.getElementById('daytimeicon')
let dateText = document.getElementById('dateh2')
let boxes = document.getElementById("boxes")
let notification = document.getElementById("notification")
let statusText = document.getElementById("status-text-h2")
let statusIcon = document.getElementById("status-icon")
let timerBox = document.getElementById("timerbox")
let timerText = document.getElementById("timerboxText")
let exerText = document.getElementById("exer")


//time
const hours = new Date().getHours()
const day = new Date().getDay()
const date = new Date().getDate()
let month = new Date().getMonth()
const year = new Date().getFullYear()

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//score
let score = localStorage.getItem("score")
//calculate date
let currentDate = weekday[day] + ": " + date + "." + (month + 1) + "." + year
dateText.innerHTML = currentDate
let currentDay = day

//audio
var ringtone = new Audio('./audio/ringtone.mp3');

//arrlength
let dataLength = 0
//show icon based on Daytime
if (hours > 6 && hours < 18) {
    dayIcon.src = "./img/sun.png"
} else {
    dayIcon.src = "./img/moon.png"
}

//fetch to get yesterdays exersizes
var newDay;
if (day == 0) {
    newDay = 6
} else {
    newDay = day - 1
}
fetch('https://trainingsapi.herokuapp.com/' + newDay).
    then(response => response.json()).
    then(data => {
        setInterval(status, 100)

        function status() {
            if (data.length == score) {
                statusText.innerHTML = "Status: Toll gemacht"
                statusIcon.innerHTML = "💪"
            }
            else if (score >= 5) {
                statusText.innerHTML = "Status: das geht besser"
                statusIcon.innerHTML = "🙂"
            }
            else {
                statusText.innerHTML = "Status: das nix gut"
                statusIcon.innerHTML = "😡"
            }
        }

    })


//gets data from Api 
fetch('https://trainingsapi.herokuapp.com/' + day).
    then(response => response.json()).
    then(data => {
        for (let i = 0; i < data.length; i++) {
            let type = typeof data[i].time
            let typeEx;
            if (type == "number") {
                typeEx = "min"
            } else if (type = "string") {
                typeEx = "Wdh."
            }
            //for each exersize an HTML Element is created
            boxes.innerHTML += `
    <div class="box" id="box${i}">
    <div class="box-headline">
        <h3>${data[i].title}</h3>
        <button onclick="markFinished(${i})" class="red" id="box-button${i}">DONE</button>
    </div>
        <h4 onclick="startTimer(${data[i].time + "," + "'" + data[i].title + "'"})">${data[i].time + " " + typeEx}</h4>
        <p>${data[i].description}</p>
    </div>
    `
        }
        for (let i = 0; i < score; i++) {
            let boxbutton = document.getElementById("box-button" + i)
            boxbutton.classList.add("green")
            boxbutton.disabled = true
        }
    })

function markFinished(zahl) {
    let boxbutton = document.getElementById("box-button" + zahl)
    if (score >= zahl) {
        boxbutton.classList.remove("red")
        boxbutton.classList.add("green")
        boxbutton.disabled = true
        if (localStorage.getItem("day") == currentDay) {
            score++;
        }
        else {
            score == 0
            score++;
        }
        localStorage.setItem("score", score)
    }


}