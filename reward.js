const products = [
    {
        heading: 'Customize your drink',
        text : 'Make your drink just right with an extra espresso shot, nondairy milk or a dash of your favorite syrup.',
        img: 'https://www.starbucks.com/weblx/images/rewards/reward-tiers/25.png'
    },
    {
        heading: 'Brewed hot or iced coffee or tea, bakery item, packaged snack and more',
        text : 'Treat yourself to an iced coffee, buttery croissant, bag of chips and more.',
        img: 'https://www.starbucks.com/weblx/images/rewards/reward-tiers/100.png'
    },
    {
        heading: 'Handcrafted drink (Cold Brew, lattes and more) or hot breakfast',
        text : 'Turn good mornings great with a delicious handcrafted drink of your choice, breakfast sandwich or oatmeal on us.',
        img: 'https://www.starbucks.com/weblx/images/rewards/reward-tiers/200.png'
    },
    {
        heading: 'Sandwich, protein box or at-home coffee',
        text : 'Enjoy a PM pick-me-up with a lunch sandwich, protein box or a bag of coffee—including Starbucks VIA Instant®.',
        img: 'https://www.starbucks.com/weblx/images/rewards/reward-tiers/300.png'
    },
    {
        heading: 'Select Starbucks® merchandise',
        text : 'Take home a signature cup, drink tumbler or your choice of coffee merch up to $20.',
        img: 'https://www.starbucks.com/weblx/images/rewards/reward-tiers/400.png'
    },
]
const li = document.querySelectorAll("#ul li")
const kart = document.getElementById("kart")
li.forEach((item,index) => {
    item.onclick = function(){
        li.forEach(item => item.classList.remove("specialBorder"))
        item.classList.add("specialBorder")
        kart.innerHTML = 
        `
            <div  class=" w-full sm:max-w-[375px]">
                <img id="animation" class="scale-50 opacity-50 duration-500 " src="${products[index].img}" alt="">
            </div>
            <div class="w-full md:w-[30%]">
                <h2 class="text-center md:text-start text-[24px] font-bold pb-4">${products[index].heading}</h2>
                <p class="text-center md:text-start">${products[index].text}</p>
            </div>
        `
        let img = document.getElementById("animation")
        
        setTimeout(() => {
            img.classList.add("!scale-100")
            img.classList.add("!opacity-100")
        }, 300);

    }
    
})


