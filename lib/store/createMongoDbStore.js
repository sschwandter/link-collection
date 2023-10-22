"use strict";
import { MongoDbStore } from "./MongoDbStore.js";

const createMongoDbStore = () => {
  return new MongoDbStore({
    hostname: "localhost",
    port: 27017,
    username: "node",
    password: "node",
    database: "links",
  });
};

export { createMongoDbStore };
