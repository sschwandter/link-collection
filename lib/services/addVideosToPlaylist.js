"use strict";

const addVideosToPlaylist = async ({ store, playlistId, videoIds }) => {
  const playlist = await store.getPlaylist({ id: playlistId });

  const newVideos = await Promise.all(
    videoIds.map((id) => store.getVideo({ id })),
  );

  playlist.videos.push(newVideos);

  store.updatePlaylist({ playlist });
};

export { addVideosToPlaylist };
