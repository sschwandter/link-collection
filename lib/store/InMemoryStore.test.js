import { test, expect, toContain } from "vitest";
import { InMemoryStore } from "./InMemoryStore.js";
import { createPlaylist } from "../createPlaylist";
import { createVideo } from "../createVideo";

test("Update playlist", async () => {
  const store = new InMemoryStore();
  await store.initialize();

  const video1 = createVideo({ url: "url1" });
  const video2 = createVideo({ url: "url2" });

  await store.createVideo({ video: video1 });
  await store.createVideo({ video: video2 });

  const playlist1 = await createPlaylist({
    store,
    videoIds: [video1.id],
  });

  await store.createPlaylist({ playlist: playlist1 });
  
  const playlist2 = JSON.parse(JSON.stringify(playlist1));
  playlist2.videos.push(video2);

  await store.updatePlaylist({ playlist: playlist2 });

  const playlistNew = (await store.getPlaylists())[0];
  expect(playlistNew.videos).toContainEqual(video1, video2);
});
