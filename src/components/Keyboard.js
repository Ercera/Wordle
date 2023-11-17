import React, { useContext, useCallback, useEffect } from 'react'
import { AppContext } from '../App';
import Key from './Key';

function Keyboard() {
    const { onSelectKey, onDelete, onEnter, disabledLetters } = useContext(AppContext);

    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const manualKeyboard = useCallback(event => {
        if (event.key === "Enter") {
            onEnter();
        } else if (event.key === "Backspace") {
            onDelete();
        } else {
            ([...keys1, ...keys2, ...keys3]).forEach(key => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectKey(key)
                }
            })
        };
    });

    useEffect(() => {
        document.addEventListener('keydown', manualKeyboard);
        return () => {
            document.removeEventListener('keydown', manualKeyboard)
        };
    }, [manualKeyboard]);

    return (
        <div className='keyboard' onKeyDown={manualKeyboard}>
            <div className='line1'>
                {keys1.map(key => {
                    return <Key keyValue={key} disabled={disabledLetters.includes(key)} />;
                })}
            </div>
            <div className='line2'>
                {keys2.map(key => {
                    return <Key keyValue={key} disabled={disabledLetters.includes(key)} />;
                })}
            </div>
            <div className='line3'>
                <Key keyValue={'ENTER'} middleKey />
                {keys3.map(key => {
                    return <Key keyValue={key} disabled={disabledLetters.includes(key)} />;
                })}
                <Key keyValue={'DELETE'} middleKey />
            </div>

        </div>
    )
}

export default Keyboard;