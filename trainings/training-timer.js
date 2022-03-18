let not_headline = document.getElementById("not-headline")
let off = document.getElementById("off")
let caption = document.getElementById("caption")
let not_text = document.getElementById("not-text")

let body = document.querySelector("body")

let selectedTime;
let currentTime;
let timerStarted = false
let exersize;

let funcCounter = 0

let timerNot = document.getElementById("notification")

function startTimer(time, exer){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(timerStarted == false){
        timerStarted = true
    selectedTime = time * 60
    exersize = exer
    const intervall = setInterval(timer, 1000)
    if(funcCounter != 0){
        clearInterval(intervall)
    }
    }
    return
}
function timer() {
    if(timerStarted == true){
        selectedTime--
        body.style.overflow = "hidden"
        currentTime = selectedTime
        off.innerHTML = selectedTime + 1
        caption.innerHTML = 'Deine Übung:' + " " + exersize
        not_text.innerHTML = 'Eine richtige Ausführung der Übung ist wichtiger als die Zeit, also lass dich nicht ablenken!'
        document.getElementById("notification").classList.remove('invisible')
        main.classList.add('blur')
        line.classList.add('blur')
        pageName.classList.add('blur')
    }
    if(selectedTime < 0){
        timerStarted = false
        body.style.overflow = ""

        funcCounter++
        return
    }
    if(selectedTime == 0){
        ringtone.play();
    }
}