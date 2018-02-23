$(document).ready(function(){
    $('#music').click(function(){
        togglePlay();
        $('.fa-volume-up').toggleClass('fas fa-volume-off');
        $('.fa-volume-off').toggleClass('fas fa-volume-up');
    });
    initializeApp();
    $('.stats-container button').click(resetGame);
});

// music toggle
var audio = new Audio('/Users/francescasinocruz/Desktop/LFZ/crystal-memory-match/assets/sounds/soundscape.mp3');
audio.loop = true;
audio.play();

var musicPlaying = true;
var modal = $('#instructionsModal');
var canClick = true;
var firstCardClicked = null;
var secondCardClicked = null;
var matchCounter = 0;
var totalMatchesCounter = 0; 
var attempts = 0;
var accuracy = 0;
var gamesPlayed = 0;
var animalImages = [
    'assets/polygon-animals/bear.jpg',
    'assets/polygon-animals/buck.jpg',
    'assets/polygon-animals/cat.jpg',
    'assets/polygon-animals/cow.jpg',
    'assets/polygon-animals/eagle.jpg',
    'assets/polygon-animals/elephant.jpg',
    'assets/polygon-animals/fawn.jpg',
    'assets/polygon-animals/fox.jpg',
    'assets/polygon-animals/gorilla.jpg',
    'assets/polygon-animals/lion.jpg',
    'assets/polygon-animals/owl.jpg',
    'assets/polygon-animals/panda.jpg',
    'assets/polygon-animals/pug.jpg',
    'assets/polygon-animals/rabbit.jpg',
    'assets/polygon-animals/tiger.jpg',
    'assets/polygon-animals/wolf.jpg',
];

function togglePlay() {
    if (musicPlaying) {
        audio.pause()
        musicPlaying = false;
    } else {
        audio.play();
        musicPlaying = true;
    }
};

function initializeApp() {
    pickRandomCards(animalImages);
    $('.card').click(clickHandler);
    $('#instructionsLink').click(clickInstructions);
    $('.close').click(closeModal);
};

function pickRandomCards(deck) {
    var cards = deck.slice();
    var count = null;
    var selectedCards = [];
    for (i=0; i<8; i++) {
        var randomNum = Math.floor(Math.random() * cards.length);
        count++;
        selectedCards.push(cards[randomNum], cards[randomNum]);
        cards.splice(randomNum, 1);
    }
    shuffle(selectedCards);
};

function shuffle(shuffledDeck) {
    var j, x, i;
    for (i = shuffledDeck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = shuffledDeck[i];
        shuffledDeck[i] = shuffledDeck[j];
        shuffledDeck[j] = x;
    }
    addCardsToDOM(shuffledDeck);
};

function addCardsToDOM(cards) {
    for (var i=0; i<cards.length; i++) {
        // creates the front of the card
        var img = $('<img />').attr('src', cards[i]);
        var front = $('<div>').addClass('front').append(img);
        
        // creates the back of the card
        var rainbow = $('<div>').addClass('rainbow');
        var back = $('<div>').addClass('back').append(rainbow);
        
        // appends the card to the game-area, DOM
        var card = $('<div>').addClass('card').append(front, back);
        $('#game-area').append(card);
    }
};

function clickHandler() {
    if (canClick) {
        var the_card = $(this);
        the_card.addClass('spin');
        setTimeout(function () {
            the_card.toggleClass('reveal');
        }, 500);

        // check whether it is first or second card clicked
        if (firstCardClicked === null) {
            firstCardClicked = $(this).off('click');
        } else {
            secondCardClicked = $(this).off('click');
            canClick = false;
            // MATCHING **********
            if (firstCardClicked.find('img').attr('src') === secondCardClicked.find('img').attr('src')) {
                var sparkle = new Audio('/Users/francescasinocruz/Desktop/LFZ/crystal-memory-match/assets/sounds/twinkle.mp3');
                sparkle.volume = 0.2;
                sparkle.play();
                // handles for the first card
                setTimeout(function () {
                    sparkle.pause();
                }, 4600);
                setTimeout(function() {
                    firstCardClicked.css({
                        'opacity': '0'
                    });
                    $(firstCardClicked).toggleClass('spin');
                    firstCardClicked = null;
                }, 1100);
                // handles for the second card
                setTimeout(function() {
                    secondCardClicked.css({
                        'opacity': '0'
                    });
                    $(secondCardClicked).toggleClass('spin');
                    secondCardClicked = null;
                    canClick = true;
                }, 1100);
                matchCounter++;
                if (matchCounter === 8) {
                    console.log('You have found all of the matching cards!');
                }
                // if user plays multiple games
                totalMatchesCounter++;
            } else { // NOT MATCHING **********
                firstCardClicked.click(clickHandler);
                secondCardClicked.click(clickHandler);

                // handles for the first card
                setTimeout(function() {
                    firstCardClicked.removeClass('spin');
                }, 1000);
                setTimeout(function () {
                    firstCardClicked.addClass('spin');
                }, 1500);
                setTimeout(function () {
                    firstCardClicked.toggleClass('reveal');
                }, 2000);
                setTimeout(function () {
                    firstCardClicked.removeClass('spin');
                    firstCardClicked = null;
                }, 2500);

                // handles for the second card
                setTimeout(function() {
                    secondCardClicked.removeClass('spin');
                }, 1000);
                setTimeout(function () {
                    secondCardClicked.addClass('spin');
                }, 1500);
                setTimeout(function () {
                    secondCardClicked.toggleClass('reveal');
                }, 2000);
                setTimeout(function () {
                    secondCardClicked.removeClass('spin');
                    secondCardClicked = null;
                    canClick = true;
                }, 2500);
            }
            attempts++;
            updateStats();
        }
    }
    // ***** end of canClick if statement
};
// ***** end of function clickHandler *****

function updateStats() {
    accuracy = parseInt(matchCounter/attempts *100);
    renderStatsToDOM();
};

function renderStatsToDOM() {
    $('.matches-val').text(matchCounter);
    $('.attempts-val').text(attempts);
    $('.accuracy-val').text(accuracy + '%');
    $('.games-played-val').text(gamesPlayed);
};

function resetGame() {
    firstCardClicked = null;
    secondCardClicked = null;
    matchCounter = 0;
    attempts = 0;
    accuracy = 0;
    $('.card').remove();
    initializeApp();
};

// ***** functions for modal *****

function clickInstructions() {
    modal.css('display', 'block');
}

function closeModal() {
    modal.css('display', 'none');
}

window.onclick = function(event) {
    if (event.target.className == 'modal') {
        modal.css('display', 'none');
    }
}