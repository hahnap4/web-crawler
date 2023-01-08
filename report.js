function sortPages(pages) {
        const pageEntries = Object.entries(pages);
        
        const sortedEntries = pageEntries.sort((a, b) => b[1] - a[1]);

        return sortedEntries;
}

function printReport(pages) {
    console.log("report is starting...");

    const sortedPages = sortPages(pages);
    
    for (let i = 0; i < 1; i++) {
        for (const sortedPage of sortedPages) {
            const url = sortedPage[0];
            const count = sortedPage[1]; 
            console.log(`Found ${count} internal links to ${url}`);
        }
    }
}

exports.sortPages = sortPages;
exports.printReport = printReport;