import { test, expect } from "vitest";
import { createMongoDbStore } from "../store/createMongoDbStore.js";
import { createPlaylist } from "./createPlaylist.js";
import { createVideo } from "./createVideo.js";
import { addVideosToPlaylist } from "./addVideosToPlaylist.js";

test("Update playlist", async () => {
  const store = createMongoDbStore();
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

  addVideosToPlaylist({
    store,
    playlistId: playlist1.id,
    videoIds: [video2.id],
  });

  const playlist2 = JSON.parse(JSON.stringify(playlist1));
  playlist2.videos.push(video2);

  await store.updatePlaylist({ playlist: playlist2 });

  const playlistNew = await store.getPlaylist({ id: playlist1.id });
  expect(playlistNew.videos).toContainEqual(video1, video2);
});
