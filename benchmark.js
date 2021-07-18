const bench = require('nanobench');
const { default: extractFromUrl } = require('./dist/index');

const times = 100
const timesToLocale = times.toLocaleString()

function extractFromUrlRegEx(url) {
  const matches = url.match(/([^\/?#.]+\.[^\/?#.:]+)(?:[\/?#:]|$)/i)

  return matches?.[1]
}

function extractFromUrlArray(url) {
  let domain

  if (url.indexOf('://') > -1) {
    domain = url.split('/')[2]
  } else {
    domain = url.split('/')[0]
  }

  return domain.split(':')[0].replace('www.', '')
}

const url = 'https://www.npmjs.com/package/extract-from-url'

bench(`extractFromUrl: extract domain ${timesToLocale} times`, (b) => {
  b.start()

  for (let i = 0; i < times; i++) {
    extractFromUrl(url, 'domain')
  }

  b.end()
})

bench(`extractFromUrlRegEx: extract domain regex ${timesToLocale} times`, (b) => {
  b.start()

  for (let i = 0; i < times; i++) {
    extractFromUrlRegEx(url)
  }

  b.end()
})

bench(`extractFromUrlArray: extract domain array hack ${timesToLocale} times`, (b) => {
  b.start()

  for (let i = 0; i < times; i++) {
    extractFromUrlArray(url)
  }

  b.end()
})
