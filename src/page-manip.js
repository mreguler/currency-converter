import { CODE_TO_UNICODE, UNICODE_TO_CODE, getConversion } from "./api";

const CURRENCY_REGEX = /(\d+\.?\d+).*?(\p{Sc})/u // Normal replacement
const CURRENCY_REGEX2 = /(\p{Sc}).*?(\d+\.?\d+).*?/u // Ass-backwards replacement
const CURRENCY_REGEX3 = ""

// Functions for manipulating text on page
async function pageManip(to) {
    // GetConversion once to cache data into memory
    await getConversion("USD", "USD");

    // Check headers, paragraphs, lists, (FIXME: add others) for currencies
    const list = document.querySelectorAll("li, p, h, div, span");
    // Look for simple replacements
    for (let i=0; i<list.length; i++) {
        let m = list[i].innerHTML.match(CURRENCY_REGEX)
        if (m != null) {
            getConversion(UNICODE_TO_CODE[m[2]], to).then(newValue => {
                list[i].innerHTML += ` <mark>(${newValue*Number.parseFloat(m[1])} ${CODE_TO_UNICODE[to]})<mark>`
            })
        }
    }
    // Look for "compound" prices -- where one of whole, decimal, and symbol are in separate elements
}

export default pageManip