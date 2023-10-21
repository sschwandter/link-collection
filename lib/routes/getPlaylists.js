const getPlaylists = ({ store }) => {
  return async (req, res) => {
    const playlists = await store.getPlaylists();
    res.json(playlists);
  };
};

export { getPlaylists };
