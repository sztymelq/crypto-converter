import React, { useState } from 'react';
import './App.css';
import CoinInput from './components/CoinInput/CoinInput';
import coingeckoService from './services/coingecko.service';

export const currencies = ['bitcoin', 'ethereum', 'binancecoin', 'usd', 'eur', 'pln'];


let state = {

}

const updateQuoteState = () => {
    coingeckoService.getQuotes(currencies).then((elo) => {
        state = {
            ...state,
            ...elo
        }
    });
}

updateQuoteState();

function App() {
    // setInterval(() => {
    //     updateQuoteState();
    // }, 30000)

    const [inputValues, setInputValues] = useState({});

    const onInputChange = (coinName, value) => {
        console.log('coinName', coinName);
        console.log('value', value);
    }

  return (
      <div className="root">
          <div className="currencies-list">
              {
                  currencies.map((currencyName) => {
                      return <CoinInput key={currencyName}
                                        coinName={currencyName}
                                        inputValue={inputValues[currencyName]}
                                        callback={onInputChange}></CoinInput>
                  })
              }
          </div>
      </div>
  );
}

export default App;
