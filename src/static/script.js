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
  console.log("value", value);
  let result = "";
  value
    .then((text) => {
      // albumArea.innerHTML = text;

      text.forEach(function (t) {
        result += "<p>" + t.title + " " + t.artist + " " + t.year + "</p>";
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
    console.log("res", res[0]);
    return res;
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////
// search for one by title
// searchButton.addEventListener("click", async (event) => {
//   const album = await searchByTitle(inputTitle.value);
//   const value = Promise.resolve(album);
//   console.log("getting the value", value);
//   value
//     .then((text) => {
//       albumArea.innerHTML = text;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Functions section
// async function searchByTitle(title) {
//   try {
//     let result = await fetch(`http://localhost:3000/api/albums/${title}`, {
//       method: "GET",
//       headers: { "content-type": "application/json" },
//     });
//     if (result.status !== 200) {
//       return;
//     }
//     return await result.json();
//   } catch (error) {
//     console.log(error);
//   }
// }
