import { createVideo } from "../createVideo.js";
const registerVideo = ({ store }) => {
  return async (req, res) => {
    const { url } = req.body;

    const video = createVideo({ url });

    await store.registerVideo({ video });

    res.json({ id: video.id });
  };
};

export { registerVideo };
