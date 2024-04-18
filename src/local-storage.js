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
    try {
        rates["base"] = base;
        const d = new Date();
        rates["timestamp"] = d.getTime();
        await chrome.storage.local.set(rates);
        return true;
    } catch (error) {
        console.error('Error storing rates:', error);
        return false;
    }
}

async function getRates() {
    try {
        return await chrome.storage.local.get(["base", "timestamp", "rates"]);
    } catch (error) {
        console.error('Error getting rates:', error);
        return null;
    }
}

async function getPreferences() {
    try {
        const data = await chrome.storage.local.get("defaultCurrency");
        return data.defaultCurrency;
    } catch (error) {
        console.error('Error getting preferences:', error);
        return null;
    }
}

async function setPreferences(defaultCurrency) {
    try {
        await chrome.storage.local.set({defaultCurrency});
        return true;
    } catch (error) {
        console.error('Error setting preferences:', error);
        return false;
    }
}

export {storeRates, getRates, getPreferences, setPreferences}