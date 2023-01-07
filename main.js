function main() {
    console.log()
    if (process.argv.slice(2).length < 1) {
        console.error("Error: Less than 1 argument given");
        process.argv.exit;
    } else if (process.argv.slice(2).length > 1) {
        console.error("Error: More than 1 argument given");
        process.argv.exit;
    } else {
        console.log("The crawler is starting at " + process.argv[2]);
    }
}

main()