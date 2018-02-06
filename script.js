$(document).ready(function(){
    $("#music").click(function(){
        togglePlay();
        $('.fa-volume-up').toggleClass('fas fa-volume-off');
        $('.fa-volume-off').toggleClass('fas fa-volume-up');
    });
});

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