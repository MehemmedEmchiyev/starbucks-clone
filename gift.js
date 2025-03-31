let dataArr = []
async function getData(){
    let res = await fetch("https://raw.githubusercontent.com/IbrahimHasanzada/StarbucksGiftCard_json/main/starbucksGiftCard.json")
    let data = await res.json()
    getCard(data)
    getGiftCard(data)
    dataArr = data
}
getData()
const swiperWrapper = document.getElementById("swiperWrapper")
function getCard(arg){
    let featured = arg.data.gift.categories.find(item => item.urn == "featured");
    let kod = ""
    featured.eGifts.map(item => kod += 
        `
        <div class="swiper-slide !flex !items-center justify-center !w-[300px] !h-[230px]">
            <img class="cursor-pointer w-full h-[200px] !relative !z-100 rounded-2xl duration-500 hover:translate-y-[-10px]"  src="${item.largeImageUrl}" alt="">
        </div>
        `
    )
    
    swiperWrapper.innerHTML = kod
}
const giftCards = document.getElementById("giftCards")
function getGiftCard(arg){
    let newArr = arg.data.gift.categories.filter(item => item.urn != "featured")
    giftCards.innerHTML = newArr.map(item => 
        `
        <div>
            <h2 class="uppercase fontBold font-extrabold text-[13px] py-6">${item.name}</h2>
            <div class="grid gap-x-3 gap-y-5 grid-cols-2 py-3 md:grid-cols-4 !w-full ">
                ${item.eGifts.map(elm => `<img class="cursor-pointer  w-[300px] h-[150px] md:h-[200px] !relative  rounded-2xl duration-500 hover:translate-y-[-10px]"  src="${elm.largeImageUrl}" alt="">`).join("")}
            </div>       
        </div>
        `
    ).join("")   
}
const main = document.querySelector("main")
function showAllCard(){
    let featured = dataArr.data.gift.categories.find(item => item.urn == "featured");
    let kod = ""
    main.innerHTML = 
    `
    <div class="px-4 w-full lg:w-[80%] m-auto">
        <h1 class="text-[34px] font-bold boldFont  pt-4 pb-2">Gift cards</h1>
        <div class="py-4">
            <div class="flex items-center justify-between py-3">
            <h2 class="font-bold uppercase SoDoSans-Bold text-[14px] tracking-[2px]">Featured</h2>
        </div>
        </div>
    </div>   
    <div id="container" class="px-4 w-full lg:w-[80%] m-auto grid gap-x-3 gap-y-5 grid-cols-2 py-3 md:grid-cols-4"></div>             
    `
    const container = document.getElementById("container")
    featured.eGifts.map(item => kod += `<img class="cursor-pointer w-full max-h-[200px] !relative !z-100 rounded-2xl duration-500 hover:translate-y-[-10px]"  src="${item.largeImageUrl}" alt=""/>`)
    container.innerHTML = kod
}
var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
});
