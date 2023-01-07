const { JSDOM } = require('jsdom');

function normalizeURL(url){
    try{
    const urlObj = new URL(url);
    const fullURL = `${urlObj.hostname}${urlObj.pathname}`;
    const lcURL = fullURL.toLowerCase();
    return lcURL;
    } catch(err) {
        throw new Error(err);
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody, {
        includeNodeLocations: true,
    });
    const document = dom.window.document;
    const links = document.querySelectorAll('a');
    let hrefArray = [];

    for (let i = 0; i < links.length; i++) {
        if (links[i].href.startsWith('h')) {
            let url = links[i].href;
            hrefArray.push(url);
        } else {
            let url = links[i].href;
            let normUrl = baseURL+url;
            hrefArray.push(normUrl);
        }
    }

    return hrefArray;
}

exports.normalizeURL = normalizeURL;
exports.getURLsFromHTML = getURLsFromHTML;