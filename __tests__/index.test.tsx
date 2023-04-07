import { fireEvent, render, screen } from '@testing-library/react';
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

  it('has a Card on it', () => {
    const { container } = render(<Home />);

    const card = container.querySelector('.card-container');
    expect(card).toBeInTheDocument();

    const cardFront = card?.querySelector('.card-front');
    expect(cardFront).toBeInTheDocument();

    const cardText = cardFront?.innerHTML;
    expect(cardText).toEqual('Front');
  });

  it('should flip Card when clicked', () => {
    const { container } = render(<Home />);

    const card = container.querySelector('.card-container') as Element;
    fireEvent.click(card);

    const cardBack = card?.querySelector('.card-back');
    expect(cardBack).toBeInTheDocument();

    const cardText = cardBack?.innerHTML;
    expect(cardText).toEqual('Back');
  });
});
