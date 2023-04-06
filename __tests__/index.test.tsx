import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a lorem ipsum', () => {
    render(<Home />);

    const text = screen.getByText(/lorem ipsum/i);

    expect(text).toBeInTheDocument();
  });
});
