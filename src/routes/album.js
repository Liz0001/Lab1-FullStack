const express = require("express");
const router = express.Router();
const MusicAlbum = require("../models/albumsModel.js");
const { testStr } = require("../utilities/testStr.js");

router.get("/", async (req, res) => {
  try {
    const albums = await MusicAlbum.find();
    res.json(albums);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/:title", async (req, res) => {
  const t = req.params.title;
  console.log(t);
  if (!testStr(t)) {
    res.sendStatus(400);
    return;
  }
  try {
    const albums = await MusicAlbum.find({
      title: { $regex: new RegExp(`${t}`, "i") },
    });
    if (albums.length == 0) {
      res.status(404).send("Album not found");
      return;
    }
    res.json(albums);
  } catch (err) {
    console.log("Error", err);
    res.sendStatus(400);
    return;
  }
});

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
