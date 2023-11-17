import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App';

// создаем функцию, которая принимает два аргумента в виде свойств
// letterPos - позиция буквы, attemptValue - номер попытки. 
function Letter({ letterPos, attemptValue }) {
    
    const {
        field,
        correctWord,
        currAtt,
        setDisabledLetters
    } = useContext(AppContext); // извлекаем данные из контекста AppContext

    const letter = field[attemptValue][letterPos]; // извлекаем букву из массива данных
    const correctWordUpperCase = correctWord.toUpperCase();
    const correct = correctWordUpperCase[letterPos] === letter;
    const partly = letter !== '' && correctWord.toUpperCase().includes(letter);
    const letterState =
        currAtt.attempt > attemptValue && (correct ? 'correct' : partly ? 'partly' : 'error');

    useEffect(() => {
        if (letter !== '' && !correct && !partly) {
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currAtt.attempt]);

    return (
        <div className="letter" id={letterState}>
            {''}
            {letter}
        </div>
    );
}

export default Letter; 