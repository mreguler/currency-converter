// File for managing requests to external apis
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

export {getRateFromApi, CODE_TO_UNICODE}