module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

  '**/*.*': () => [
    `npm run lint`,
    `npx prettier --write .`
  ],
};