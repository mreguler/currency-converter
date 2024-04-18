import { getCurrencies, populateCurrencies } from './currencies.js';
import { getPreferences, setPreferences } from './local-storage.js';

document.addEventListener('DOMContentLoaded', async function() {
  const fromCurrencyDropdown = document.getElementById('from-currency');
  const toCurrencyDropdown = document.getElementById('to-currency');

  const currencies = await getCurrencies();
  console.log(currencies);
  populateCurrencies(fromCurrencyDropdown, currencies);
  populateCurrencies(toCurrencyDropdown, currencies);

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

    const endpoint = `https://openexchangerates.org/api/latest.json`;
    const appId = '19b25b2d511245769592c95daba1ecf4';

    fetch(`${endpoint}?app_id=${appId}&symbols=${toCurrency}&base=${fromCurrency}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        document.getElementById('result').textContent = `${toCurrency} ${result.toFixed(2)}`;
      })
      .catch(error => {
        console.error('Error fetching conversion rate:', error);
        document.getElementById('result').textContent = 'Error fetching data.';
      });
});