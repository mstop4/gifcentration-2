import {
  DataSet,
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';
import filterList from './obscenityFilterList';
import { type TopSearchResult } from '../lib/mongodb/helpers';

const dataset = new DataSet().addAll(englishDataset);

for (const word of filterList) {
  const { originalWord, wordPattern, whitelistedTerms } = word;

  dataset.addPhrase(phrase => {
    phrase.setMetadata({ originalWord }).addPattern(wordPattern);

    for (const whiteListTerm of whitelistedTerms) {
      phrase.addWhitelistedTerm(whiteListTerm);
    }

    return phrase;
  });
}

const matcher = new RegExpMatcher({
  ...dataset.build(),
  ...englishRecommendedTransformers,
});

export const filterObscenities = (
  wordList: TopSearchResult[],
): TopSearchResult[] => wordList.filter(word => !matcher.hasMatch(word._id));

export const isObscene = (word: string): boolean => matcher.hasMatch(word);
