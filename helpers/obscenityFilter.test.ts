import { filterObscenities } from './obscenityFilter';

const goodWords = [
  {
    _id: 'cat',
    count: 1,
  },
  {
    _id: 'dog',
    count: 2,
  },
  {
    _id: 'meme',
    count: 3,
  },
  {
    _id: 'funny',
    count: 4,
  },
];
const badWords = [
  {
    _id: 'boobs',
    count: 1,
  },
  {
    _id: 'penis penis penis',
    count: 2,
  },
  {
    _id: 'shitcock',
    count: 3,
  },
  {
    _id: 'p0rn',
    count: 4,
  },
  {
    _id: 'horseshit',
    count: 5,
  },
];
const susWords = [
  {
    _id: 'jumbo obstacle',
    count: 1,
  },
  {
    _id: 'pen island',
    count: 2,
  },
  {
    _id: 'yoshi tongue',
    count: 3,
  },
  {
    _id: 'hush itch',
    count: 4,
  },
  {
    _id: 'cats hit',
    count: 5,
  },
  {
    _id: 'deep or not',
    count: 6,
  },
];

describe('obscenityFilter', () => {
  it('should filter out obscene words', () => {
    const wordList = [...goodWords, ...susWords, ...badWords];
    const filteredWordList = filterObscenities(wordList);

    badWords.map(word => expect(filteredWordList).not.toContain(word));
  });

  it('should not filter out any words', () => {
    const wordList = [...goodWords];
    const filteredWordList = filterObscenities(wordList);

    console.log(wordList);
    console.log(filteredWordList);

    expect(filteredWordList.length).toEqual(wordList.length);
  });
});
