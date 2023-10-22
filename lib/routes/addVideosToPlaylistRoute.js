import { addVideosToPlaylist } from "../addVideosToPlaylist.js";

const addVideosToPlaylistRoute = ({ store }) => {
  return async (req, res) => {
    const { playlistId, videoIds } = req.body;

    await addVideosToPlaylist({store, playlistId, videoIds});

    res.json({});
  };
};

export { addVideosToPlaylistRoute };
