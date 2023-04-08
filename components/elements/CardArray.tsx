import React, { ReactElement } from 'react';
import Card from './Card';

export default function CardArray(): ReactElement {
  return (
    <div className="cardArray">
      <div className="arrayContainer">
        <Card />
      </div>
    </div>
  );
}
