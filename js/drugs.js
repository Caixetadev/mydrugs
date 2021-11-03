const produtos = [
    {
        image: './img/products/blue_pill.png',
        name: 'Blue Clover',
        desc: '70MG OF MDMA PER PILL',
        btc: 0.0029,
        eth: 0.1114
    },
    {
        image: './img/products/green_pill.png',
        name: 'Green Snowflake',
        desc: '70MG OF MDMA PER PILL',
        btc: 0.0045,
        eth: 0.1667
    },
    {
        image: './img/products/maria_1.png',
        name: 'Mario Super Drugs',
        desc: '70MG OF MDMA PER PILL',
        btc: 0.0021,
        eth: 0.0802
    },
    {
        image: './img/products/purple_pill.png',
        name: 'Purple Flower',
        desc: '70MG OF MDMA PER PILL',
        btc: 0.0021,
        eth: 0.0802
    },
    {
        image: './img/products/super_man_1.png',
        name: 'Super Drugs',
        desc: '70MG OF MDMA PER PILL',
        btc: 0.0021,
        eth: 0.0802
    },
    {
        image: './img/products/red_pill.png',
        name: 'Red Pill',
        desc: '70MG OF MDMA PER PILL',
        btc: 0.0013,
        eth: 0.0523
    }
]

const seila = () => {
    produtos.forEach(({image, name, desc, btc, eth}) => {
        const card = document.querySelector('.container')
        console.log(card)
        card.innerHTML += `
        <div class="card_shop">
            <img src="${image}" alt="">
            <h3>${name}</h3>
            <p>${desc}</p>
            <a href="#" class="btc">${btc} BTC</a>
            <a href="#" class="eth">${eth} ETH</a> 
        </div>
        `
    })
}

const produtos2 = [
    {
        image: './img/products/pink_pill.png',
        name: 'SMILING DEVIL',
        stars: 5,
        novo: 'New Additon',
        desc: 'meet the newest edition to our lineup of exclusive pills from our partner goodtimes. have a rasberry flavored bliss, each pill contains 130mg of mdma, and some natural flavoring. avalible starting next month.'
    },
    {
        image: './img/products/yellow_pill.png',
        name: 'CONFUSED',
        stars: 4,
        novo: 'New Additon',
        desc: 'ever wonder why ecstacy looks like candy but is never flavored? taste the citrus lemon flavored ecstacy in your mouths. each pill contains 125mg of mdma, and some natural flavoring. avalible for a limited time only for our premium members.'
    }
]

produtos2.forEach(({image, name, stars, novo, desc}) => {
    let newStars = ''
    for (let i = 0; i < stars; i++) {
        newStars += `<i class="fas fa-star"></i>` 
    }
    const section = document.querySelector('section')
    section.innerHTML += `
    
    <div class="card_shop2">
      <img src="${image}" alt="">
      <h1>${name}</h1>
      <div class="stars">
        ${newStars}
      </div>
      <p class="rgb">${novo}</p>
      <p class="card_shop2_text">${desc}</p>
    </div>
    
    `
})

seila()