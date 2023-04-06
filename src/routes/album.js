const express = require("express");
const router = express.Router();
const MusicAlbum = require("../models/albumsModel.js");

router.get("/", async (req, res) => {
  try {
    const albums = await MusicAlbum.find();
    // console.log(albums);
    res.json(albums);
  } catch (err) {
    console.log("Error", err);
    res.sendStatus(400);
  }
});

// router.get("/:title", (req, res) => {
//   console.log(req.params.title);
//   res.json("Search album by title", req.params.title);
// });

router.post("/", async (req, res) => {
  const album = new MusicAlbum({
    id: req.body.id,
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
  });

  console.log(req.body);

  try {
    const a1 = await album.save();

    res.json(a1);
  } catch (err) {
    console.log("Error", err);
    res.sendStatus(400);
    return;
  }
});

// router.put("/:title", (req, res) => {
//   console.log(req.params.title);
//   res.json("Search album by title", req.params.title);
// });

// router.delete("/:title", (req, res) => {
//   console.log(req.params.title);
//   res.json("Search album by title", req.params.title);
// });

module.exports = router;
