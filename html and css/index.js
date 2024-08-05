const songList = [
    {
        name: "BRAZILIAN DANCA PHONK",
        artist: "Some Brazilian",
        src: "assets/BRAZILIAN DANÇA PHONK.mp3",
        cover: "brazilian danca phonk.png",
    },
    {
        mame: "TUCA DONKA",
        artist: "HAKARI",
        src: "assets/CURSEDEVIL, DJ FKU, Skorde - TUCA DONKA [Brazilian Phonk].mp3",
        cover: "tuca donka.png",
    },
    {
        name: "LOUCA ENCUBADA",
        artist: "LOUCA",
        src: "assets/LOUCA ENCUBADA (Brazilian Funk  Phonk) DJ SAMIR, RODRECCI.mp3",
        cover: "louca encubada.png",
    },
    {
        name:"MANGO MANGOS PHONK",
        artist:"MANGOS MAN",
        src:"assets/MANGOS MANGOS PHONK.mp3",
        cover:"MANGOS MANGOS.png",
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songList[index];
    console.log(`Loading cover image from: assets/${thumb}`);
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url('assets/${thumb}')`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;
        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds /60);
    const secs = Math.floor(seconds % 60);
    return`${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playmusic();
}

function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    playmusic();
}

function playmusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}