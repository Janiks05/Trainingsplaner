let warmup_score = document.getElementById("warmup_score")
let kraft_score = document.getElementById("kraft_score")
let koordination_score = document.getElementById("koordination_score")
let beweglichkeit_score = document.getElementById("beweglichkeit_score")
let ausdauer_score = document.getElementById("ausdauer_score")
let cooldown_score = document.getElementById("cooldown_score")

setInterval(checkScore, 100)

function checkScore(){
    warmup_score.innerHTML = localStorage.getItem("warmUpScore")
kraft_score.innerHTML = localStorage.getItem("kraftScore")
koordination_score.innerHTML = localStorage.getItem("koordinationScore")
beweglichkeit_score.innerHTML = localStorage.getItem("beweglichkeitScore")
ausdauer_score.innerHTML = localStorage.getItem("ausdauerScore")
cooldown_score.innerHTML = localStorage.getItem("coolDownScore")
}


