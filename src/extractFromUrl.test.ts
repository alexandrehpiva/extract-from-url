import extractFromUrl, { Url } from './index'

describe('common tests', () => {
  it('should correctly extract all parts of a valid url', () => {
    const url = 'https://subdomain.domain.com:80/path/123'
    const parts: Url = {
      protocol: 'https',
      address: 'subdomain.domain.com',
      port: '80',
      ip: undefined,
      hostname: 'subdomain.domain.com',
      subdomain: 'subdomain',
      domain: 'domain.com',
      path: '/path/123',
      parameters: undefined,
      fragment: undefined
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  it('should correctly extract all parts of a url without subdomain', () => {
    const url = 'https://www.googleapis.com/youtube/v3/search'
    const parts: Url = {
      protocol: 'https',
      address: 'www.googleapis.com',
      port: undefined,
      ip: undefined,
      hostname: 'www.googleapis.com',
      subdomain: 'www',
      domain: 'googleapis.com',
      path: '/youtube/v3/search',
      parameters: undefined,
      fragment: undefined
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  it('should correctly extract all parts of a url with only ip + port', () => {
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
      parameters: undefined,
      fragment: undefined
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  it('should extract parameters from URL correctly', () => {
    const url = 'http://www.example.com:80/path/to/api?key1=value1&key2=value2'
    const parts: Url = {
      protocol: 'http',
      address: 'www.example.com',
      port: '80',
      ip: undefined,
      hostname: 'www.example.com',
      subdomain: 'www',
      domain: 'example.com',
      path: '/path/to/api',
      parameters: [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' }
      ],
      fragment: undefined
    }

    expect(extractFromUrl(url)).toEqual(parts)
  })

  it('should extract #fragment from URL correctly', () => {
    const url =
      'http://www.example.com:80/path/to/api?key1=value1&key2=value2#fragment'
    const fragment = 'fragment'

    expect(extractFromUrl(url, 'fragment')).toEqual(fragment)
  })

  it('should invalidate the URL when it has a second unescaped hash in the fragment', () => {
    const invalidUrl =
      'http://www.example.com:80/path/to/api?key1=value1&key2=value2#fragment#second'
    const validUrl =
      'http://www.example.com:80/path/to/api?key1=value1&key2=value2#fragment%23second'

    expect(extractFromUrl(invalidUrl, 'fragment')).toEqual(undefined)
    expect(extractFromUrl(validUrl, 'fragment')).toEqual('fragment#second')
  })

  it('should pct-decode (using decodeURIComponent) the path, parameters and fragment parts of the url', () => {
    const pctEncodedUrl =
      'example.com/path/to/api?key1=%20-%21-%23-%24-%25-%26-%27-%28-%29-%2A-%2B-%2C-%2F-%3A-%3B-%3D-%3F-%40-%5B-%5D&key2=%0A-%0D-%0D%0A-%20-%22-%25-%2D-%2E-%3C-%3E-%5C-%5E-%5F-%60-%7B-%7C-%7D-%7E-%C2%A3-%E5%86%86#fragment%5B-%5D'
    const parts: Url = {
      protocol: undefined,
      address: 'example.com',
      port: undefined,
      ip: undefined,
      hostname: 'example.com',
      subdomain: undefined,
      domain: 'example.com',
      path: '/path/to/api',
      parameters: [
        { key: 'key1', value: ` -!-#-$-%-&-'-(-)-*-+-,-/-:-;-=-?-@-[-]` },
        {
          key: 'key2',
          value: '\n-\r-\r\n- -"-%---.-<->-\\-^-_-`-{-|-}-~-£-円'
        }
      ],
      fragment: 'fragment[-]'
    }

    expect(extractFromUrl(pctEncodedUrl)).toEqual(parts)
  })

  it('should extract domain from URL correctly', () => {
    const urls = [
      'http://www.example.com',
      'http://www.example.co.uk',
      'http://www.example.com.br',
      'www.example.com',
      'www.example.co.uk',
      'www.example.com.br',
      'example.com',
      'example.co.uk',
      'example.com.br',
      'example.com:80',
      'subdomain.example.com',
      'subdomain.example.co.uk',
      'subdomain.example.com.br',
      'subdomain.example.com:80',
      'subdomain.subdomain.example.com',
      'subdomain.subdomain.example.co.uk',
      'subdomain.subdomain.example.com.br',
      'subdomain.subdomain.example.com:80'
    ]

    const domains = [
      'example.com',
      'example.co.uk',
      'example.com.br',
      'example.com',
      'example.co.uk',
      'example.com.br',
      'example.com',
      'example.co.uk',
      'example.com.br',
      'example.com',
      'example.com',
      'example.co.uk',
      'example.com.br',
      'example.com',
      'example.com',
      'example.co.uk',
      'example.com.br',
      'example.com'
    ]

    urls.forEach((url, index) => {
      expect(extractFromUrl(url)?.domain).toEqual(domains[index])
    })
  })

  it('should return undefined if it is not a url', () => {
    const notAUrl = '/www/path/123'
    expect(extractFromUrl(notAUrl)).toBeUndefined()
  })
})

describe('tests based on what is specified in the second parameter', () => {
  const url =
    'https://subdomain.domain.com.br:80/path/123?key1=value1&key2=value2'
  const parts: Url = {
    protocol: 'https',
    address: 'subdomain.domain.com.br',
    port: '80',
    ip: undefined,
    hostname: 'subdomain.domain.com.br',
    subdomain: 'subdomain',
    domain: 'domain.com.br',
    path: '/path/123',
    parameters: [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' }
    ],
    fragment: undefined
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
    'should correctly extract specified part $part',
    ({ part }: { part: keyof Url }) => {
      expect(extractFromUrl(url, part)).toEqual(parts[part])
    }
  )
})
