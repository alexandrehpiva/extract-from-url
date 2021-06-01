import extractFromUrl, { Url } from '../index'

describe('Extract parts of a url', () => {
  it('Should correctly extract all parts of a valid url', () => {
    const url = 'https://www.subdomain.domain.com:80/path/123'
    const parts: Url = {
      protocol: 'https',
      address: 'www.subdomain.domain.com',
      port: '80',
      ip: undefined,
      hostname: 'www.subdomain.domain.com',
      subdomain: 'subdomain',
      domain: 'domain.com',
      path: '/path/123',
      parameters: undefined
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  it('Should correctly extract all parts of a url without subdomain', () => {
    const url = 'https://www.googleapis.com/youtube/v3/search'
    const parts: Url = {
      protocol: 'https',
      address: 'www.googleapis.com',
      port: undefined,
      ip: undefined,
      hostname: 'www.googleapis.com',
      subdomain: undefined,
      domain: 'googleapis.com',
      path: '/youtube/v3/search',
      parameters: undefined
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  it('Should correctly extract all parts of a url with only ip + port', () => {
    const url = 'http://127.0.0.1:3000'
    const parts: Url = {
      protocol: 'http',
      address: '127.0.0.1',
      port: '3000',
      ip: '127.0.0.1',
      hostname: undefined,
      subdomain: undefined,
      domain: undefined,
      path: undefined,
      parameters: undefined
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  it('Should extract parameters from URL correctly', () => {
    const url = 'http://www.example.com:80/path/to/api?key1=value1&key2=value2'
    const parts: Url = {
      protocol: 'http',
      address: 'www.example.com',
      port: '80',
      ip: undefined,
      hostname: 'www.example.com',
      subdomain: undefined,
      domain: 'example.com',
      path: '/path/to/api',
      parameters: [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' }
      ]
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  const url =
    'https://www.subdomain.domain.com:80/path/123?key1=value1&key2=value2'
  const parts: Url = {
    protocol: 'https',
    address: 'www.subdomain.domain.com',
    port: '80',
    ip: undefined,
    hostname: 'www.subdomain.domain.com',
    subdomain: 'subdomain',
    domain: 'domain.com',
    path: '/path/123',
    parameters: [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' }
    ]
  }

  test.each`
    part
    ${'protocol'}
    ${'address'}
    ${'ip'}
    ${'hostname'}
    ${'subdomain'}
    ${'domain'}
    ${'port'}
    ${'path'}
    ${'parameters'}
  `(
    'Should correctly extract specified part $part',
    ({ part }: { part: keyof Url }) => {
      expect(extractFromUrl(url, part)).toEqual(parts[part])
    }
  )

  it('Should return undefined if it is not a url', () => {
    const notAUrl = '/www/path/123'
    expect(extractFromUrl(notAUrl)).toBeUndefined()
  })
})
