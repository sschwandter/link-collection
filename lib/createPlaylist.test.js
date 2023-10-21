import { test, expect } from "vitest";
import { InMemoryStore } from "./store/InMemoryStore";
import { createPlaylist } from "./createPlaylist";
import { createVideo } from "./createVideo";

test("Created playlist should contain video", async () => {
  const store = new InMemoryStore();
  await store.initialize();

  const video1 = createVideo({ url: "url1" });
  const video2 = createVideo({ url: "url2" });

  await store.registerVideo({ video: video1 });
  await store.registerVideo({ video: video2 });

  const playlist = await createPlaylist({
    store,
    videoIds: [video1.id, video2.id],
  });
  expect(playlist.videos).toContain(video1, video2);
});