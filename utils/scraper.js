const puppeteer = require("puppeteer");
const Chain = require("@entrptaher/pup-chain");
const devices = require("puppeteer/DeviceDescriptors");

const iPhone = devices["iPhone 8"];
const URL = "http://artpix";

const scrapeHomePage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("request", req => {
    // Don't load Google Analytics lib requests so pageviews aren't 2x.
    const blacklist = [
      "www.google-analytics.com",
      "/gtag/js",
      "ga.js",
      "analytics.js"
    ];
    if (blacklist.find(regex => req.url().match(regex))) {
      return req.abort();
    }
    return req.continue();
  });
  const chain = await new Chain(page);
  await chain
    .emulate(iPhone)
    .goto(URL)
    .click("[href$=product/rectangle]")
    .screenshot({ path: "ex.png" })
    .series();

  await browser.close();
};

module.exports = {
  scrapeHomePage
};
