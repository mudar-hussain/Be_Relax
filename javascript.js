const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    //Select Sound
    const timeSelect = document.querySelectorAll('.time-select button')

    //Get the Length of the outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 1800;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });


    //create function to play specific play and pause the sounds
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            play.src = './img/pause.jpg';
        } else {
            song.pause();
            play.src = './img/play.jpg';
        }
    
    };

    //We can animate the circle

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration  - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress; 
    }


};

app();