var cards = document.querySelectorAll(".card");
var hasFlippedCard = false;
var firstCard, secondCard;
var lockBoard = false;
var placar = document.querySelector(".placar-pt");
var soma = 0;
var reinicio = document.querySelector(".button");

function flipCard() {
    if(lockBoard) return;
    this.classList.add("flip");

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        soma += 10;
        placar.innerHTML = `${soma} pontos`;
        return
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();

}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    },1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })

})();

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
})

function embaralha() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
}

reinicio.addEventListener("click", function() {
    cards.forEach((card) => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
        
    })

    placar.innerHTML = "0";
    soma = 0;
    setTimeout(() => {
        embaralha();
    },1000);
    
})