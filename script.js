let player = {
    name: "",
    chips: 0
};

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let startButton = document.getElementById("start-button")
let newCardButton = document.getElementById("new-card-button")
let restartButton = document.getElementById("restart-button")

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    let name = prompt("Enter your name:")
    if (name === null || name === "") {
        return
    }

    let chips = prompt("Enter the number of chips:")
    if (chips === null || isNaN(chips)) {
        return
    }

    player.name = name
    player.chips = parseInt(chips)
    isAlive = true
    playerEl.textContent = player.name + ": $" + player.chips
    startButton.style.display = "none"
    newCardButton.style.display = "inline"
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function restartGame() {
    startButton.style.display = "inline"
    newCardButton.style.display = "none"
    restartButton.style.display = "none"
    player.name = ""
    player.chips = 0
    playerEl.textContent = ""
    messageEl.textContent = "Want to play a round?"
    cardsEl.textContent = "Cards:"
    sumEl.textContent = "Sum:"
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 100;
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        message = "You're out of the game!"
        isAlive = false
        restartButton.style.display = "inline"
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}
