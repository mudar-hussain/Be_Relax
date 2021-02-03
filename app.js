let waves = document.querySelector("#waves");
let forest = document.querySelector("#forest");
let rain = document.querySelector("#rain");
let park = document.querySelector("#park");
let stream = document.querySelector("#stream");
var song = document.querySelector(".song");

waves.addEventListener("click", () => {
  document.body.style.backgroundImage = "url('img/waves.jpg')";
  song.src = "./audio/waves.mp3";
});
forest.addEventListener("click", () => {
  document.body.style.backgroundImage = "url('img/forest.jpg')";
  song.src = "./audio/forest.mp3";
});

rain.addEventListener("click", () => {
  document.body.style.backgroundImage = "url('img/rain.jpg')";
  song.src = "./audio/rain.mp3";
});
park.addEventListener("click", () => {
  document.body.style.backgroundImage = "url('img/park.jpg')";
  song.src = "./audio/park.mp3";
});
stream.addEventListener("click", () => {
  document.body.style.backgroundImage = "url('img/stream.jpg')";
  song.src = "./audio/stream.mp3";
});

const app = () => {
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");

  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  //Select Sound
  const timeSelect = document.querySelectorAll(".time button");
  //Get the Length of the outline
  const outlineLength = outline.getTotalLength();

  //Duration
  let fakeDuration = 300;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Select Duration
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} : ${
        Math.floor(fakeDuration % 60) < 10
          ? "0" + Math.floor(fakeDuration % 60)
          : Math.floor(fakeDuration % 60)
      }`;
    });
  });

  //create function to play specific play and pause the SoundsBackground
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      play.src = "./svg/play.svg";
    }
  };

  //We can animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the text
    timeDisplay.textContent = `${minutes + " "} : ${" " + seconds}`;
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
    }
  };
};

app();
