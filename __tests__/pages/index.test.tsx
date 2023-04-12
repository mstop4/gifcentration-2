import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../src/pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('has a header and footer', async () => {
    render(<Home />);

    const headerText = screen.queryByText(/gifcentration 2/i);
    const footerText = screen.queryByText(/2023/i);

    await waitFor(() => {
      expect(headerText).toBeInTheDocument();
      expect(footerText).toBeInTheDocument();
    });
  });

  it('has a Tableau', async () => {
    const { container } = render(<Home />);

    const tableau = container.querySelector('#tableau');

    await waitFor(() => {
      expect(tableau).toBeInTheDocument();
    });
  });
});
