import { renderHook } from '@testing-library/react';
import type { StoreApi, UseBoundStore } from 'zustand';

export const getZustandStoreHooks = (
  store: UseBoundStore<StoreApi<unknown>>,
) => {
  const hook = renderHook(() => store);
  const initialState = hook.result.current.getState();

  return {
    getState: hook.result.current.getState,
    setState: hook.result.current.setState,
    reset: () => hook.result.current.setState(initialState),
    unmount: hook.unmount,
  };
};
