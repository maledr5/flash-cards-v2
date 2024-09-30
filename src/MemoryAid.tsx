import { useEffect, useState } from "react";
import VocabularyPractice from "./VocabularyPractice";
import GenderPractice from "./GenderPractice";
import useVocabulary from "./hooks/useVocabulary.ts";

const FILL_IN_TRANSLATIONS = 'fillInTranslations'
const FILL_IN_GERMAN = 'fillInGerman'
const FILL_IN_GENDER = 'fillInGender'

const MemoryAid = () => {
    const { germanWords, translatedWords, loading, error } = useVocabulary();
    const [wordList, setWordList] = useState(germanWords)
    const [typeOfExercise, setTypeOfExercise] = useState(FILL_IN_TRANSLATIONS)

    useEffect(()=> {
        console.log('MemoryAid - useEffect')
        setWordList(germanWords)
    }, [germanWords])

    if (loading || wordList.length <= 0) {
        return <p>Loading...</p>;
    }

    if (error) {
    return <p>Error: {error}</p>;
    }

    const onOptionSelected = (event: any) => {
        const selectedTypeOfExercise = event.target.value || FILL_IN_TRANSLATIONS
        const newWordList = (selectedTypeOfExercise === FILL_IN_TRANSLATIONS
            || selectedTypeOfExercise === FILL_IN_GENDER)
            ? germanWords
            : translatedWords
        setWordList(newWordList)
        setTypeOfExercise(selectedTypeOfExercise)
    }
    

    return (
        <>
            <h1>Vocabulary Practice</h1>
            <div onChange={onOptionSelected}>
                <input type="radio" id={FILL_IN_TRANSLATIONS}
                       name="exerciseType" value={FILL_IN_TRANSLATIONS} defaultChecked={true} onChange={onOptionSelected}/>
                <label htmlFor={FILL_IN_TRANSLATIONS}>Fill in translations</label>

                <input type="radio" id={FILL_IN_GERMAN}
                       name="exerciseType" value={FILL_IN_GERMAN} onChange={onOptionSelected}/>
                <label htmlFor={FILL_IN_GERMAN}>Fill in German</label>

                <input type="radio" id={FILL_IN_GENDER}
                       name="exerciseType" value={FILL_IN_GENDER} onChange={onOptionSelected}/>
                <label htmlFor={FILL_IN_GENDER}>Pronouns</label>
            </div>
            <br/><br/>
            {
                typeOfExercise === FILL_IN_GENDER
                ? <GenderPractice wordList={wordList} />
                : <VocabularyPractice wordList={wordList} />
            }
        </>
    )
}

export default MemoryAid
