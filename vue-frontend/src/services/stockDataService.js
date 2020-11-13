
const baseUrl = 'https://financialmodelingprep.com/api/v3/';
const key = '80052a37cc19b8e06a2018b9f0dfa01b';

async function get(url,params){
    let response = await fetch(`${baseUrl}${url}?apikey=${key}${params}`);
    return await response.json();
}
async function getProfile(symbol){
    return await get(`profile/${symbol}`,'')
}
async function getCompanyQuote(symbol){
    return await get(`quote/${symbol}`,'')
}
async function getStockPrices(symbol) {
    return await get(`historical-price-full/${symbol}`,'&serietype=line&from=2010-01-01')
}
async function getMonthlyStockPrices(symbol) {
    let prices = await getStockPrices(symbol);
    let sorted = prices.historical.sort((a,b) => a.date-b.date);
    let monthly = [];
    let usedMonthes = new Set();
    for(let {date,close} of sorted){
        let split = date.split('-');
        let key = split[0]+'-'+split[1];
        if(!usedMonthes.has(key)){
            monthly.push(close);
            usedMonthes.add(key);  
        }  
    }
    return {
        startYear:Array.from(usedMonthes).sort()[0].split('-')[0],
        prices:monthly.reverse()
    }
}
async function getIncomeStatement(symbol){
    return await get(`income-statement/${symbol}`,'&limit=12');
}

export default {getProfile,getCompanyQuote,getStockPrices,getIncomeStatement,getMonthlyStockPrices}