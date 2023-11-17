import React, { useContext } from 'react';
import { AppContext } from '../App';

function Key({ keyValue, middleKey, disabled }) {
    const { onSelectKey, onEnter, onDelete } = useContext(AppContext);

    const selectLetter = () => {
        if (keyValue === 'ENTER') {
            onEnter();
        } else if (keyValue === 'DELETE') {
            onDelete();
        } else {
            onSelectKey(keyValue);
        }
    }
    return (
        <div className='key' id={middleKey ? "middle" : disabled && "disabled" } onClick={selectLetter}>
            {keyValue}
        </div>
    );
}

export default Key;