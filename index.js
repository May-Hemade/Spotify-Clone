/* <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 d-none d-lg-block">
<div class="card">
  <div class="card-image-container">
    <div class="play-btn"></div>
    <div class="ratio ratio-1x1">
      <img src="images/img7.jpg" class="card-img-top py-3 px-3 card-image-rounded" alt="..." />
    </div>
  </div>
  <div class="card-body">
    <h6 class="card-title-music">Burning Jazz-rock</h6>
    <p class="card-text truncate-2-lines">
      This is the most interesting Track eva!
    </p>
  </div>
</div>
</div> */

let recentPlayedContent = [
  {
    title: "Rock the mix",
    artist: "Spiders",
    description: "Spiders are the rockest Arachnid EVERRR",
    image: "images/img1.jpg",
  },
  {
    title: "Pop the Popsicle ",
    artist: "Candy-shop",
    description: "The candy that takes me to the dentist",
    image: "images/img2.jpg",
  },
  {
    title: "Classical Mozart",
    artist: "Mozart",
    description: "Play the day away make it happen again",
    image: "images/liked songs.jpg",
  },

  {
    title: "Burning-Jazz",
    artist: "Dizzy Gillespie ",
    description: "Jazz in the night for a new beginning to die",
    image: "images/img5.jpg",
  },
  {
    title: "Rap-around the clock",
    artist: "M&Ms ",
    description: "My Name is.. My name is.. May name is..",
    image: "images/img6.jpg",
  },
  {
    title: "Hip-Hop all around",
    artist: "Kanye East",
    description: "I need a compass",
    image: "images/img3.jpg",
  },
];

const showRecentlyPlayed = function () {
  for (let i = 0; i < recentPlayedContent.length; i++) {
    let song = recentPlayedContent[i];
    let containerNode = document.getElementById("recently-played-container");
    let colNode = document.createElement("div");
    colNode.classList.add("col-lg-2", "col-md-4", "col-sm-6", "col-xs-12");

    let cardNode = document.createElement("div");
    cardNode.classList.add("card");
    let imageContainerNode = document.createElement("div");
    imageContainerNode.classList.add("card-image-container");
    let playButtonNode = document.createElement("div");
    playButtonNode.classList.add("play-btn");
    let ratioNode = document.createElement("div");
    ratioNode.classList.add("ratio", "ratio-1x1");
    let imgNode = document.createElement("img");
    imgNode.classList.add("card-img-top", "py-3", "px-3", "card-image-rounded");
    imgNode.src = song.image;
    imgNode.alt = "track image";
    let cardBodyNode = document.createElement("div");
    cardBodyNode.classList.add("card-body");
    let cardTitleNode = document.createElement("h6");
    cardTitleNode.classList.add("card-title-music", "text-truncate");
    cardTitleNode.innerText = song.title;
    let cardPNode = document.createElement("p");
    cardPNode.classList.add("card-text", "truncate-2-lines");
    cardPNode.innerText = song.artist + " - " + song.description;

    ratioNode.appendChild(imgNode);
    imageContainerNode.appendChild(playButtonNode);
    imageContainerNode.appendChild(ratioNode);
    cardNode.appendChild(imageContainerNode);
    cardNode.appendChild(cardBodyNode);
    cardBodyNode.appendChild(cardTitleNode);
    cardBodyNode.appendChild(cardPNode);
    colNode.appendChild(cardNode);
    containerNode.appendChild(colNode);
  }
};

const loadSongs = (artist, containerId) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      displaySongs(response.data, containerId);
    })

    .catch((err) => {
      console.error(err);
    });
};
const displaySongs = (songs, containerId) => {
  console.log(songs);
  for (let i = 0; i < songs.length; i++) {
    let song = songs[i];
    let containerNode = document.getElementById(containerId);
    let colNode = document.createElement("div");
    colNode.classList.add("col-lg-2", "col-md-4", "col-sm-6", "col-xs-12");

    let cardNode = document.createElement("div");
    cardNode.classList.add("card");
    let imageContainerNode = document.createElement("div");
    imageContainerNode.classList.add("card-image-container");
    let playButtonNode = document.createElement("div");
    playButtonNode.classList.add("play-btn");
    let ratioNode = document.createElement("div");
    ratioNode.classList.add("ratio", "ratio-1x1");
    let imgNode = document.createElement("img");
    imgNode.classList.add("card-img-top", "py-3", "px-3", "card-image-rounded");
    imgNode.src = song.album.cover;
    imgNode.alt = "track image";
    let cardBodyNode = document.createElement("div");
    cardBodyNode.classList.add("card-body");
    let cardTitleNode = document.createElement("h6");
    cardTitleNode.classList.add("card-title-music", "text-truncate");
    cardTitleNode.innerText = song.title_short;

    let artistNode = document.createElement("a");
    artistNode.classList.add(
      "card-text",
      "artist-name",
      "text-decoration-none"
    );
    artistNode.innerText = song.artist.name;
    artistNode.href = `artist.html?id=${song.artist.id}`;

    let albumNode = document.createElement("a");
    albumNode.classList.add("card-text", "truncate-2-lines", "album-title");
    albumNode.innerText = song.album.title;
    albumNode.href = `albumpage.html?id=${song.album.id}`;

    ratioNode.appendChild(imgNode);
    imageContainerNode.appendChild(playButtonNode);
    imageContainerNode.appendChild(ratioNode);
    cardNode.appendChild(imageContainerNode);
    cardNode.appendChild(cardBodyNode);
    cardBodyNode.appendChild(cardTitleNode);
    cardBodyNode.appendChild(artistNode);

    cardBodyNode.appendChild(albumNode);
    colNode.appendChild(cardNode);
    containerNode.appendChild(colNode);
  }
};
const displayAlbumTitles = () => {
  let titleNodes = document.getElementsByClassName("album-title");

  modalNode = document.getElementById("modal-title");
  let headerList = document.createElement("ul");
  modalNode.appendChild(headerList);
  for (let titleNode of titleNodes) {
    let albumTitleList = document.createElement("li");
    albumTitleList.classList.add("text-dark");
    albumTitleList.innerText = titleNode.innerText;
    headerList.appendChild(albumTitleList);
  }
  var myModal = new bootstrap.Modal(
    document.getElementById("albumModal"),
    "backdrop"
  );
  myModal.show();
};

const countAlbums = () => {
  const albums = {};
  let titleNodes = document.getElementsByClassName("album-title");
  for (let titleNode of titleNodes) {
    albums[titleNode.innerText] = 1;
  }

  console.log(Object.keys(albums).length);
};

window.onload = () => {
  showRecentlyPlayed();
  loadSongs("eminem", "eminem-container");
  loadSongs("behemoth", "behemoth-container");
  loadSongs("metallica", "metallica-container");
};
