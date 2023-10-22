import { test, expect } from "vitest";
import { createPlaylist } from "./createPlaylist";
import { createVideo } from "./createVideo";
import { createMongoDbStore } from "./store/createMongoDbStore.js";

test("Created playlist should contain video", async () => {
  const store = createMongoDbStore();
  await store.initialize();

  const video1 = createVideo({ url: "url1" });
  const video2 = createVideo({ url: "url2" });

  await store.createVideo({ video: video1 });
  await store.createVideo({ video: video2 });

  const playlist = await createPlaylist({
    store,
    videoIds: [video1.id, video2.id],
  });
  expect(playlist.videos).toContainEqual(video1, video2);
});
