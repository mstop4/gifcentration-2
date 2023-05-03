import 'jest-canvas-mock'; // Needed for compatibilty with react-confetti
import { TextEncoder, TextDecoder } from 'util';
// import jestFetchMock from 'jest-fetch-mock';

// jestFetchMock.enableMocks(); // Needed to test API routes

// Need for testing something in SearchPopularChip.test.tsx
Object.assign(global, { TextDecoder, TextEncoder });

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  })),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
