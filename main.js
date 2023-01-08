const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
    if (process.argv.slice(2).length < 1) {
        console.error("Error: Less than 1 argument given");
        process.argv.exit;
    } 
    
    if (process.argv.slice(2).length > 1) {
        console.error("Error: More than 1 argument given");
        process.argv.exit;
    }
        console.log("The crawler is starting at " + process.argv[2]);
        const pages = await crawlPage(process.argv[2], process.argv[2], {});
        printReport(pages);
}

main()