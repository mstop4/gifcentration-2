import React from 'react';
import { render } from '@testing-library/react';
import Title from './Title';
import '@testing-library/jest-dom';

describe('Title', () => {
  it('renders a Title', () => {
    const { container } = render(<Title />);

    const title = container.querySelector('#title');
    expect(title).toBeInTheDocument();
  });
});