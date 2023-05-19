export enum GameState {
  Idle = 'idle',
  Searching = 'searching',
  Loading = 'loading',
  Playing = 'playing',
  Finished = 'finished',
}

export enum GifErrorState {
  Ok,
  NotEnoughGifs,
  NoGifs,
  BadRequest,
  Forbidden,
  URITooLong,
  InternalServerError,
  ServiceUnavailable,
  GatewayTimeout,
  UnknownError,
}

export enum ImageLoadingStatus {
  Timeout,
  LongWait,
  OK,
}
