import http from "http";
import { getApi } from "./lib/getApi.js";
import { InMemoryStore } from "./lib/store/InMemoryStore.js";

const store = new InMemoryStore();
await store.initialize();

const api = getApi({ store });
const server = http.createServer(api);

const port = process.env.PORT;

server.listen(port);
console.log(`Server listening on port ${port}`);
