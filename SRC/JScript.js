const cardContainer = document.querySelector('.container');
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const pickedCards = [...letters, ...letters];
const numCards = pickedCards.length;

let revealedCards = 0;
let activeCard = null;
let clockBoard = false;

function createCard(letter) {
    const containerChild = document.createElement('div');
    containerChild.classList.add('card');
    containerChild.setAttribute('data-letter', letter);
    containerChild.setAttribute('data-matched', 'false');

    containerChild.addEventListener('click', () => {
        if (clockBoard || containerChild.getAttribute('data-matched') === 'true' || containerChild === activeCard) {
            return;
        }

        containerChild.innerText = letter;

        if (!activeCard) {
            activeCard = containerChild;
            return;
        }

        if (activeCard.getAttribute('data-letter') === letter) {
            activeCard.setAttribute('data-matched', 'true');
            containerChild.setAttribute('data-matched', 'true');
            activeCard = null;
            revealedCards += 2;

        if (revealedCards === numCards) {
            setTimeout(() => 
                alert('You win the game!')
            , 500);
        }
        } else {
            clockBoard = true;
            setTimeout(() => {
            activeCard.innerText = '';
            containerChild.innerText = '';
            activeCard = null;
            clockBoard = false;
        }, 1000);
        }
    });

    return containerChild;
}

for (let i = 0; i < numCards; i++) {
    const randomIndex = Math.floor(Math.random() * pickedCards.length);
    const letter = pickedCards[randomIndex];
    const card = createCard(letter);

    pickedCards.splice(randomIndex, 1);
    cardContainer.appendChild(card);
}
