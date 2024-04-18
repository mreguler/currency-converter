import { CODE_TO_UNICODE, UNICODE_TO_CODE, getConversion } from "./api";

const CURRENCY_REGEX = /(\d+\.?\d+).*?(\p{Sc}).*?/u

// Functions for manipulating text on page
async function pageManip(base) {
    // Check headers, paragraphs, lists, (FIXME: add others) for currencies
    const list = document.querySelectorAll("li, p, h, div");
    for (let i=0; i<list.length; i++) {
        let m = list[i].innerHTML.match(CURRENCY_REGEX)
        if (m != null) {
            getConversion(UNICODE_TO_CODE[m[2]], base).then(newValue => {
                console.log(`${m[1]}, ${m[2]}, ${UNICODE_TO_CODE[m[2]]}, ${base}, ${newValue}`)
                list[i].innerHTML += ` <mark>(${newValue*Number.parseFloat(m[1])} ${CODE_TO_UNICODE[base]})<mark>`
            })
        }
    }
}

export default pageManip