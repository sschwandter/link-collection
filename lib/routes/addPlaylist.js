import { createPlaylist } from "../createPlaylist.js";

const addPlaylist = ({ store }) => {
  return async (req, res) => {
    const { videoIds } = req.body;

    const playlist = createPlaylist({ store, videoIds });

    await store.addPlaylist({ playlist });

    res.json({ id: playlist.id });
  };
};

export { addPlaylist };
