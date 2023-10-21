const getVideos = ({ store }) => {
  return async (req, res) => {
    const videos = await store.getVideos();
    res.json(videos);
  };
};

export { getVideos };
