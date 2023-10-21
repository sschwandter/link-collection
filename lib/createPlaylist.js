"use strict";
import { randomUUID } from "crypto";

const createPlaylist = ({ videoIds }) => {
  return {
    id: randomUUID(),
    videoIds,
  };
};

export { createPlaylist };
