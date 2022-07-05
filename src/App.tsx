import React, { useState } from 'react';
import './App.scss';
import CoinInput from './components/CoinInput/CoinInput';
import coingeckoService from './services/coingecko.service';

export const currencies = ['bitcoin', 'ethereum', 'binancecoin', 'usd'];

let quotes = {}

const updateQuoteState = () => {
    coingeckoService.getQuotes(currencies).then(({data}) => {
        quotes = {
            ...quotes,
            ...data
        }
    });
}

updateQuoteState();

function App() {
    // setInterval(() => {
    //     updateQuoteState();
    // }, 30000)

    const [inputValues, setInputValues] = useState({
        bitcoin: 0,
        ethereum: 0,
        binancecoin: 0,
        usd: 0
    });

    const calculateAllPrices = (coinName, value) => {
        const referenceUSD: number = quotes[coinName].usd * value;
        const newInputValues = Object.keys(inputValues).reduce((acc, key) => {
            if (quotes[key]) {
                return {
                    ...acc,
                    [key]: referenceUSD / quotes[key].usd
                }
            }
            return acc;
        }, inputValues);

        setInputValues(newInputValues);
    }

  return (
      <div className="root">
          <div className="title">Crypto Converter</div>
          <div className="currencies-list">
              {
                  currencies.map((currencyName) => {
                      return <CoinInput key={currencyName}
                                        coinName={currencyName}
                                        inputValue={inputValues[currencyName]}
                                        callback={calculateAllPrices}></CoinInput>
                  })
              }
          </div>
      </div>
  );
}

export default App;
