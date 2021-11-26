const onSongPlayed = function (eventData) {
  let currentTrNode = document.querySelector("tr.current-song")
  toggleTrackSelection(currentTrNode)

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
  playingNow()
  setUpPlayButton()
}
