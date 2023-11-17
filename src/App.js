// Импортирование стилей и компонентов
import "./App.css";
import { Field, Keyboard, GameOver } from './components';
import { createContext, useEffect, useState } from "react";
import { fieldDefault, generateWordSet } from './components/Words';
import React from "react";

// Создаем контекст
export const AppContext = createContext();

function App() {
  // хук useState для обновления состояния
  const [field, setField] = useState(fieldDefault);
  const [currAtt, setCurrAtt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setCurrWord] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false
  });

  useEffect(() => {
    generateWordSet()
      .then(words => {
        setCurrWord(words.wordSet);
        setCorrectWord(words.todaysWord);
      });
  }, [])

  const onSelectKey = (keyValue) => {
    if (currAtt.letterPos > 4) return;
    const newField = [...field];
    newField[currAtt.attempt][currAtt.letterPos] = keyValue;
    setField(newField);
    setCurrAtt({ ...currAtt, letterPos: currAtt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAtt.letterPos === 0) return;
    const newField = [...field];
    newField[currAtt.attempt][currAtt.letterPos - 1] = '';
    setField(newField);
    setCurrAtt({ ...currAtt, letterPos: currAtt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAtt.letterPos !== 5) return;

    let currectWord = '';
    for (let i = 0; i < 5; i++) {
      currectWord += field[currAtt.attempt][i];
    }

    if (wordSet.has(currectWord.toLowerCase())) {
      setCurrAtt({ attempt: currAtt.attempt + 1, letterPos: 0 })
    } else {
      alert("Word not found");
    }

    if (currectWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAtt.attempt === 6) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  // возвращаем JSX разметку, Внутри (навигационная панель, 
  // основная игровая часть внутри обертки AppContext для предоставления доступа к данным внутри)
  return (
    <div className="App">
      <div className="container">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        field,
        setField,
        currAtt,
        setCurrAtt,
        onEnter,
        onDelete,
        onSelectKey,
        correctWord,
        setDisabledLetters,
        disabledLetters,
        gameOver,
        setGameOver
      }}>
        <div className="game">
          <Field />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>

      </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
