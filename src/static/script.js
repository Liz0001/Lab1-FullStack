/////////////////////////////////////
// search all
const allAlbumsButton = document.querySelector(".allAlbumsButton");

// specific activity
const searchButton = document.querySelector(".searchButton");
const createButton = document.querySelector(".createButton");
const updateButton = document.querySelector(".updateButton");
const deleteButton = document.querySelector(".deleteButton");

// input fields
const inputID = document.querySelector(".inputID");
const inputTitle = document.querySelector(".inputTitle");
const inputArtist = document.querySelector(".inputArtist");
const inputYear = document.querySelector(".inputYear");

// show data area
const albumArea = document.querySelector(".albumArea");

/////////////////////////////////////
// get all albums
allAlbumsButton.addEventListener("click", async (event) => {
  const albums = await getAllAlbums();
  let result = "<h3>All the albums:</h3>";

  const value = Promise.resolve(albums);
  let i = 1;
  value
    .then((text) => {
      text.forEach(function (t) {
        result +=
          "<div class='album'>Album id: " +
          t.id +
          ": <p>Title: " +
          t.title +
          "</p><p>Artist: " +
          t.artist +
          "</p><p>Year: " +
          t.year +
          "</p></div>";
      });
      albumArea.innerHTML = result;
    })
    .catch((err) => {
      console.log(err);
    });
});

async function getAllAlbums() {
  try {
    let result = await fetch("http://localhost:3000/api/albums", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (result.status !== 200) {
      return;
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////
// search for one by title
searchButton.addEventListener("click", async (event) => {
  const input = inputTitle.value;
  if (input == "") {
    return;
  }
  const album = await searchByTitle(input);
  let result = `<h3>Searched by Title: "${input}"</h3>`;

  if (album == undefined) {
    result += "<p>Album not found</p>";
    albumArea.innerHTML = result;
    return;
  }

  const value = Promise.resolve(album);
  let i = 1;
  value
    .then((text) => {
      text.forEach(function (t) {
        result +=
          "<div class='album'>Album " +
          i++ +
          ": <p>Title: " +
          t.title +
          "</p><p>Artist: " +
          t.artist +
          "</p><p>Year: " +
          t.year +
          "</p></div>";
      });
      albumArea.innerHTML = result;
    })
    .catch((err) => {
      console.log(err);
    });
});

async function searchByTitle(title) {
  try {
    let result = await fetch(`http://localhost:3000/api/albums/${title}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (result.status !== 200) {
      return;
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////
// add a new album
createButton.addEventListener("click", async (event) => {
  const t = inputTitle.value;
  const a = inputArtist.value;
  const y = inputYear.value;
  if (t == "" || a == "" || y == "") {
    return;
  }
  let newAlbum = { title: t, artist: a, year: y };
  let album = await addAlbum(newAlbum);

  let result = `<h3>Create an album:</h3>`;
  if (album == undefined) {
    result += "<p>Album not Created!</p>";
    albumArea.innerHTML = result;
    return;
  }
  const value = Promise.resolve(album);

  let i = 1;
  value
    .then((text) => {
      text.forEach(function (t) {
        result +=
          "<div class='album'>Album " +
          i++ +
          ": <p>Title: " +
          t.title +
          "</p><p>Artist: " +
          t.artist +
          "</p><p>Year: " +
          t.year +
          "</p></div>";
      });
      albumArea.innerHTML = result;
    })
    .catch((err) => {
      console.log(err);
    });
});

async function addAlbum(newAlbum) {
  try {
    const result = await fetch("http://localhost:3000/api/albums", {
      method: "POST",
      body: JSON.stringify(newAlbum),
      headers: {
        "content-type": "application/json",
      },
    });

    if (result.status !== 201) {
      return;
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////
// add a new album
