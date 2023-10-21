"use strict";
import { randomUUID } from "crypto";

const createPlaylist = async ({ store, videoIds }) => {
  const videos = [];

  videoIds.forEach(async (id) => {
    const video = await store.getVideo({ id });
    videos.push(video);
  });

  return {
    id: randomUUID(),
    videos,
  };
};

export { createPlaylist };
