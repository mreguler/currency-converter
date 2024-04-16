// File for getting/setting local storage values

/**
 * Given key, value pairs of currency in rates along with base currency, store exchange rates in
 * local storage using chrome.storage.local along with current time
 * 
 * @param {Object} rates 
 * @param {string} base
 * 
 * @returns boolean true on success, false on failure
 */
async function storeRates(rates, base) {
    rates["base"] = base;
    const d = new Date();
    rates["timestamp"] = d.getTime();
    await chrome.storage.local.set(rates);
    return true;
}

async function getRates() {
    return await chrome.storage.local.get(["base", "timestamp", "rates"]);
}

async function getPreferences() {
    // TODO: implement
}

async function setPreferences() {
    // TODO: implement
}

export {storeRates, getRates, getPreferences, setPreferences}