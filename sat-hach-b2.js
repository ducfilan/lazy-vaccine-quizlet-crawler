const puppeteer = require('puppeteer')
const fs = require('fs')
const request = require('request')

let crawlURLs = [
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-1',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-2',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-3',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-4',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-5',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-6',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-7',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-8',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-9',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-10',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-11',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-12',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-13',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-14',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-15',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-16',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-17',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-18',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-19',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-20',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-21',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-22',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-23',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-24',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-25',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-26',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-27',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-28',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-29',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-30',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-31',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-32',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-33',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-34',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-35',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-36',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-37',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-38',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-39',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-40',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-41',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-42',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-43',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-44',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-45',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-46',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-47',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-48',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-49',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-50',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-51',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-52',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-53',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-54',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-55',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-56',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-57',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-58',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-59',
  'https://daotaolaixeoto.com.vn/thi-sat-hach-lai-xe-de-so-60'
]
let exportURL = './result/b2'

function download(uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
    })
  })
}

crawlURLs.forEach(async (crawlURL, i) => {
  setTimeout(async () => {
    const browser = await puppeteer.launch({
      headless: true, args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--deterministic-fetch',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        // '--single-process',
      ]
    })
    const page = await browser.newPage()
    page.on('dialog', async dialog => {
      console.log('Confirm dialog shown')
      await dialog.accept()
    })

    console.log(`Going to ${crawlURL}`)
    await page.goto(crawlURL, { waitUntil: 'networkidle0' })

    console.log(`Checking answer`)
    await page.click('#question_1 .answer_option')

    console.log(`Submitting test`)
    await page.click('.btn_nopbai')

    console.log(`Waiting for submit`)
    await page.waitForSelector('.ketqua_text', {
      visible: true,
    })

    console.log(`Getting title`)
    const setTitle = await page.evaluate(() => document.querySelector('.page-breadcrumbs > ul > li.last > span').innerText)

    page.on('console', async (msg) => {
      const msgArgs = msg.args();
      for (const element of msgArgs) {
        const value = await element.jsonValue()

        if (!value || !value.url || !value.location) continue

        if (!fs.existsSync(`${value.path}`)) {
          fs.mkdir(`${value.path}`, err => {
            if (err) return console.error(err)
          })
        }

        await download(value.url, value.location)
      }
    })

    console.log(`Getting items`)
    const setItems = await page.evaluate((setTitle) => {
      let itemNodes = [...document.querySelectorAll('.detail_cauhoi')]

      return itemNodes.map((item, ii) => {
        const escapeSpecialChars = function (s) {
          return s.replaceAll(/\\n/g, "\\n")
            .replaceAll(/'/g, "\\'")
            .replaceAll(/"/g, '\\"')
            .replaceAll(/\\&/g, "\\\&")
            .replaceAll(/\\r/g, "\\r")
            .replaceAll(/\\t/g, "\\t")
            .replaceAll(/\\b/g, "\\b")
            .replaceAll(/\\f/g, "\\f")
        }

        const questionNumberText = escapeSpecialChars(item.querySelector('.cauhoi_txt').innerText)
        const question = escapeSpecialChars(item.querySelector(':scope > p:nth-child(3)').innerText)
        const imageUrl = item.querySelector(':scope > p:nth-child(4) img')?.attributes["src"]?.value
        const answerOptions = [...item.querySelectorAll('.noidung_dapan .answer_option')].map(e => ({ True: true, False: false }[e.dataset.value]))
        const answerContents = [...item.querySelectorAll('.noidung_dapan > ul > li > label > span')].map(e => e.innerText)
        const moreInfo = item.querySelector('.noidung_dapan [id^=giaithich_]').innerText

        if (imageUrl && imageUrl.length > 0) {
          console.log({ url: `https://daotaolaixeoto.com.vn${imageUrl}`, path: `./result/images/${setTitle}`, location: `./result/images/${setTitle}/${ii + 1}.png` })
        }

        const imageTextSlate = imageUrl ? `,{"type":"image","url":"https://daotaolaixeoto.com.vn${imageUrl}","children":[{"text":""}],"align":"center"}` : ""

        let newItem = {
          type: 'q&a',
          question: `[{"type":"paragraph","children":[{"text":"${questionNumberText}","bold":true},{"text":" ${question}"}]}${imageTextSlate}]`,
          answers: answerOptions.map((isCorrect, i) => ({ isCorrect, answer: answerContents[i] })),
          moreInfo,
          _id: 'new ObjectId()'
        }

        if (!newItem.moreInfo || newItem.moreInfo.length === 0) {
          delete newItem.moreInfo
        }

        return newItem
      })
    }, setTitle)

    try {
      if (!fs.existsSync(`${exportURL}`)) {
        fs.mkdir(`${exportURL}`, err => {
          if (err) return console.error(err)

          console.log(`Created dir: ${exportURL}`)
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
  }, i * 3000)
})
