import {
  ElementVisibility,
  ElementVisibilityAction,
  TitleVisibility,
  TitleVisibilityAction,
} from './Game.typedefs';

export const clickHereVisibleReducer = (
  state: ElementVisibility,
  action: ElementVisibilityAction
): ElementVisibility => ({ ...state, [action.prop]: action.value });

export const titleVisibleReducer = (
  state: TitleVisibility,
  action: TitleVisibilityAction
): TitleVisibility => {
  const newState = { ...state };

  switch (action.type) {
    case 'showHeader':
      newState.headerVisible = true;
      break;

    case 'showTitle':
      newState.titleVisible = true;
      break;

    case 'showSubtitle':
      newState.subtitleVisible = true;
      break;

    case 'hideTitle':
      newState.titleVisible = false;
      break;

    case 'hideSubtitle':
      newState.subtitleVisible = false;
      break;

    case 'removeTitle':
      newState.titleRendered = false;
      break;
  }

  return newState;
};
