const navToggle = document.getElementById("navigation-toggle");
const navbar = document.querySelector("nav .navbar");

const showNavbar = () => {
  navbar.classList.toggle("show");
};

navToggle.addEventListener("change", () => {
  showNavbar();
});

const songsContent = document.getElementById("all-songs");

const mainPlay = document.getElementById("main-play");

let audioElem = new Audio();
let state = "pause";
let audioFile = "";
let lastID = "";

const playMusic = (fileLoc, elemID) => {
  if (audioFile != fileLoc) {
    audioFile = fileLoc;
    audioElem.src = audioFile;
    audioElem.play();
    try {
      changeButtonPlay(lastID, "pause", "play");
    } catch {}
    lastID = elemID;
    changeButtonPlay(elemID, "play", "pause");
    state = "play";
    changeMainPlayButton();
    return;
  }
  if (state == "pause") {
    audioElem.play();
    changeButtonPlay(elemID, "play", "pause");
    state = "play";
  } else {
    audioElem.pause();
    changeButtonPlay(elemID, "pause", "play");
    state = "pause";
  }
  changeMainPlayButton();
};

const changeButtonPlay = (elemID, toRemove, toAdd) => {
  document.getElementById(elemID).className = document
    .getElementById(elemID)
    .className.replace(toRemove, toAdd);
};

const changeMainPlayButton = () => {
  state == "play"
    ? changeButtonPlay("main-play", "play", "pause")
    : changeButtonPlay("main-play", "pause", "play");
};

mainPlay.addEventListener("click", () => playMusic(audioFile, lastID));

data.forEach((element) => {
  audioElem.src = element["file-location"];
  let songItemHTML = `<div class="song-item" data-audio="${element["file-location"]}">
        <div class="play-pause"><i class="fa-solid fa-play" id="${element["file-location"]}" onclick="playMusic(this.parentElement.parentElement.dataset.audio, this.id)"></i></div>
        <figure class="song-cover">
            <img src="${element.cover}" alt="song-id-1">
        </figure>
        <span class="song-name">${element["song-name"]}</span>
        <span class="song-time">${element.time}</span>
    </div>`;
  songsContent.innerHTML += songItemHTML;
});

document.getElementById(data[0]["file-location"]).click()
document.getElementById(data[0]["file-location"]).click()