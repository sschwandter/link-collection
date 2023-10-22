import { createVideo } from "../services/createVideo.js";
const registerVideo = ({ store }) => {
  return async (req, res) => {
    const { url } = req.body;

    const video = createVideo({ url });

    await store.createVideo({ video });

    res.json({ id: video.id });
  };
};

export { registerVideo };
