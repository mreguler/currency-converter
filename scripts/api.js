// File for managing requests to external apis

const API_URL = "https://openexchangerates.org/api/"
const APP_ID = "19b25b2d511245769592c95daba1ecf4"

async function get_rate(base) {
    if (base == null || typeof base != "string" || base.length == 0) {
        base = "USD";
    }
    let res = await fetch(API_URL + `latest.json?app_id=${APP_ID}&base=${base}`);

    if (res.ok) {
        return await res.json();
    } else {
        console.error(`Could not request exchange rates from API: ${await res.text()}`);
    }
}

async function get_currencies() {
    let res = await fetch(API_URL + `currencies.json?app_id=${APP_ID}`);
    if (res.ok) {
        return await res.json();
    } else {
        console.error(`Could not request currencies from API: ${await res.text()}`);
    }
}