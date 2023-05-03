// import React from 'react';
// import { render, waitFor } from '@testing-library/react';
// import Home from './home';
// import '@testing-library/jest-dom';

// describe('Home', () => {
//   it('has a header and footer', async () => {
//     // Next.js does accept async server components, despite what the linter expects
//     /* @ts-expect-error Server Component */
//     const { container } = render(<Home />);

//     const header = container.querySelector('#headerTitle');
//     //const footer = container.querySelector('#footer');

//     await waitFor(() => {
//       expect(header).toBeInTheDocument();
//       //expect(footer).toBeInTheDocument();
//     });
//   });

//   it('has a Tableau', async () => {
//     /* @ts-expect-error Server Component */
//     const { container } = render(<Home />);

//     const tableau = container.querySelector('#tableau');

//     await waitFor(() => {
//       expect(tableau).toBeInTheDocument();
//     });
//   });
// });
