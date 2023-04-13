import sleep from './timeout';

describe('timeout', () => {
  it('should resolve', async () => {
    await expect(sleep(1000)).resolves.not.toThrow();
  });
});
