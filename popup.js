import { getCurrencies, populateCurrencies } from './currencies.js';

document.addEventListener('DOMContentLoaded', function() {
  const fromCurrencyDropdown = document.getElementById('from-currency');
  const toCurrencyDropdown = document.getElementById('to-currency');

  getCurrencies().then(currencies => {
    console.log(currencies);
    populateCurrencies(fromCurrencyDropdown, currencies);
    populateCurrencies(toCurrencyDropdown, currencies);
  });
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
