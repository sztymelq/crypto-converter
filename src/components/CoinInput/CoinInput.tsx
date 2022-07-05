import React, { FC, useState } from 'react';
import styles from './CoinInput.module.scss';

interface CoinInputProps {
    coinName: string;
    inputValue: number;
    callback: (coinName, value) => void;
}

const CoinInput: FC<CoinInputProps> = ({ coinName, inputValue, callback }) => {
    const [_, setValue] = useState(inputValue);

    const onInputChange = ({ target }) => {
        if (!isNaN(target.value)) {
            setValue(target.value);
            callback(coinName, target.value);
        }
    };

    return (
        <div className={styles.CoinInput}>
            <label htmlFor={coinName}>{coinName}</label>
            <input id={coinName}
                   type="number"
                   step="0.1"
                   value={inputValue}
                   onChange={onInputChange}/>
        </div>
    );
}

export default CoinInput;
