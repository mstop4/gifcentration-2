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
  UnknownError,
}

export type ElementVisibility = {
  visible: boolean;
  rendered: boolean;
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
};

export type TitleVisibilityAction = {
  type:
    | 'showHeader'
    | 'showTitle'
    | 'showSubtitle'
    | 'hideTitle'
    | 'hideSubtitle'
    | 'removeTitle';
};
