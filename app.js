const bars = document.getElementById("bars")
const hamburgerMenu = document.getElementById("hamburgerMenu")
const nestMenu = document.getElementById("nestMenu")
let k = 0
bars.onclick = function(){
    k++
    k%2 ? hamburgerMenu.style.right = "0%"  : hamburgerMenu.style.right = "-100%"
    k%2 ? nestMenu.style.right = "0%" : nestMenu.style.right = "-80%"
}
const ulList = document.querySelectorAll(".ul-list")
const arrowIcon = document.querySelectorAll(".arrowIcon")
function accardion(){
    for(let i in arrowIcon){
        arrowIcon[i].onclick = function(){
            arrowIcon[i].classList.toggle("rotate-[180deg]")
            ulList[i].classList.toggle("!block")
        }
    }
}   
accardion()