import React, { FC, useState } from 'react';
import styles from './CoinInput.module.scss';

interface CoinInputProps {
    coinName: string;
    inputValue: number;
    callback: (coinName, value) => void;
}

const CoinInput: FC<CoinInputProps> = ({ coinName, inputValue, callback }) => {
    const [val, setValue] = useState(inputValue);

    const onchange = (e: any) => {
        setValue(e.target.value);
        callback(coinName, e.target.value);
    };

    return (
        <div className={styles.CoinInput}>
            <label htmlFor={coinName}>{coinName}</label>
            <input id={coinName} type="text" value={val} onChange={onchange}/>
        </div>
    );
}

export default CoinInput;
