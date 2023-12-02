import React from 'react';
import '@testing-library/jest-dom';
import GifOverlay from './GifOverlay';
import { render } from '@testing-library/react';

describe('GifOverlay', () => {
  it('renders a GifOverlay', () => {
    const { container } = render(
      <GifOverlay active={true} linkUrl="https://example.com">
        <div></div>
      </GifOverlay>,
    );

    const overlay = container.querySelector('.gifOverlay');
    expect(overlay).toBeInTheDocument();
  });
});
