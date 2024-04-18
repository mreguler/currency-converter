import {getRates, storeRates} from "./local-storage"

const CACHE_TIMEOUT = 60000 // Timeout for currency data
// Global variable for caching rates in memory
let timestamp = -1
let BASE = "USD"
let RATES = {}

// External api links
const API_URL = "https://openexchangerates.org/api/"
const APP_ID = "19b25b2d511245769592c95daba1ecf4"

async function getRateFromApi(base) {
    if (base == null || typeof base != "string" || base.length == 0) {
        base = "USD";
    }
    let res = await fetch(API_URL + `latest.json?app_id=${APP_ID}&base=${base}`);

    if (res.ok) {
        return await res.json();
    } else {
        console.error(`Could not request exchange rates from API: ${await res.text()}`);
        return null;
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

// Helper for handling edge cases, base conversions, etc. Excepts rates to eb stored in rates
function convert(code1, code2) {
	if (Object.keys(RATES).indexOf(code1) == -1) {
		console.error(`Invalid country code: ${code1}`);
		return null;
	}
	if (Object.keys(RATES).indexOf(code2) == -1) {
		console.error(`Invalid country code ${code2}`);
		return null;
	}

	return RATES[code2]/RATES[code1]
}

async function getConversion(code1, code2) {
	// Main function for getting currency conversions
	const d = new Date();

	// Check for rates in memory
	console.log(`memory timestamp = ${timestamp}`)
	if (timestamp > 0 && d.getTime() - timestamp < CACHE_TIMEOUT) {
		console.log("rates gotten from memory")
		return convert(code1, code2)
	}

	// Check for rates in localstorage
	let disk_rates = await getRates()
	if (disk_rates['timestamp'] == null || d.getTime() - disk_rates[timestamp] > CACHE_TIMEOUT) {
		// Pull from API
		disk_rates = await getRateFromApi("USD")
		storeRates(disk_rates, "USD")
		disk_rates['timestamp'] = d.getTime()
		console.log("rates gotten from api")
	}

	// Update rates in memory and return conversion
	RATES = disk_rates['rates']
	BASE = disk_rates['base']
	timestamp = disk_rates['timestamp']
	console.log("rates gotten from disk")
	console.log(timestamp)
	return convert(code1, code2)
}

// Currency utilities
const CODE_TO_UNICODE = {
	"ALL": "Lek",
	"AFN": "؋",
	"ARS": "$",
	"AWG": "ƒ",
	"AUD": "$",
	"AZN": "₼",
	"BSD": "$",
	"BBD": "$",
	"BYN": "Br",
	"BZD": "BZ$",
	"BMD": "$",
	"BOB": "$b",
	"BAM": "KM",
	"BWP": "P",
	"BGN": "лв",
	"BRL": "R$",
	"BND": "$",
	"KHR": "៛",
	"CAD": "$",
	"KYD": "$",
	"CLP": "$",
	"CNY": "¥",
	"COP": "$",
	"CRC": "₡",
	"HRK": "kn",
	"CUP": "₱",
	"CZK": "Kč",
	"DKK": "kr",
	"DOP": "RD$",
	"XCD": "$",
	"EGP": "£",
	"SVC": "$",
	"EUR": "€",
	"FKP": "£",
	"FJD": "$",
	"GHS": "¢",
	"GIP": "£",
	"GTQ": "Q",
	"GGP": "£",
	"GYD": "$",
	"HNL": "L",
	"HKD": "$",
	"HUF": "Ft",
	"ISK": "kr",
	"INR": "₹",
	"IDR": "Rp",
	"IRR": "﷼",
	"IMP": "£",
	"ILS": "₪",
	"JMD": "J$",
	"JPY": "¥",
	"JEP": "£",
	"KZT": "лв",
	"KPW": "₩",
	"KRW": "₩",
	"KGS": "лв",
	"LAK": "₭",
	"LBP": "£",
	"LRD": "$",
	"MKD": "ден",
	"MYR": "RM",
	"MUR": "₨",
	"MXN": "$",
	"MNT": "₮",
	"MZN": "MT",
	"NAD": "$",
	"NPR": "₨",
	"ANG": "ƒ",
	"NZD": "$",
	"NIO": "C$",
	"NGN": "₦",
	"NOK": "kr",
	"OMR": "﷼",
	"PKR": "₨",
	"PAB": "B/.",
	"PYG": "Gs",
	"PEN": "S/.",
	"PHP": "₱",
	"PLN": "zł",
	"QAR": "﷼",
	"RON": "lei",
	"RUB": "₽",
	"SHP": "£",
	"SAR": "﷼",
	"RSD": "Дин.",
	"SCR": "₨",
	"SGD": "$",
	"SBD": "$",
	"SOS": "S",
	"ZAR": "R",
	"LKR": "₨",
	"SEK": "kr",
	"CHF": "CHF",
	"SRD": "$",
	"SYP": "£",
	"TWD": "NT$",
	"THB": "฿",
	"TTD": "TT$",
	"TRY": "₺",
	"TVD": "$",
	"UAH": "₴",
	"GBP": "£",
	"USD": "$",
	"UYU": "$U",
	"UZS": "лв",
	"VEF": "Bs",
	"VND": "₫",
	"YER": "﷼",
	"ZWD": "Z$",
}

const UNICODE_TO_CODE = {}
Object.keys(CODE_TO_UNICODE).forEach(key => {
	UNICODE_TO_CODE[CODE_TO_UNICODE[key]] = key
})

export {getRateFromApi, CODE_TO_UNICODE, UNICODE_TO_CODE, getConversion}