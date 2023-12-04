import {
  DataSet,
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
  pattern,
} from 'obscenity';
import { type TopSearchResult } from '../lib/mongodb/helpers';

const dataset = new DataSet().addAll(englishDataset).addPhrase(phrase =>
  phrase
    .setMetadata({ originalWord: 'shit' })
    .addPattern(pattern`shit`)
    .addWhitelistedTerm('sh it')
    .addWhitelistedTerm('s hit')
    .addWhitelistedTerm('shi t'),
);

const matcher = new RegExpMatcher({
  ...dataset.build(),
  ...englishRecommendedTransformers,
});

export const filterObscenities = (
  wordList: TopSearchResult[],
): TopSearchResult[] => wordList.filter(word => !matcher.hasMatch(word._id));
