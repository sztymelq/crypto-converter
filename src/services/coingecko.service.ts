import axios from 'axios';
import { currencies } from '../App';

const coingeckoService = {
    getQuotes(coinIds) {
        return axios.get(
            'https://api.coingecko.com/api/v3/simple/price',
            { params: {
                    vs_currencies: currencies.join(','),
                    ids: coinIds.join(',')
                } }
            )
    }
};

export default coingeckoService;
