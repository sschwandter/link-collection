"use strict";
import { randomUUID } from "crypto";

const createVideo = ({ url }) => {
  return {
    id: randomUUID(),
    url,
  };
};

export { createVideo };
