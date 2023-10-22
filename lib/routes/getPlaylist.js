const getPlaylist = ({ store }) => {
  return async (req, res) => {
    const { id } = req.params;
    const playlist = await store.getPlaylist({ id });
    res.json(playlist ?? {});
  };
};

export { getPlaylist };
