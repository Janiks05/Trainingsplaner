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
let exersizesList = document.getElementById("select-workout")


//time
const hours = new Date().getHours()
const day = new Date().getDay()
const date = new Date().getDate()
let month = new Date().getMonth()
const year = new Date().getFullYear()

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//score
let score = localStorage.getItem("trainings-score")
let warmUpScore = localStorage.getItem("warmUpScore")
let kraftScore = localStorage.getItem("kraftScore")
let koordinationScore = localStorage.getItem("koordinationScore")
let beweglichkeitScore = localStorage.getItem("beweglichkeitScore")
let ausdauerScore = localStorage.getItem("ausdauerScore")
let coolDownScore = localStorage.getItem("coolDownScore")
//einzelne scores für übungen
//calculate date
let currentDate = weekday[day] + ": " + date + "." + (month + 1) + "." + year
dateText.innerHTML = currentDate
let currentDay = day

//audio
var ringtone = new Audio('./audio/ringtone.mp3');

//exersizes
let selectedExersize;

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

//gets data from Api 
function getExersize(exer) {
    boxes.innerHTML = ""
    exersizesList.style.display = "none"
    fetch('https://trainingsapi.herokuapp.com/' + exer).
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
        <button onclick="markFinished(${i}, '${exer}')" class="red" id="box-button${i}">DONE</button>
    </div>
        <h4 onclick="startTimer(${data[i].time + "," + "'" + data[i].title + "'"})">${data[i].time + " " + typeEx}</h4>
        <p>${data[i].description}</p>
    </div>
    `
                //scores oder so kein Plan gerade
            }
        })
}

//man muss buttons in Reihenfolge klickebn müssen
//button auf grün und score erhöhen
function markFinished(zahl, exer) {
    let boxbutton = document.getElementById("box-button" + zahl)
    boxbutton.classList.remove("red")
    boxbutton.classList.add("green")
    boxbutton.disabled = true
    console.log(exer)

    //die einzelnen scores werden erhöht in LS 
    if (exer == "warmup") {
        console.log("haja")
        warmUpScore++;
        localStorage.setItem('warmUpScore', warmUpScore)
    } else if (exer == "kraft") {
        kraftScore++;
        localStorage.setItem('kraftScore', kraftScore)
    } else if (exer == "koordination") {
        koordinationScore++;
        localStorage.setItem('koordinationScore', koordinationScore)
    } else if (exer == "beweglichkeit") {
        beweglichkeitScore++;
        localStorage.setItem('beweglichkeitScore', beweglichkeitScore)
    } else if (exer == "ausdauer") {
        ausdauerScore++;
        localStorage.setItem('ausdauerScore', ausdauerScore)
    } else if (exer == "cooldown") {
        coolDownScore++;
        localStorage.setItem('coolDownScore', coolDownScore)
    }
}