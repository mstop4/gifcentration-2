import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders homepage', () => {
    render(<Home />);

    const bodyText = screen.getByText(/lorem ipsum/i);
    const headerText = screen.getByText(/gifcentration 2/i);
    const footerText = screen.getByText(/2023/i);

    expect(headerText).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });
});
