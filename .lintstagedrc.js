module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npm run check-ts',

  '**/*.(ts|tsx|scss)': () => [
    `npm run lint`,
    `npm run prettier`,
    `npm run test`
  ],
};