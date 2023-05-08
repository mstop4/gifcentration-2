import React from 'react';
import { render } from '@testing-library/react';
import MainLoadingIndicator from './MainLoadingIndicator';
import '@testing-library/jest-dom';

describe('Spinner', () => {
  it('renders a MainLoadingIndicator', () => {
    const { container } = render(<MainLoadingIndicator />);

    const loading = container.querySelector('#mainLoadingIndicator');
    expect(loading).toBeInTheDocument();
  });
});
