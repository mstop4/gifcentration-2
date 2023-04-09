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

  it('has a Card in the tableau div', () => {
    const { container } = render(<Tableau />);
    const tableau = container.querySelector('.tableau');
    const card = tableau?.querySelector('.cardContainer');

    expect(card).toBeInTheDocument();
  });
});
