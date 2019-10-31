const { scrapeHomePage } = require("./utils/scraper");

(async () => {
  await scrapeHomePage();
})();
