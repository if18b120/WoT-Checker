// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");



async function bra () {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType() === 'image') {
            request.abort();
        } else {
            request.continue();
        }
    });
    await page.goto("https://eu.wargaming.net/shop/wot/vehicles/", {waitUntil: ["networkidle0"]});
    await page.waitForSelector("#onetrust-accept-btn-handler");
    await page.click("#onetrust-accept-btn-handler");
    new RegExp(process.argv[2], "ig").test(await page.content()) ? process.exitCode = 0 : process.exitCode = 1;
    await browser.close();
}

bra();

