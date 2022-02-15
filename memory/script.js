const cards = document.querySelectorAll(".card");

let matchedCard = 0; //used to unflip tiles when all tiles have been matched
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.target; //getting user clicked card
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            //return the cardOne value to clickedCards
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src;
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) { //if two cards are matched
        matchedCard++; //increment matchedCard by 1
        if (matchedCard == 8) {
            //8*2=16 tiles in total
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //Setting both card values to blank
        return disableDeck = false;

    }
    //If selected cards dont match
    setTimeout(() => {
        //Adding shake class to cards after 400ms;
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        //Remove shake and flip class from selected cards after 1.2 seconds;
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    //create an array of 16 items and each item is repeated 
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);//sort the array items randomly

    //remove flip class from tiles  and passing random image into each card
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    })
}

shuffleCard();

cards.forEach(card => { // adding click event to all cards
    card.addEventListener("click", flipCard);
});