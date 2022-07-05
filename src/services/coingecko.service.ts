import axios from 'axios';

const coingeckoService = {
    getQuotes(coinIds) {
        return axios.get(
            'https://api.coingecko.com/api/v3/simple/price',
            { params: {
                    vs_currencies: `usd,eur,pln`,
                    ids: coinIds.join(',')
                } }
            )
    }
};

export default coingeckoService;
