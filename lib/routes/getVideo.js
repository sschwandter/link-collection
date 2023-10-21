const getVideo = ({ store }) => {
  return async (req, res) => {
    const { id } = req.params;
    const video = await store.getVideo({ id });

    res.json(video ?? {});
  };
};

export { getVideo };
