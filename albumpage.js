const loadAlbum = (albumId) => {
	fetch(
		`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`,
		{
			method: "GET",
		}
	)
		.then((response) => response.json())
		.then((album) => {
			displayAlbum(album)
			console.log(album)
		})

		.catch((err) => {
			console.error(err)
		})
}

const displayAlbum = (album) => {
	console.log(album)
	let albumNameNode = document.getElementById("album-artist-name")
	albumNameNode.innerText = album.title
	let albumImageNode = document.getElementById("album-image-cover")
	albumImageNode.src = album.cover_xl
	loadSongs(album.title)
}

const loadSongs = (albumName) => {
	fetch(
		`https://striveschool-api.herokuapp.com/api/deezer/search?q=${albumName}`,
		{
			method: "GET",
		}
	)
		.then((response) => response.json())
		.then((response) => {
			displaySongs(response.data)
		})

		.catch((err) => {
			console.error(err)
		})
}


const displaySongs = (songs) => {
	let artistSongsNode = document.getElementById("album-artist-songs")
	songs.forEach((song, index) => {
		let trNode = document.createElement("tr")
		trNode.classList.add("tr-popular")
		trNode.innerHTML = `<td><span class="track-number album-track-number">${index + 1}</span>                           
							  <span class="oi oi-audio-spectrum d-none"></span>
							  <img class="mx-3" src="${song.album.cover_small}" class="table-image">
							  <span class="mx-4">${song.title}</span>                   
							  </td> 
							  <td class="mr-0 pr-0" id="song-rank">${song.rank}</td>
							<td class="muted-text ml-0 pl-0">${song.duration}</td>`
		artistSongsNode.appendChild(trNode)
	})

	playingNow()
}



const onSongPlayed = function (eventData) {
	let currentTrNode = document.querySelector("tr.current-song")
	if (currentTrNode != null) {
		toggleTrackSelection(currentTrNode)
	}

	toggleTrackSelection(eventData.currentTarget)
}

const toggleTrackSelection = function (tr) {
	tr.classList.toggle("current-song")
	let tdNodes = tr.getElementsByTagName("td")
	let firstTd = tdNodes[0]
	firstTd.classList.toggle("played-track")
	let iconNode = firstTd.querySelector("span.oi")
	iconNode.classList.toggle("d-none")
	let trackNumberNode = firstTd.querySelector("span.track-number")
	trackNumberNode.classList.toggle("d-none")
	tdNodes[2].classList.toggle("played-track")
}

const playingNow = function () {
	let trNodes = document.getElementsByClassName("tr-popular")
	for (let trNode of trNodes) {
		trNode.addEventListener("click", onSongPlayed)
	}
}

const setUpPlayButton = function () {
	let ppNode = document.querySelector("div.pause-btn")
	ppNode.addEventListener("click", togglePlay)
}

const togglePlay = function () {
	let btnNodes = document.getElementsByClassName("pause-icon")
	for (let btnNode of btnNodes) {
		btnNode.classList.toggle("d-none")
	}
}

window.onload = () => {
	const urlParams = new URLSearchParams(window.location.search)
	const albumId = urlParams.get("id")
	loadAlbum(albumId)
	setUpPlayButton()
}







/*

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['drums', 'guitar', 'piano'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `playercovers/${song}.jpg`;
}



// Play song
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.play-pause').classList.remove('bi-play-circle-fill');
	playBtn.querySelector('i.play-pause').classList.add('bi-pause-circle-fill');

	audio.play();
}

// Pause song
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.play-pause').classList.add('bi-play-circle-fill');
	playBtn.querySelector('i.play-pause').classList.remove('bi-pause-circle-fill');

	audio.pause();
}

// Previous song
function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);

	playSong();
}

// Next song
function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);

	playSong();
}

// Update progress bar
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
	const width = document.getElementById("progressbar").clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
	const { duration, currentTime } = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime == null) ? 0 :
		Math.floor(currentTime / 60);
	min = min < 10 ? '0' + min : min;

	// define seconds currentTime
	function get_sec(x) {
		if (Math.floor(x) >= 60) {

			for (var i = 1; i <= 60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					sec = Math.floor(x) - (60 * i);
					sec = sec < 10 ? '0' + sec : sec;
				}
			}
		} else {
			sec = Math.floor(x);
			sec = sec < 10 ? '0' + sec : sec;
		}
	}

	get_sec(currentTime, sec);

	// change currentTime DOM
	currTime.innerHTML = min + ':' + sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true) ? '0' :
		Math.floor(duration / 60);
	min_d = min_d < 10 ? '0' + min_d : min_d;


	function get_sec_d(x) {
		if (Math.floor(x) >= 60) {

			for (var i = 1; i <= 60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					sec_d = Math.floor(x) - (60 * i);
					sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
				}
			}
		} else {
			sec_d = (isNaN(duration) === true) ? '0' :
				Math.floor(x);
			sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
		}
	}

	// define seconds duration

	get_sec_d(duration);

	// change duration DOM
	durTime.innerHTML = min_d + ':' + sec_d;

};


// Event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);

*/