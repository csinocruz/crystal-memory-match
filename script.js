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
}

// app initiation
function initializeApp() {
    $('.card').click(clickHandler);
};

function clickHandler() {
    var the_card = $(this);
    $(the_card).addClass('spin');
    window.setTimeout(function () {
        $(the_card).toggleClass('reveal');
    }, 500);

    // check whether it is first or second card clicked
    if (first_card_clicked === null) {
        first_card_clicked = $(this);
    } else {
        second_card_clicked = $(this);
        attempts++;

        // check for match
        if (first_card_clicked.find('img').attr('src') === second_card_clicked.find('img').attr('src')) {
            match_counter++;
            total_matches_counter++;
            console.log('we have matching cards');
            // REMOVE CARDS FROM BOARD
        } else {
            // NO MATCH, FLIP CARDS BACK OVER
        }
    }


}