import { useState, useEffect } from 'react';
import Papa from 'papaparse';

import csvFile from "../vocabulary/data.csv?url"

type CSVWord = {
  needsPractice: boolean
  type: string
  pronoun: string
  singular: string
  plural: string
  translations: string
  categories: string
}

export type Word = {
  needsPractice: boolean
  type: string
  pronoun: string
  singular: string
  plural: string | null
  translations: string[]
  categories: string[]
}

const getGermanWords = (data: Papa.ParseResult<CSVWord>['data']): Word[] => data.map((word: CSVWord) => ({
    ...word,
    translations: word.translations.split(',').map(translation => translation.trim()),
    categories: word.categories.split(',').map(category => category.trim())
}))

const getTranslatedWords = (data: Papa.ParseResult<CSVWord>['data']): Word[] => data.map((word: CSVWord) => ({
    ...word,
    singular: word.translations,
    plural: null,
    translations: [word.singular],
    categories: word.categories.split(',').map(category => category.trim())
}))

const useVocabulary = () => {
  console.log('useVocabulary')
  const [germanWords, setGermanWords] = useState<Word[]>([]);
  const [translatedWords, setTranslatedWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useVocabulary- useEffect')

    const fetchCsv = async () => {
      try {
        const response = await fetch(csvFile);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result: Papa.ParseResult<CSVWord>) => {
            setGermanWords(getGermanWords(result.data));
            setTranslatedWords(getTranslatedWords(result.data));
            setLoading(false);
          },
        });
      } catch (err) {
        setError('Failed to load CSV');
        setLoading(false);
      }
    };

    fetchCsv();
  }, []);

  return { germanWords,  translatedWords, loading, error };
};

export default useVocabulary;