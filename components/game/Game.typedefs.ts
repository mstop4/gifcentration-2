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

export type CardArrayAction =
  | {
      type: 'set';
      payload: number | number[];
    }
  | {
      type: 'push';
      payload: number | number[];
    }
  | {
      type: 'copy';
      payload: boolean[];
    }
  | {
      type: 'clear';
      payload: number;
    };

export type GameStore = {
  gameState: GameState;
  flipped: boolean[];
  matched: boolean[];
  selectedCardIndexes: number[];
  idealTableauSize: string;
  actualTableauSize: number;
  setGameState: (gameState: GameState) => void;
  setFlipped: (action: CardArrayAction) => void;
  setMatched: (action: CardArrayAction) => void;
  setSelectedCardIndexes: (action: CardArrayAction) => void;
  setIdealTableauSize: (size: string) => void;
  setActualTableauSize: (size: number) => void;
};

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
