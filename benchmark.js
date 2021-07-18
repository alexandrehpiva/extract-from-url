const bench = require('nanobench');
const { default: extractFromUrl } = require('./dist/index');

const times = 100
const timesToLocale = times.toLocaleString()

const url = 'https://www.npmjs.com/package/extract-from-url'

bench(`extractFromUrl: extract domain ${timesToLocale} times`, (b) => {
  b.start()

  for (let i = 0; i < times; i++) {
    extractFromUrl(url, 'domain')
  }

  b.end()
})
