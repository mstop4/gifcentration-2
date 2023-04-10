import React from 'react';
import { render } from '@testing-library/react';
import Tableau from '../../../components/elements/Tableau';
import '@testing-library/jest-dom';

describe('Tableau', () => {
  it('renders a Tableau', () => {
    const { container } = render(<Tableau />);
    const tableau = container.querySelector('.tableau');

    expect(tableau).toBeInTheDocument();
  });

  it('has 18 Cards in the tableau div', () => {
    const { container } = render(<Tableau />);
    const tableau = container.querySelector('.tableau');
    const cards = tableau?.querySelectorAll('.cardHolder');

    expect(cards).toHaveLength(18);
    cards?.forEach(card => {
      expect(card).toBeInTheDocument();
    });
  });
});
