let dataArr = []
let obj = {}
let text = ''
let sizeStatue = false 
let basketArr = JSON.parse(localStorage.getItem("basket")) || []
let elem = new URLSearchParams(location.search)
let id = elem.get("id") 
let cat = elem.get("type")
fetch("https://raw.githubusercontent.com/zahid022/json/main/starbucks.json")
     .then(res => res.json())
     .then(data => {
        dataArr = data
        getItem()
     }
    )
const breadCrumb = document.getElementById("breadCrumb")
let rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min
let newArr = []
function getItem(){
    const elements = document.getElementById("elements")
    dataArr.map(item => item.children.map(chl => chl.children.map(prd => prd.products.map(i => newArr.push(i)))))
    let newObj = newArr.find(item => item.productNumber == id)
    obj = newObj
    obj.id = id
    breadCrumb.innerHTML  = `<a href="menu.htm">Menu</a> / ${cat}  <span class="text-black">/ ${newObj.name}</span>`
    
    elements.innerHTML = 
    `
    <div class=" py-4 w-full">
            <img class="w-[300px] mx-auto h-[300px] object-cover rounded-full" src="${newObj.assets.masterImage.uri}" alt="">
        </div>
        <div class="w-full">
            <div class="text-center md:text-start md:ml-22">
                <h1 class="pb-4 text-[32px] font-bold text-white md:text-[36px]">${newObj.name}</h1>
                <span class="text-[24px] text-[#B7C4C2]">${newObj.formCode == "Whole-Bean" ? "" : `${rnd(10,1000)} Calories`}</span>
            </div>
    </div>
    `
}
const basket = document.getElementById("basket")
function openBasket(){basket.style.display = "block"}
const closeBasket = () => {basket.style.display = "none"}
const count = document.getElementById("count")
const prCase = document.getElementById("prCase")
const notification = document.getElementById("notification")
const timer = document.getElementById("timer")
const btn = document.getElementById("btn")
let bigObject = {
    width:100,
    start:function(){
        this.width = 100
        timer.style.width = this.width + "%"
        btn.disabled = true
        this.interval = setInterval(() => {
            this.width -= 1;            
            timer.style.width = this.width + "%"; 
            if (this.width <= 0) this.clear();
        }, 75);
    },
    clear:function(){
        notification.style.right = "-100%"
        btn.disabled = false 
        clearInterval(this.interval)
        this.width = 100
    } 
}
function addBasket(arg){
    bigObject.start()
    sizeStatue ? bigObject.clear() : notification.style.right = "8%"
    newObj = {...obj,size:text}
    arg ? basketArr.push(basketArr[arg]) : sizeStatue ? basketArr.push(newObj) : ""    
    localStorage.setItem("basket",JSON.stringify(basketArr))
    renderBasket()
}   
renderBasket()
function renderBasket(){
    let kod = ''
    basketArr.length ? basketArr.map((item,index) => 
        kod += 
        `
            <div class="basketItems duration-500 w-full md:w-[70%] mx-auto  bg-white rounded-2xl border-1 border-gray-300">
                <div class="flex flex-col md:flex-row items-center md:items-start justify-start  px-3 py-4">
                    <div class="w-full md:w-[30%] ">
                        <img class="mx-auto w-[100px] h-[100px] object-contain !rounded-full" src="${item.assets.masterImage.uri}" alt="">
                    </div>
                    <div class="flex flex-col items-center md:items-start">
                        <h3 class="text-[24px] !w-[50%] pb-4 text-center md:text-start">${item.name}</h3>
                        <p class="text-center md:text-start">${item.size}</p>
                        <div class="py-4 flex items-center gap-6">
                            <i onclick="addBasket('${index}')" class="text-xl text-[#6B6B6B] fa-solid fa-plus"></i>
                            <i onclick="deletBasket('${index}')" class="text-xl text-[#6B6B6B] fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    ) : kod = `<div class="text-[24px] font-bold flex items-center justify-center h-full" >Basket is Empty</div>`
    prCase.innerHTML = kod
    count.innerHTML = basketArr.length
}
function deletBasket(index){
    const basketItems = document.querySelectorAll(".basketItems")
    let item = basketItems[index]
    console.log(item);
    if(item){
        item.style.opacity = 0
        item.style.transform = "scale(0.5)"
    }
    setTimeout(()=>{
        basketArr.splice(index,1)
        localStorage.setItem("basket",JSON.stringify(basketArr))
        renderBasket()
    },1000)
}
function selectCup(selected) {  
    sizeStatue = true
    bigObject.clear()
    text = selected.querySelector("text").textContent
    document.querySelectorAll('.cup-group').forEach(cup => {
        cup.querySelector('.cup').classList.remove('active');
        cup.querySelector('.background').classList.remove('active');
    });
    selected.querySelector('.cup').classList.add('active');
    selected.querySelector('.background').classList.add('active');
}