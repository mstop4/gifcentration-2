module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npm run check-ts',

  '**/*.*': () => [
    `npm run lint`,
    `npm run test`,
    `npm run prettier`
  ],
};