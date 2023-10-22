import http from "http";
import { getApi } from "./lib/getApi.js";
import { createStore } from "./lib/store/createStore.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const store = createStore();
await store.initialize();

const api = getApi({ store });
const server = http.createServer(api);

const port = process.env.PORT ?? 3000;

server.listen(port);
console.log(`Server listening on port ${port}`);
