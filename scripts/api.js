// File for managing requests to external apis

const API_URL = "https://openexchangerates.org/api/"
const APP_ID = "19b25b2d511245769592c95daba1ecf4"

async function get_rate() {
    let res = await fetch(API_URL + `latest.json?app_id=${APP_ID}`)
    return await res.json();
};

get_rate()