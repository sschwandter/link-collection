"use strict";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getVideos } from "./routes/getVideos.js";
import { registerVideo } from "./routes/registerVideo.js";

const getApi = function ({ store }) {
  const api = express();
  api.use(bodyParser.json());
  api.use(cors());

  api.get("/ping", (req, res) => {
    res.json({});
  });

  api.get("/videos", getVideos({ store }));

  api.post("/videos", registerVideo({ store }));

  return api;
};

export { getApi };
