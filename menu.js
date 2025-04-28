let dataArr = []
let statue = false
let cat = ''
let loadStatue = true
const load = document.getElementById("load")
const getLoader = () =>  loadStatue ? getFetch() : load.style.display = "none" 
getLoader()
function getFetch(){
    fetch("https://raw.githubusercontent.com/zahid022/json/main/starbucks.json")
     .then(res => res.json())
     .then(data => {
         dataArr = data
         generateCategory()
         generateProduct(data)   
         if(dataArr.length) {
            loadStatue = false
            getLoader()
         }
    })
}
getFetch()
const category = document.getElementById("category")
const bigCategory = document.getElementById("bigCategory")
function generateCategory(){
    category.innerHTML = dataArr.map(item => 
        `
        <div class="flex flex-col">
            <h2 class="text-[19px] font-bold pb-5 pt-5">${item.name}</h2>
            <div class="pro-${item.name} flex flex-col gap-[1.4rem]">
                ${item.children.map(elem => `<p onclick = "getElement('${elem.name}')" class="text-[#6B6B6B]  cursor-pointer">${elem.name}</p>`).join("")}
            </div>
        </div>    
        `
    ).join("")
}
function generateProduct(arg){
    let  arr = []
    let  k = 1
    
    let rndArr = ["https://globalassets.starbucks.com/digitalassets/products/merch/11148665PLSTCCLDCUP16OZ.jpg",
                 "https://globalassets.starbucks.com/digitalassets/products/at-home/SBX20190715_ViaInstantSweetenedIcedCoffee.jpg",
                 "https://globalassets.starbucks.com/digitalassets/products/at-home/ReserveColombiaNarinoGranosDeEsperanzaUSWBReserve.jpg"]
        bigCategory.innerHTML = statue ? arg.map(item =>     
            `
            <div  class="w-full pb-10">
                <h2 class="pb-4 text-[24px] boldFont">${item.name}</h2>
                <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-12 pt-7 border-t-1 border-[#DBD9D7]">
                    ${
                        
                        item.products.map(prd => {
                        arr = prd.assets.masterImage.uri 
                        k = k >= 0 ? Math.trunc(Math.random()*3 ) : k - 1
                        return `
                        <div class="flex flex-col justify-start items-center gap-2.5 ">
                            <div class="w-[100px] h-[100px] md:w-[115px] md:h-[115px]">
                                <a href="product.htm?id=${prd.productNumber}&type=${cat}"><img src="${arr}" class="w-full h-full rounded-full " alt=""></a> 
                            </div>
                            <h2 class="text-center text-[19px] font-normal">${prd.name}</h2>
                        </div>
                        `
                    }).join("")}
                </div>
            </div>
            `
        ).join("") : 
        arg.map(item => 
            `
            <div class="w-full pb-10">
                <h2 class="pb-4 text-[24px] boldFont">${item.name}</h2>
                <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 pt-7 border-t-1 border-[#DBD9D7]">
                    ${
                        item.children.map(prd => {
                        arr = prd.children.map(img => img.products[0].assets.masterImage.uri);  
                        k = k >= 0 ? Math.trunc(Math.random()*3 ) : k - 1
                        return `
                        <div onclick = "getElement('${prd.name}')" class="flex items-center gap-2.5 cursor-pointer">
                            <div class="w-[100px] h-[100px] md:w-[115px] md:h-[115px]">
                                <img src="${arr.length > 0 ? arr[0] : rndArr[k]}" class="w-full h-full rounded-full object-cover" alt="">
                            </div>
                            <h2 class="text-[19px] font-normal ">${prd.name}</h2>
                        </div>
                        `
                    }).join("")}
                </div>
            </div>
            `
        ).join("")
            
}
function getElement(elemName){
    cat = elemName
    statue = true
    const bred = document.getElementById("bred")
    const headTag = document.getElementById("headTag")
    bred.innerHTML = `<a href="menu.htm">Menu</a> / <span class="text-[#6B6B6B] font-bold pl-1">${elemName}</span>`
    headTag.innerHTML = elemName
    let newArr = dataArr.map(item => item.children.find(elm => elm.name == elemName))
    let obj = newArr.find(item => item != undefined)
    generateProduct(obj.children)
}
