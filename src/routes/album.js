const express = require("express");
const router = express.Router();
const MusicAlbum = require("../models/albumsModel.js");
const { validStr } = require("../utilities/validStr.js");

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
  if (!validStr(t)) {
    res.status(405).json({ message: "Some characters not allowed!" });
    return;
  }
  try {
    const albums = await MusicAlbum.find({
      title: { $regex: new RegExp(`${t}`, "i") },
    });
    if (albums.length == 0) {
      res.status(404).json({ message: "Album not found!" });
      return;
    }
    res.json(albums);
  } catch (err) {
    res.sendStatus(400);
    return;
  }
});

router.post("/", async (req, res) => {
  let t = req.body.title;
  let a = req.body.artist;
  let y = req.body.year;

  if (!validStr(t) || !validStr(a) || typeof y !== "number" || y < 1) {
    res.status(405).json({ message: "Some characters not allowed!" });
    return;
  }
  try {
    const albums = await MusicAlbum.find({
      title: t,
      artist: a,
    }).collation({ locale: "en", strength: 2 });

    if (albums.length > 0) {
      res.status(409).json({ message: "Already exists in Database!" });
      return;
    }
  } catch (err) {
    res.sendStatus(400);
    return;
  }

  const lastDoc = await MusicAlbum.find({}).sort({ _id: -1 }).limit(1);
  const ID = lastDoc[0].id + 1;

  const album = new MusicAlbum({
    id: ID,
    title: t,
    artist: a,
    year: y,
  });

  try {
    const a1 = await album.save();
    console.log(a1);
    res.status(201).json([a1]);
  } catch (err) {
    res.sendStatus(400);
    return;
  }
});

router.put("/:id", async (req, res) => {
  let i = req.params.id;
  let t = req.body.title;
  let a = req.body.artist;
  let y = req.body.year;

  let exists = (await MusicAlbum.find({ id: i }).count()) > 0;
  if (!exists) {
    res.json({ message: "Album not found!" });
    return;
  }
  if (t !== "" && validStr(t)) {
    await MusicAlbum.updateOne({ id: i }, { $set: { title: t } });
  }
  if (a !== "" && validStr(a)) {
    await MusicAlbum.updateOne({ id: i }, { $set: { artist: a } });
  }
  if (y !== "" && typeof y === "number" && y > 0) {
    await MusicAlbum.updateOne({ id: i }, { $set: { year: y } });
  }
  const album = await MusicAlbum.findOne({ id: i });
  res.status(200).json(album);
});

router.delete("/:id", async (req, res) => {
  let i = req.params.id;

  let exists = (await MusicAlbum.find({ id: i }).count()) > 0;
  if (!exists) {
    res.status(404).json({ message: "Album not found!" });
    return;
  }
  await MusicAlbum.deleteOne({ id: i });
  res.status(200).json({ message: `Album deleted successfully!` });
});

module.exports = router;
