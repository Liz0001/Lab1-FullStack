const mongoose = require("mongoose");

const album = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    collation: { locale: "en", strength: 2 },
  },
  artist: {
    type: String,
    required: true,
    collation: { locale: "en", strength: 2 },
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("MusicAlbum", album);
