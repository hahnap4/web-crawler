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
    try{
    const dom = new JSDOM(htmlBody, {
        includeNodeLocations: true,
    });
    const document = dom.window.document;
    const links = document.querySelectorAll('a');

    const hrefArray = [];

    for (let i = 0; i < links.length; i++) {
        let url = links[i].href;

                if(url.includes('http') === false){
                    url = baseURL + url;
                }

                hrefArray.push(url);
    }

    return hrefArray;
} catch (err) {
    throw new Error(err);
}
}

async function crawlPage(baseURL, currentURL, pages) {
            const currentUrlObj = new URL(currentURL);
            const baseUrlObj = new URL(baseURL);
            if (currentUrlObj.hostname !== baseUrlObj.hostname) {
            return pages;
            }

            const normalizedURL = normalizeURL(currentURL);
            if (pages[normalizedURL] > 0){
                pages[normalizedURL]++;
                console.log(`Added +1 to ${pages[normalizedURL]}`);
                return pages;
            } 
            
            pages[normalizedURL] = 1;

            let html = '';

            try{
            console.log(`starting fetch for ${currentURL}...`);
            const response = await fetch(currentURL);
        
            if (response.status > 399) {
                console.error(response.status);
                return pages;
            }
            
            console.log('crawling starting - ' + currentURL);
    
            const contentType = response.headers.get('content-type');
            if (contentType.includes('text/html') === false) {
                console.error(`Error: invalid content-type - ${contentType}. Need text/html instead.`);
                return pages;
            }
    
            html = await response.text();
            } catch (e) {
                console.error(e);
            } 

            const urlArray = getURLsFromHTML(html, baseURL); 
            
            for (const url of urlArray){
                    pages = await crawlPage(baseURL, url, pages);
            }

            return pages;
}

exports.normalizeURL = normalizeURL;
exports.getURLsFromHTML = getURLsFromHTML;
exports.crawlPage = crawlPage;