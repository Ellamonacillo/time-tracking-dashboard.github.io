const container = document.getElementById('card-group')
const frequencyButtons = document.querySelectorAll('.frequency')
let currentFrequency = 'weekly'
let workout = []

// Creating cards
const appendItem = (item, frequency) => {
    const timeframe = item.timeframes[frequency]

    container.innerHTML +=
        `
            <div class="flex flex-col items-end w-full">
                <div class="flex justify-end w-full ${item.color} rounded-2xl">
                    <img src="${item.image}" alt="${item.title}" class="w-15 h-15">
                </div>
                <div class="group flex flex-col p-6 rounded-xl bg-navy900 w-full -mt-5 md:gap-5 hover:bg-navybackground">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg">${item.title}</h2>
                        <img src="./images/icon-ellipsis.svg" alt="icon-ellipsis">
                    </div>
                    <div class="flex justify-between items-center md:flex-col md:items-start gap-2 md:gap-3">
                        <h1 class="text-2xl md:text-4xl font-light">${timeframe.current}hrs</h1>
                        <h3 class="text-sm text-navytext group-hover:text-navy200">Last 
                            ${frequency === 'daily' ? 'Day' : frequency === 'weekly' ? 'Week' : 'Month'} - 
                            ${timeframe.previous}hrs
                        </h3>
                    </div>
                </div>
            </div>
        `
}

// Insert Cards
const populateDOM = (data, frequency) => {
    container.innerHTML = ''
    data.forEach(item => appendItem(item, frequency))
}

// Buttons
const handleFrequency = (e) => {
    let currentFrequency = e.target.textContent.toLowerCase()

    container.dataset.frequency = currentFrequency

    frequencyButtons.forEach(btn => {
        btn.classList.toggle('active', btn === e.target)
    })

    populateDOM(workout, currentFrequency)
}

frequencyButtons.forEach(btn => {
    btn.addEventListener('click', handleFrequency)
})


// fetch datas
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        workout = data
        populateDOM(workout, currentFrequency)
    })
    .catch(error => console.log(error))