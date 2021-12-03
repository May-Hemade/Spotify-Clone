const loadArtist = (artistId) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((artist) => {
      displayArtist(artist)
    })

    .catch((err) => {
      console.error(err)
    })
}

const displayArtist = (artist) => {
  console.log(artist)
  let artistNameNode = document.getElementById("artist-name")
  artistNameNode.innerText = artist.name
  let artistImageNode = document.getElementById("artist-image")
  artistImageNode.src = artist.picture_xl
  loadSongs(artist.name)
}

const loadSongs = (artistName) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`,
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
  let artistSongsNode = document.getElementById("artist-songs")
  songs.forEach((song, index) => {
    let trNode = document.createElement("tr")
    trNode.classList.add("tr-popular")
    trNode.innerHTML = `<td><span class="track-number">${index + 1}</span><span
          class="oi oi-audio-spectrum d-none"></span></td>
  <td style="width: 150px"><img src="${
    song.album.cover_small
  }" class="table-image"></td>
  <td class="muted-text">${song.title}
  </td>
  <td class="muted-text">${song.rank}</td>
  <td class="muted-text">${song.duration}</td>`
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
  const artistId = urlParams.get("id")
  loadArtist(artistId)
  setUpPlayButton()
}
