import React, { useContext } from 'react'
import { AppContext } from '../App';

function GameOver() {
    const {gameOver, currAtt, correctWord} = useContext(AppContext);
  return (
    <div className="gameOver">
        <h3>{gameOver.guessedWord ? "Вы угадали! Победа!" : "Увы, попытайтесь снова..."}</h3>
        <h1>Нужное слово : {correctWord}</h1>
        {gameOver.guessedWord && (<h3>Ты угадал за {currAtt.attempt} попытки</h3>)}
    </div>
  )
}

export default GameOver;