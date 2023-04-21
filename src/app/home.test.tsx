import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './home';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('has a header and footer', async () => {
    const { container } = render(<Home />);

    const header = container.querySelector('#headerTitle');
    const footer = container.querySelector('#footer');

    await waitFor(() => {
      expect(header).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
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
