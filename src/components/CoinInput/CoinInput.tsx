import React, { FC, useState } from 'react';
import styles from './CoinInput.module.scss';

interface CoinInputProps {
    coinId: string;
    inputValue: number;
    callback: (coinName, value) => void;
    coinSymbol: string;
}

const CoinInput: FC<CoinInputProps> = ({ coinId, inputValue, callback, coinSymbol }) => {
    const [_, setValue] = useState(inputValue);

    const onInputChange = ({ target }) => {
        if (!isNaN(target.value)) {
            setValue(target.value);
            callback(coinId, target.value);
        }
    };

    return (
        <div className={styles.CoinInput}>
            <label htmlFor={coinId}>{coinSymbol}</label>
            <input id={coinId}
                   type="number"
                   step="0.1"
                   value={inputValue}
                   onChange={onInputChange}/>
        </div>
    );
}

export default CoinInput;
