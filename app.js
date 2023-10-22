import http from "http";
import { getApi } from "./lib/getApi.js";
import { createMongoDbStore } from "./lib/store/createMongoDbStore.js";

const store = createMongoDbStore();
await store.initialize();

const api = getApi({ store });
const server = http.createServer(api);

const port = process.env.PORT ?? 3000;

server.listen(port);
console.log(`Server listening on port ${port}`);
