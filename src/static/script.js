/////////////////////////////////////
// search all
const allAlbumsButton = document.querySelector(".allAlbumsButton");

// specific activity
const searchButton = document.querySelector(".searchButton");
const createButton = document.querySelector(".createButton");
const updateButton = document.querySelector(".updateButton");
const deleteButton = document.querySelector(".deleteButton");

// input fields
const inputTitle = document.querySelector(".inputTitle");
const inputAuthor = document.querySelector(".inputAuthor");
const inputYear = document.querySelector(".inputYear");

// show data area
const albumArea = document.querySelector(".albumArea");

/////////////////////////////////////
// get all albums
allAlbumsButton.addEventListener("click", async (event) => {
  const albums = await getAllAlbums();
  const value = Promise.resolve(albums);
  let result = "<h3>All the albums:</h3>";
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

async function getAllAlbums() {
  try {
    let result = await fetch("http://localhost:3000/api/albums", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (result.status !== 200) {
      return;
    }
    const res = await result.json();
    return res;
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
// search for one by title
