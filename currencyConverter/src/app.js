import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
    params: {
        from: 'INR',
        to: 'USD',
        amount: '10'
    },
    headers: {
        'x-rapidapi-key': '8295ab25d5msh29f93dc29538f76p10c8b4jsn389ca70878b6',
        'x-rapidapi-host': 'currency-converter18.p.rapidapi.com'
    }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}