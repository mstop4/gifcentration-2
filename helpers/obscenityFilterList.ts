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
];

export default filterList;
