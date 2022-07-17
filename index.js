const puppeteer = require('puppeteer')
const fs = require('fs')

let crawlURLs = [
  'https://quizlet.com/301744296/toeic-flash-cards/'
]
let exportURL = './result'

crawlURLs.forEach(async (crawlURL) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  console.log(`Going to ${crawlURL}`)
  await page.goto(crawlURL, { waitUntil: 'networkidle0' })

  console.log(`Getting title`)
  const setTitle = await page.evaluate(() => document.querySelector('.SetPage-titleWrapper h1').innerText)

  console.log(`Getting items`)
  const setItems = await page.evaluate(() => {
    let itemNodes = [...document.querySelectorAll('div.SetPageTerm-content')]

    let itemsChildNodes = [...itemNodes.map(e => ({
      childNode: e.childNodes
    }))]

    let terms = itemsChildNodes.map(e => (e.childNode[0].querySelector(".TermText").innerHTML))
    let definitions = itemsChildNodes.map(e => (e.childNode[1].querySelector(".TermText").innerHTML))

    let items = []

    for (let i = 0; i < terms.length; i++) {
      items.push({
        type: "term-def",
        term: terms[i],
        definition: definitions[i].replace("<br>", "\\n"),
        _id: "new ObjectId()"
      })
    }

    return items
  })

  try {
    if (!fs.existsSync(`${exportURL}`)) {
      fs.mkdir(`${exportURL}`, err => {
        if (err) return console.error(err)

        console.log(`Created dir: ${exportURL}/${setTitle}`)
      })
    }

    fs.writeFile(`${exportURL}/${setTitle}.json`, JSON.stringify(setItems), err => {
      if (err) return console.log(err)

      console.log(`Done writing from set: ${setTitle}`)
    })
  } catch (error) {
    console.log(error)
  }
  await browser.close()
})

/*

db.sets.findOneAndUpdate({_id: ObjectId('62d0f94e00f87e001edb2775')}, {$set: {
  items: 
}})

db.sets.deleteMany({name: /Thi sát hạch lý thuyết lái xe B/})

const ansMap = {A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25}

function query (data) {
  data.forEach(d => {
    (d.answers[ansMap[d.correctAnswer]] || {}).isCorrect = true
  }) 
  return data
}

*/