/////////////////////////////////////
// search all
const allAlbumsButton = document.querySelector(".allAlbumsButton");

// specific activity button
const searchButton = document.querySelector(".searchButton");
const createButton = document.querySelector(".createButton");
const updateButton = document.querySelector(".updateButton");
const deleteButton = document.querySelector(".deleteButton");
const detailsButton = document.querySelector(".detailsButton");

// input fields
const inputTitle = document.querySelector(".inputTitle");
const inputArtist = document.querySelector(".inputArtist");
const inputYear = document.querySelector(".inputYear");

// show data areas
const albumArea = document.querySelector(".albumArea");
const showMore = document.querySelector(".showMore");

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
          "<div class='album' >Album " +
          i++ +
          ": <p>Title: " +
          t.title +
          "</p><p>Artist: " +
          t.artist +
          "</p><p>Year: " +
          t.year +
          "</p>" +
          '<button class="detailsButton" data-id="' +
          t.id +
          '">Show Details</button>' +
          '<button class="updateButton" data-id="' +
          t.id +
          '">Update an album</button>' +
          '<button class="deleteButton" data-id="' +
          t.id +
          '">Delete an album</button></div>' +
          '<div class="showMore showMore' +
          t.id +
          '"></div>';
      });
      albumArea.innerHTML = result;
    })
    .catch((err) => {
      console.log(err);
    });
});

async function getAllAlbums() {
  try {
    let result = await fetch(
      "https://express-mongodb-application.onrender.com/api/albums",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    if (result.status !== 200) {
      return;
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////
// search for an album by title
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
          "<div class='album' >Album " +
          i++ +
          ": <p>Title: " +
          t.title +
          "</p><p>Artist: " +
          t.artist +
          "</p><p>Year: " +
          t.year +
          "</p>" +
          '<button class="detailsButton" data-id="' +
          t.id +
          '">Show Details</button>' +
          '<button class="updateButton" data-id="' +
          t.id +
          '">Update an album</button>' +
          '<button class="deleteButton" data-id="' +
          t.id +
          '">Delete an album</button></div>' +
          '<div class="showMore showMore' +
          t.id +
          '"></div>';
      });
      albumArea.innerHTML = result;
    })
    .catch((err) => {
      console.log(err);
    });
});

async function searchByTitle(title) {
  try {
    let result = await fetch(
      `https://express-mongodb-application.onrender.com/api/albums/${title}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
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
  if (t == "" && a == "" && y == "") {
    return;
  }
  let newAlbum = { title: t, artist: a, year: Number(y) };
  let album = await addAlbum(newAlbum);

  let result = `<h3>Created an Album:</h3>`;
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
          "<div class='album' >Album " +
          i++ +
          ": <p>Title: " +
          t.title +
          "</p><p>Artist: " +
          t.artist +
          "</p><p>Year: " +
          t.year +
          "</p>" +
          '<button class="detailsButton" data-id="' +
          t.id +
          '">Show Details</button>' +
          '<button class="updateButton" data-id="' +
          t.id +
          '">Update an album</button>' +
          '<button class="deleteButton" data-id="' +
          t.id +
          '">Delete an album</button></div>' +
          '<div class="showMore showMore' +
          t.id +
          '"></div>';
      });
      albumArea.innerHTML = result;
    })
    .catch((err) => {
      console.log(err);
    });
});

async function addAlbum(newAlbum) {
  try {
    const result = await fetch(
      "https://express-mongodb-application.onrender.com/api/albums",
      {
        method: "POST",
        body: JSON.stringify(newAlbum),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (result.status !== 201) {
      return;
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////
// show album details
albumArea.addEventListener("click", (event) => {
  if (event.target.classList.contains("detailsButton")) {
    const albumId = event.target.closest(".detailsButton");
    const id = Number(albumId.getAttribute("data-id"));
    let dataField = document.querySelector(".showMore" + id);
    dataField.innerHTML = "<p>Currently there are no more details to show!</p>";
  }
});

/////////////////////////////////////
// update the album
albumArea.addEventListener("click", (event) => {
  if (event.target.classList.contains("updateButton")) {
    const albumId = event.target.closest(".updateButton");
    const id = Number(albumId.getAttribute("data-id"));

    let dataField = document.querySelector(".showMore" + id);
    dataField.innerHTML = `
          <input class="inputTitle" type="text" placeholder="TITLE" />
          <input class="inputArtist" type="text" placeholder="ARTIST" />
          <input
            class="inputYear"
            type="number"
            placeholder="YEAR"
            min="1"
            max="2050"
          />
          <div>
            <button class="ok">Update</button>
            <button class="cancel">Cancel</button>
          </div>`;

    const okButton = dataField.querySelector(".ok");
    const cancel = dataField.querySelector(".cancel");
    cancel.addEventListener("click", async (event) => {
      dataField.innerHTML = "";
    });
    okButton.addEventListener("click", async (event) => {
      const inputTitle = dataField.querySelector(".inputTitle").value;
      const inputArtist = dataField.querySelector(".inputArtist").value;
      const inputYear = dataField.querySelector(".inputYear").value;

      if (inputTitle == "" || inputArtist == "" || inputYear == "") {
        return;
      }

      let data = {
        title: inputTitle,
        artist: inputArtist,
        year: Number(inputYear),
      };

      let res = await updateAlbum(id, data);
      if (res == undefined) {
        dataField.innerHTML = "<p>Album not found!</p>";
        return;
      }
      allAlbumsButton.click();
    });
  }
});

async function updateAlbum(id, data) {
  try {
    const result = await fetch(
      `https://express-mongodb-application.onrender.com/api/albums/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status !== 200) {
      return;
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////
// delete the album
albumArea.addEventListener("click", async (event) => {
  if (event.target.classList.contains("deleteButton")) {
    const albumId = event.target.closest(".deleteButton");
    const id = Number(albumId.getAttribute("data-id"));

    let dataField = document.querySelector(".showMore" + id);
    dataField.innerHTML = `
          <p>Are you sure you want to delete the album?</p>
          <div>
            <button class="ok">Delete</button>
            <button class="cancel">Cancel</button>
          </div>`;

    const okButton = dataField.querySelector(".ok");
    const cancel = dataField.querySelector(".cancel");
    cancel.addEventListener("click", async (event) => {
      dataField.innerHTML = "";
    });
    okButton.addEventListener("click", async (event) => {
      let res = await deleteAlbum(id);
      if (res == undefined) {
        let dataField = document.querySelector(".showMore" + id);
        dataField.innerHTML = "<p>No album found!</p>";
        return;
      }

      allAlbumsButton.click();
    });
  }
});

async function deleteAlbum(id) {
  try {
    const result = await fetch(
      "https://express-mongodb-application.onrender.com/api/albums/" + id,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (result.status !== 200) {
      return;
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}
