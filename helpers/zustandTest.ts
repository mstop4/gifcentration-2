import { renderHook } from '@testing-library/react';

export const getZustandHooks = (store, hooks) => {
  global.zustandHooks = {};

  for (const hookName of hooks) {
    const storeHook = renderHook(() => store(state => state[hookName]));

    global.zustandHooks[hookName] = storeHook.result.current;
    global.zustandHooks[`unmount_${hookName}`] = storeHook.unmount;
  }
};

export const cleanupZustandHooks = hooks => {
  for (const hookName of hooks) {
    global.zustandHooks[`unmount_${hookName}`]();
  }

  global.zustandHooks = null;
};
