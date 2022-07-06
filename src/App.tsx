import React, { useState } from 'react';
import './App.scss';
import CoinInput from './components/CoinInput/CoinInput';
import coingeckoService from './services/coingecko.service';

export const currencies = ['bitcoin', 'ethereum', 'binancecoin', 'usd', 'eur', 'pln'];

const coinSymbols = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    binancecoin: 'BNB',
    usd: 'USD',
    eur: 'EUR',
    pln: 'PLN'
}

const defaultInputValues = currencies.reduce((acc, next) => ({
        ...acc,
        [next]: ''
    }), {})

let quotes = {}

const updateQuoteState = () => {
    coingeckoService.getQuotes(currencies).then(({data}) => {
        const dollar = data.usd;

        quotes = {
            ...quotes,
            ...data,
            eur: {
                usd: 1 / dollar.eur
            },
            pln: {
                usd: 1 / dollar.pln
            }
        }
    });
}

updateQuoteState();

function App() {
    // setInterval(() => {
    //     updateQuoteState();
    // }, 30000)

    const [inputValues, setInputValues] = useState(defaultInputValues);

    const calculateAllPrices = (coinName, value) => {
        if (value === '') {
            setInputValues(defaultInputValues)
            return;
        }
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
                  currencies.map((currencyId) => {
                      return <CoinInput key={currencyId}
                                        coinSymbol={coinSymbols[currencyId]}
                                        coinId={currencyId}
                                        inputValue={inputValues[currencyId]}
                                        callback={calculateAllPrices}></CoinInput>
                  })
              }
          </div>
      </div>
  );
}

export default App;
