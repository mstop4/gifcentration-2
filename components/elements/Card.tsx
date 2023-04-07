import React, { ReactElement, useState } from 'react';

export default function Card(): ReactElement {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = function (): void {
    setFlipped(!flipped);
    console.log('Click');
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="card-body">
        <div
          className="card-front"
          style={flipped ? { display: 'none' } : { display: 'inline' }}
        >
          Front
        </div>
        <div
          className="card-back"
          style={flipped ? { display: 'inline' } : { display: 'none' }}
        >
          Back
        </div>
      </div>
    </div>
  );
}
