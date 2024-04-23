import { getCurrencies, populateCurrencies } from './currencies.js';
import { getConversion } from '/src/api.js';

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
    
    if (fromCurrency === 'Choose original currency' || toCurrency === 'Choose target currency') {
      alert('Please select valid currencies');
      return;
    }
    
    getConversion(fromCurrency.substring(0, 3), toCurrency.substring(0, 3)).then(result => {
      document.getElementById('result').textContent = `${fromCurrency} ${amount} = ${toCurrency} ${(result * amount).toFixed(2)}`}); 
});