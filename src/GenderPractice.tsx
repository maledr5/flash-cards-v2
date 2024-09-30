import React, { FC, useEffect, useRef, useState } from "react";
import { Word } from "./hooks/useVocabulary"
import { getRandomWord, getWordsByType, wordTypes } from "./vocabulary/wordHelper";

type GenderPracticeProps = {
    wordList: Word[]
}

enum pronouns {
    DER = "der",
    DIE = "die",
    DAS = "das"
}

const GenderPractice: FC<GenderPracticeProps> = ({ wordList }) => {
    const nouns = getWordsByType(wordList, wordTypes.NOUN)
    const [randomNoun, setRandomNoun] = useState(getRandomWord(nouns))
    const [feedback, setFeedback] = useState("Type your answer")

    const isAnswerCorrect = (answer: string) => {
        if (answer === "") return false
        return randomNoun.pronoun === answer.toLowerCase().trim()
    }

    const checkForCorrectAnswer = (selectedPronoun: pronouns) => {
        isAnswerCorrect(selectedPronoun) ?
            setFeedback("Correct!") :
            setFeedback(`Sorry, right pronoun is: ${randomNoun.pronoun}`)
        setRandomNoun(getRandomWord(nouns))
    }

    // @ts-ignore
    const onOptionClicked = (event: MouseEvent<HTMLButtonElement>) => {
        const selectedPronoun = event?.target?.value
        checkForCorrectAnswer(selectedPronoun)
    }

    const onKeyDownHandler = (event: any) => {
        let selectedPronoun = pronouns.DER
        switch (event.key) {
            case "s":
                selectedPronoun = pronouns.DER
                break
            case "d":
                selectedPronoun = pronouns.DIE
                break
            case "f":
                selectedPronoun = pronouns.DAS
                break
        }
        console.log("selected pronoun: ", selectedPronoun)
        checkForCorrectAnswer(selectedPronoun)
    }

    const divRefForKeyDownEvent = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRefForKeyDownEvent.current) {
            divRefForKeyDownEvent.current.onkeydown = onKeyDownHandler
        }
    }, [onKeyDownHandler])

    return (
        <div>
            {
                nouns.length > 0 ? 
                <div ref={divRefForKeyDownEvent}>
                    <h1>{randomNoun.singular}</h1>
                    <button autoFocus onClick={onOptionClicked} value={pronouns.DER}>{pronouns.DER}</button>
                    <button onClick={onOptionClicked} value={pronouns.DIE}>{pronouns.DIE}</button>
                    <button onClick={onOptionClicked} value={pronouns.DAS}>{pronouns.DAS}</button>
                    <h2>{feedback}</h2>
                </div> : 
                <p>No nouns available</p>
            }
        </div>
    )
}

export default GenderPractice
