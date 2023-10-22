import { createPlaylist } from "../createPlaylist.js";

const addPlaylist = ({ store }) => {
  return async (req, res) => {
    const { videoIds } = req.body;

    const playlist = await createPlaylist({ store, videoIds });

    await store.createPlaylist({ playlist });

    res.json({ id: playlist.id });
  };
};

export { addPlaylist };
