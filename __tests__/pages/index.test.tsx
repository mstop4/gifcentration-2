import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('has a header and footer', () => {
    render(<Home />);

    const headerText = screen.getByText(/gifcentration 2/i);
    const footerText = screen.getByText(/2023/i);

    expect(headerText).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });

  it('has a CardArray', () => {
    const { container } = render(<Home />);

    const cardArray = container.querySelector('.cardArray');
    expect(cardArray).toBeInTheDocument();
  });
});
