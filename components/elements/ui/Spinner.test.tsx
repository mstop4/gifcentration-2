import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';
import '@testing-library/jest-dom';

describe('Spinner', () => {
  it('renders a Spinner', () => {
    const { container } = render(<Spinner />);

    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});
