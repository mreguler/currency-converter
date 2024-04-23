import pageManip from "./page-manip"

chrome.storage.local.get(["to"]).then(res => {
    pageManip(res["to"]);
})