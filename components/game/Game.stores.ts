import { create } from 'zustand';
import { ElementVisibility, TitleVisibility } from './Game.typedefs';

export const useClickHereVisibleStore = create<ElementVisibility>(set => ({
  visible: false,
  rendered: true,
  setVisibilty: action => set(() => ({ [action.prop]: action.value })),
}));

export const useTitleVisibleStore = create<TitleVisibility>(set => ({
  headerVisible: false,
  titleRendered: true,
  titleVisible: false,
  subtitleVisible: false,
  setVisibilty: action => set(() => ({ [action.prop]: action.value })),
}));
