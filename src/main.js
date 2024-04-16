import {getConversion} from "./api"
import pageManip from "./page-manip"

pageManip();
getConversion("USD", "EUR").then((result) => {
    console.log(result)
})