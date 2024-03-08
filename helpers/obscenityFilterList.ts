import { pattern } from 'obscenity';

const filterList = [
  {
    originalWord: 'shit',
    wordPattern: pattern`shit`,
    whitelistedTerms: ['sh it', 's hit', 'shi t'],
  },
  {
    originalWord: 'nsfw',
    wordPattern: pattern`nsfw`,
    whitelistedTerms: ['n sfw', 'ns fw', 'nsf w'],
  },
  {
    originalWord: 'ahegao',
    wordPattern: pattern`ahegao`,
    whitelistedTerms: ['ah egao'],
  },
  {
    originalWord: 'nude',
    wordPattern: pattern`nude`,
    whitelistedTerms: [],
  },
  {
    originalWord: 'sexy',
    wordPattern: pattern`sexy`,
    whitelistedTerms: [],
  },
  {
    originalWord: 'tit',
    wordPattern: pattern`tit`,
    whitelistedTerms: ['t it'],
  },
  {
    originalWord: 'hot women',
    wordPattern: pattern`hot women`,
    whitelistedTerms: [],
  },
  {
    originalWord: 'hot woman',
    wordPattern: pattern`hot woman`,
    whitelistedTerms: [],
  },
];

export default filterList;
