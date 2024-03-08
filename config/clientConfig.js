const clientConfig = {
  card: {
    defaultSize: 100,
    gifSizeScale: 0.9, // the maximum width or height a GIF should take up relative to its card
  },

  tableau: {
    checkDelay: 1000, // time to wait between flipping a second card and checking if they match, in milliseconds
  },

  searchForm: {
    minCards: 2,
    maxCards: 50,
    cardsStep: 2,
    maxPopularSearches: 10,
    enableRatingSelection: false,
  },

  game: {
    defaultTableauSize: 18,
    confettiAmount: 200,
    confettiDuration: 10000, // milliseconds
    maxSearchWaitTime: 8000, // milliseconds
    maxLoadWaitTime: 8000, // milliseconds
  },
};

export default clientConfig;
