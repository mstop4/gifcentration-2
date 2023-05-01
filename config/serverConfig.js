const serverConfig = {
  api: {
    search: {
      maxLimit: 100,
      cacheExpiryTime: 60 * 30, // seconds
    },
  },

  mongoose: {
    documentExpiryTime: {
      dev: '1m',
      prod: '30 days',
    },
  },
};

export default serverConfig;
