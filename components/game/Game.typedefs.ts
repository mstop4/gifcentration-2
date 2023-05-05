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
  InternalServerError,
  UnknownError,
}

export type ElementVisibility = {
  visible: boolean;
  rendered: boolean;
  setVisibilty: (action: ElementVisibilityAction) => void;
};

export type ElementVisibilityAction = {
  prop: 'visible' | 'rendered';
  value: boolean;
};

export type TitleVisibility = {
  headerVisible: boolean;
  titleRendered: boolean;
  titleVisible: boolean;
  subtitleVisible: boolean;
  setVisibilty: (type: TitleVisibilityAction) => void;
};

export type TitleVisibilityAction = {
  prop: 'headerVisible' | 'titleRendered' | 'titleVisible' | 'subtitleVisible';
  value: boolean;
};
