import { InMemoryStore } from "./InMemoryStore.js";
import { createMongoDbStore } from "./createMongoDbStore.js";

const createStore = () => {
  switch (process.env.STORE_TYPE) {
    case "mongodb":
      console.log("Using MongoDB store");
      return createMongoDbStore();
    case "inmemory":
    default:
      console.log("Using in-memory store");
      return new InMemoryStore();
  }
};

export { createStore };
