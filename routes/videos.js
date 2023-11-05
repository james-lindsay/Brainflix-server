const express = require("express");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const router = express.Router();

router.get("/", (_req, res) => {
    const videoDetails = fs.readFileSync("./data/videos.json");
    const parsedVideoDetails = JSON.parse(videoDetails);
    res.json(parsedVideoDetails);
});

router.get("/:id", (req, res) => {
    const videoId = req.params.id;
    const videoDetails = fs.readFileSync("./data/videos.json");
    const parsedVideoDetails = JSON.parse(videoDetails);
    const selectedVideo = parsedVideoDetails.find(video => video.id === videoId);

    if (selectedVideo) {
        res.json(selectedVideo);
    } else {
        res.status(404).json({ message: "Video not found" });
    }
});



router.post("/", (req, res) => {
    const { title, description, likes, views, timestamp, channel, image} = req.body;
  
    const newVideo = {
      id: uuid(),
      title: title,
      description: description,
      channel: channel,
      likes: likes,
      views: views,
      timestamp: timestamp,
      image: image,
    };
    const videosJson = fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosJson);
    parsedVideos.push(newVideo);
  
    const updatedVideoJson = JSON.stringify(parsedVideos);
    fs.writeFileSync("./data/videos.json", updatedVideoJson);
  

    res.status(201).json(newVideo);
  });
module.exports = router