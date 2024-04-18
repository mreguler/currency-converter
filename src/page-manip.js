import { UNICODE_TO_CODE, getConversion } from "./api";

const CURRENCY_REGEX = /(\d+).*?(\p{Sc}).*?/u

// Functions for manipulating text on page
async function pageManip(base) {
    // Check headers, paragraphs, lists, (FIXME: add others) for currencies
    const list = document.querySelectorAll("li, p, h, div");
    let m;
    for (let i=0; i<list.length; i++) {
        m = list[i].innerHTML.match(CURRENCY_REGEX)
        if (m != null) {
            console.log(`${m[1]}, ${m[2]}, ${UNICODE_TO_CODE[m[2]]}, ${base}`)
            getConversion(base, UNICODE_TO_CODE[m[2]]).then(newValue => {
                list[i].style.color = "blue"
                list[i].innerHTML = list[i].innerHTML.replace(m[1], newValue)
                list[i].innerHTML = list[i].innerHTML.replace(m[2], base)
            })
        }
    }

    // TODO: Replace instances with appropriate CSS changes
}

export default pageManip