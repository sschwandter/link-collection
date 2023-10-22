"use strict";
import { randomUUID } from "crypto";

const createPlaylist = async ({ store, videoIds }) => {
  const videoPromises = videoIds.map((id) => store.getVideo({ id }));

  const videos = await Promise.all(videoPromises);

  return {
    id: randomUUID(),
    videos,
  };
};

export { createPlaylist };
