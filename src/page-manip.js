import { CODE_TO_UNICODE, UNICODE_TO_CODE, getConversion } from "./api";

const CURRENCY_REGEX = /(\d+\.?\d+)\s*?(\p{Sc})/u // Normal replacement
const CURRENCY_REGEXB = /(\p{Sc})\s*?(\d+\.?\d+)/u // Ass-backwards replacement
// @Amazon - different parts of price are in different html tags
const PRICE_REGEX = /(\d+\.?\d*)/ // May or may not be decimal amount following

function formatPrice(conversion, oldVal) {
    return `${(Math.round(conversion*oldVal*100)/100).toFixed(2)}`
}

function formatMark(price, symbol) {
    var mark = document.createElement("mark")
    mark.innerText = ` ${price} ${symbol} `
    return mark
}

function commaParse(str) {
    return str?.replace(",","") || ""
}

// Functions for manipulating text on page
async function pageManip(to) {
    // GetConversion once to cache data into memory
    await getConversion("USD", "USD");

    // Check headers, paragraphs, lists, (FIXME: add others) for currencies
    const list = document.querySelectorAll("li, ul, p, h, div, span, form, a, select, input");
    // Traverse the list backwards and keep track of which elements we've modified to avoid duplicate mods
    // Not the most efficient method, but should be fast enough for reasonably sized web pages
    const modifiedElements = []
    for (let i=list.length-1; i>=0; i--) {
        // FIXME: America-centric removal of commas (assumes comma is thousands delimiter instead of decimal delimiter)
        let parsedTextContent = commaParse(list[i].textContent)
        let m = parsedTextContent.match(CURRENCY_REGEX)
        let mb = parsedTextContent.match(CURRENCY_REGEXB)
        let mc = parsedTextContent.match(/\p{Sc}/u)
        // Skip if there's a risk we fuck up a script tag
        let scripts = list[i].querySelectorAll("script")
        let danger = false;
        if (scripts.length != 0) {
            for (let j=0; j<scripts.length; j++) {
                if (m != null && commaParse(scripts[j].textContent).includes(m[0])) {
                    danger = true;
                    break;
                }
                if (mb != null && commaParse(scripts[j].textContent).includes(mb[0])) {
                    danger = true;
                    break;
                }
                if (m == null && mb == null && mc != null && commaParse(scripts[j].textContent).includes(mc[0])) {
                    danger = true;
                    break;
                }
            }
        }

        // Skip if the visibility of the element is false
        if (!list[i].checkVisibility() || list[i].offsetParent === null) {
            danger = true;
        }

        // Skip if we've modified a child element
        let children = list[i].children
        for (let j=0; j<children.length; j++) {
            if (modifiedElements.includes(children[j])) {
                if (m != null && commaParse(children[j].textContent).includes(m[0])) {
                    danger = true;
                    break;
                }
                if (mb != null && commaParse(children[j].textContent).includes(mb[0])) {
                    danger = true;
                    break;
                }
            }
        }

        if (danger) {
            modifiedElements.push(list[i])
            continue;
        }

        // Look for simple replacements
        let newValue = 0
        if (m != null) {
            newValue = await getConversion(UNICODE_TO_CODE[m[2]], to);
            if (newValue != 0) {
                list[i].appendChild(formatMark(formatPrice(newValue, Number.parseFloat(m[1])), CODE_TO_UNICODE[to]))
                modifiedElements.push(list[i])
            }
        } else if (mb != null) {
            newValue = await getConversion(UNICODE_TO_CODE[mb[1]], to);
            if (newValue != 0) {
                list[i].appendChild(formatMark(CODE_TO_UNICODE[to], formatPrice(newValue, Number.parseFloat(mb[2]))))
                modifiedElements.push(list[i])
            }
        } else if (mc != null) {
            // Look for "compound" prices -- where one of whole, decimal, and symbol are in separate elements
            // Look for a currency symbol and one/two sibling element(s) with a number
            let prev = list[i].previousElementSibling
            let prev2 = prev?.previousElementSibling
            let next = list[i].nextElementSibling
            let next2 = next?.nextElementSibling

            // Combine forwards and backwards to try and create a match
            let prevPrice = ""
            prevPrice += prev2?.textContent?.replace(",", "") || ""
            prevPrice += prev?.textContent?.replace(",", "") || ""
            let nextPrice = ""
            nextPrice += next?.textContent?.replace(",", "") || ""
            nextPrice += next2?.textContent?.replace(",", "") || ""

            let mprev = prevPrice.match(PRICE_REGEX)
            let mnext = nextPrice.match(PRICE_REGEX)
            // Length checks are essentially heuristics to make sure we're not pulling some random huge element
            if (mprev != null && prevPrice.length < 100) {
                newValue = await getConversion(UNICODE_TO_CODE[mc[0]], to)
                if (newValue != 0) {
                    list[i].appendChild(formatMark(formatPrice(newValue, Number.parseFloat(mprev[1])), CODE_TO_UNICODE[to]))
                    modifiedElements.push(list[i])
                    modifiedElements.push(list[i].lastChild)
                }
            } else if (mnext != null && nextPrice.length < 100) {
                newValue = await getConversion(UNICODE_TO_CODE[mc[0]], to)
                if (newValue != 0) {
                    list[i].prepend(formatMark(CODE_TO_UNICODE[to], formatPrice(newValue, Number.parseFloat(mnext[1]))))
                    modifiedElements.push(list[i])
                    modifiedElements.push(list[i].firstChild)
                }
            }
        }
    }
}

export default pageManip