const serverConfig = {
  home: {
    topSearchesLimit: 10,
  },

  api: {
    search: {
      maxLimit: 100,
      cacheExpiryTime: 60 * 30, // seconds
    },
  },

  mongoose: {
    documentExpiryTime: {
      dev: '30m',
      prod: '30 days',
    },
  },
};

export default serverConfig;
