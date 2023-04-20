import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GifErrorState } from '../../layout/Game';
import Alert from './Alert';

describe('Alert', () => {
  it('renders an Alert', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.Ok} alertVisible={false} />
    );

    const alert = container.querySelector('#alert');
    expect(alert).toBeInTheDocument();
  });
});
