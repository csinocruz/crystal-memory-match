$(document).ready(function(){
    $('#music').click(function(){
        togglePlay();
        $('.fa-volume-up').toggleClass('fas fa-volume-off');
        $('.fa-volume-off').toggleClass('fas fa-volume-up');
    });
    initializeApp();
    $('.stats-container button').click(function() {
        console.log('reset button clicked');
    })
});

// global variables
var first_card_clicked = null;
var second_card_clicked = null;
match_counter = 0;
total_matches_counter = 0; 
attempts = 0;
accuracy = 0;
gamesPlayed = 0;

// music toggle
var audio = new Audio('/Users/francescasinocruz/Desktop/LFZ/crystal-memory-match/assets/sounds/soundscape.mp3');
audio.loop = true;
audio.play();

var isPlaying = true;

function togglePlay() {
    if (isPlaying) {
        audio.pause()
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
};

// app initiation
function initializeApp() {
    // var readyDeck = shuffleDeck(deck);
    // createCards(readyDeck);
    $('.card').click(clickHandler);
};

function clickHandler() {
    console.log('user clicked on a card');
    var the_card = $(this);
    the_card.addClass('spin');
    setTimeout(function () {
        the_card.toggleClass('reveal');
    }, 500);

    // check whether it is first or second card clicked
    if (first_card_clicked === null) {
        first_card_clicked = $(this);
    } else {
        second_card_clicked = $(this);

        // check for match
        if (first_card_clicked.find('img').attr('src') === second_card_clicked.find('img').attr('src')) {
            var sparkle = new Audio('/Users/francescasinocruz/Desktop/LFZ/crystal-memory-match/assets/sounds/twinkle.mp3');
            sparkle.volume = 0.2;
            sparkle.play();
            setTimeout(function () {
                sparkle.pause();
            }, 4600);
            console.log('we have matching cards');
            setTimeout(function() {
                first_card_clicked.css({
                    'opacity': '0'
                });
                $(first_card_clicked).toggleClass('spin');
                first_card_clicked = null;
            }, 1100);
            setTimeout(function() {
                second_card_clicked.css({
                    'opacity': '0'
                });
                $(second_card_clicked).toggleClass('spin');
                second_card_clicked = null;
            }, 1100);
            match_counter++;
            total_matches_counter++;
        } else {
            console.log('cards are not a match');
            // handles for the first card
            setTimeout(function() {
                first_card_clicked.removeClass('spin');
                can_click = true;
            }, 1000);
            setTimeout(function () {
                first_card_clicked.addClass('spin');
            }, 1500);
            setTimeout(function () {
                first_card_clicked.toggleClass('reveal');
            }, 2000);
            setTimeout(function () {
                first_card_clicked.removeClass('spin');
                first_card_clicked = null;
            }, 2500);

            // handles for the second card
            setTimeout(function() {
                second_card_clicked.removeClass('spin');
                can_click = true;
            }, 1000);
            setTimeout(function () {
                second_card_clicked.addClass('spin');
            }, 1500);
            setTimeout(function () {
                second_card_clicked.toggleClass('reveal');
            }, 2000);
            setTimeout(function () {
                second_card_clicked.removeClass('spin');
                second_card_clicked = null;
            }, 2500);
        }
    }
};
// ***** end of function clickHandler *****

// card images
var deck = [
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

// pick 8 random cards
function pickRandomCards() {
    for (i=0; i<8; i++) {
        var randomNum = Math.floor(Math.random() * deck.length);
        console.log(deck[randomNum]);
    }
    
};

// shuffle cards
function shuffle(shuffledDeck) {
    console.log('shuffle deck of cards function has been called');
    var j, x, i;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = deck[i];
        deck[i] = deck[j];
        deck[j] = x;
    }
    // return shuffledDeck;
    createCards(shuffledDeck);
};

// append cards to DOM
function createCards(cards) {
    console.log('create cards function has been called');
    console.log(cards);
};
// ***** end of function createCards *****