import { CODE_TO_UNICODE } from "./api";

const CURRENCY_REGEX = /(\d+).*?(\p{Sc}).*?/u

// Functions for manipulating text on page
function pageManip() {
    // TODO: Find all instances of currency amounts on page
    const list = document.getElementsByTagName("li"); // FIXME:
    for (let i=0; i<list.length; i++) {
        if (list[i].innerHTML.search(CURRENCY_REGEX) >= 0) {
            list[i].style.color = "red"
            list[i].innerHTML += " (XXX) YYY"
        }
    }

    // TODO: Replace instances with appropriate CSS changes
}

export default pageManip