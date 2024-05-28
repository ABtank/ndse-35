const https = require('https');
let myAPIKey = '';

function setAPIKey(key) {
    myAPIKey = key;
}

async function searchCity(search) {
    const url = `https://api.weatherapi.com/v1/search.json?q=${search}&key=${myAPIKey}`
    let cities = [];
    let statusCode = 500;
    let error = '';
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            statusCode = res.statusCode
            if (statusCode !== 200) {
                console.log(`statusCode: ${statusCode}`);
                resolve({ 'statusCode': statusCode, 'data': cities, 'error': error });
                return;
            }

            res.setEncoding('utf8')
            let data = ''
            res.on('data', (chank) => { data += chank })
            res.on('end', () => {
                let parseData = JSON.parse(data)
                if (Array.isArray(parseData)) cities = data;
                resolve({ 'statusCode': statusCode, 'data': cities, 'error': error })
            })

        }).on('error', (error) => {
            console.log(error)
            reject(error);
        })
    })
}

async function current (city) {
    const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${myAPIKey}`;
    console.log(url)
    let dataRes = [];
    let statusCode = 500;
    let error = '';
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            statusCode = res.statusCode
            if (statusCode !== 200) {
                console.log(`statusCode: ${statusCode}`);
                resolve({ 'statusCode': statusCode, 'data': dataRes, 'error': error });
                return;
            }

            res.setEncoding('utf8')
            let data = ''
            res.on('data', (chank) => { data += chank })
            res.on('end', () => {
                resolve({ 'statusCode': statusCode, 'data': data, 'error': error })
            })

        }).on('error', (error) => {
            console.log(error)
            reject(error);
        })
    })
}



module.exports = {
    setAPIKey,
    searchCity,
    current
};
