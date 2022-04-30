const puppeteer = require('puppeteer');
const fs = require('fs');

let crawlURLs = [
  'https://quizlet.com/695043520/shopee-chinese-beginner-2-lesson-3-11-flash-cards/'
];
let exportURL = './result';

crawlURLs.forEach(async (crawlURL) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(crawlURL, { waitUntil: 'networkidle0' });

  const setTitle = await page.evaluate(() => {
    t = document.getElementsByClassName('UIHeading UIHeading--one')[0].innerText
    return t;
  })

  const setItems = await page.evaluate(() => {
    let itemNodes = [...document.querySelectorAll('div.SetPageTerm-content')];

    let itemsChildNodes = [...itemNodes.map(e => ({
      childNode: e.childNodes
    }))]

    let terms = itemsChildNodes.map(e => (e.childNode[0].innerText))
    let definitions = itemsChildNodes.map(e => (e.childNode[1].innerText))

    let items = []

    for (let i = 0; i < terms.length; i++) {
      items.push({
        type: "term-def",
        term: terms[i],
        definition: definitions[i],
        _id: "ObjectId()"
      })
    }

    return items;
  });

  try {
    if (!fs.existsSync(`${exportURL}`)) {
      fs.mkdir(`${exportURL}`, err => {
        if (err) return console.error(err);

        console.log(`Created dir: ${exportURL}/${setTitle}`);
      });
    }

    fs.writeFile(`${exportURL}/${setTitle}.json`, JSON.stringify(setItems), err => {
      if (err) return console.log(err);

      console.log(`Done writing from set: ${setTitle}`);
    })
  } catch (error) {
    console.log(error)
  }
  await browser.close();
});
