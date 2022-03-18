//HTML DOM
let main = document.querySelector("main")
let pageName = document.querySelector("header")
let line = document.querySelector(".training-selector")

if(window.navigator.onLine == false){
    document.getElementById("notification").classList.remove('invisible')
    main.classList.add('blur')
    line.classList.add('blur')
    pageName.classList.add('blur')
}

function removeNotification(){
    main.classList.remove('blur')
    line.classList.remove('blur')
    pageName.classList.remove('blur')
    document.getElementById("notification").classList.add('invisible')
    timerStarted = false
        body.style.overflow = ""
        ringtone.pause();
        ringtone.currentTime = 0;
        funcCounter++
        return
}
