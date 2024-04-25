import { getCurrencies, populateCurrencies } from './currencies.js';
import { getPreferences, setPreferences } from '../src/local-storage.js';

const fromCurrencyDropdown = document.getElementById('from-currency');
const toCurrencyDropdown = document.getElementById('to-currency');
const defaultCurrencyDropdown = document.getElementById('default-currency');

document.addEventListener('DOMContentLoaded', async function() {
  const currencies = await getCurrencies();
  console.log(currencies);
  populateCurrencies(fromCurrencyDropdown, currencies);
  populateCurrencies(toCurrencyDropdown, currencies);
  populateCurrencies(defaultCurrencyDropdown, currencies);

  const defaultCurrency = await getPreferences();
  if (defaultCurrency) {
    toCurrencyDropdown.value = defaultCurrency;
  }
});

toCurrencyDropdown.addEventListener('change', async function() {
  const defaultCurrency = this.value;
  try {
    const success = await setPreferences(defaultCurrency);
    if (success) {
      console.log(`Default currency set to ${defaultCurrency}`);
    } else {
      console.log('Error setting default currency');
    }
  } catch (error) {
    console.error('Error setting default currency:', error);
  }
});

document.getElementById('convert').addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (fromCurrency === 'Choose original currency' || toCurrency === 'Choose target currency') {
      alert('Please select valid currencies');
      return;
    }
    
    getConversion(fromCurrency.substring(0, 3), toCurrency.substring(0, 3)).then(result => {
      document.getElementById('result').textContent = `${fromCurrency} ${amount} = ${toCurrency} ${(result * amount).toFixed(2)}`}); 
});

document.getElementById('convert-page')?.addEventListener('click', () => {
    const toCurrency = document.getElementById('to-currency').value;

    if (toCurrency === 'Choose target currency') {
      alert('Please select valid currencies');
      return;
    }

    chrome.storage.local.set({"to": toCurrency}).then(async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["build/main-bundle.js"]
      });
    });
})