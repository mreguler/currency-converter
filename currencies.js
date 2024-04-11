export function getCurrencies() {
    return fetch('https://openexchangerates.org/api/currencies.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was NOT ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

export function populateCurrencies(dropdown, currencies) {
    for (const [code, name] of Object.entries(currencies)) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
        dropdown.appendChild(option);
    }
}