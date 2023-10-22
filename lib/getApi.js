"use strict";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getVideos } from "./routes/getVideos.js";
import { getVideo } from "./routes/getVideo.js";
import { getPlaylists } from "./routes/getPlaylists.js";
import { registerVideo } from "./routes/registerVideo.js";
import { addPlaylist } from "./routes/addPlaylist.js";
import { addVideosToPlaylistRoute } from "./routes/addVideosToPlaylistRoute.js";

const getApi = function ({ store }) {
  const api = express();
  api.use(bodyParser.json());
  api.use(cors());

  api.get("/ping", (req, res) => {
    res.json({});
  });

  api.get("/videos/:id", getVideo({ store }));
  api.get("/videos", getVideos({ store }));
  api.get("/playlists", getPlaylists({ store }));

  api.post("/register-video", registerVideo({ store }));

  api.post("/add-playlist", addPlaylist({ store }));
  api.post("/add-videos-to-playlist", addVideosToPlaylistRoute({ store }));

  return api;
};

export { getApi };
