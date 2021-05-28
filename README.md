# extract-from-url

Extracts parts of the url

[![npm](https://img.shields.io/npm/dy/extract-from-url)](https://www.npmjs.com/package/extract-from-url)
[![npm version](https://badge.fury.io/js/extract-from-url.svg)](https://badge.fury.io/js/extract-from-url)
[![Build Status](https://travis-ci.org/alexandrehpiva/extract-from-url.svg?branch=main)](https://travis-ci.org/alexandrehpiva/extract-from-url)

## Example

Url with hostname

```ts
import extractFromUrl, { Url } from 'extract-from-url';

const url = 'https://www.subdomain.domain.com:80/path/123';

const urlParts: Url = extractFromUrl(url);
console.log(urlParts);
/*
{
  protocol: 'https',
  address: 'www.subdomain.domain.com',
  port: '80',
  ip: undefined,
  hostname: 'www.subdomain.domain.com',
  subdomain: 'subdomain',
  domain: 'domain.com',
  path: '/path/123',
}
*/

const { hostname } = extractFromUrl(url);
// Or: const hostname: string = extractFromUrl(url, 'hostname')
console.log(hostname);
// 'www.subdomain.domain.com'
```

Ip address url

```ts
import extractFromUrl, { Url } from 'extract-from-url';

const url = 'http://127.0.0.1:3000';

const urlParts: Url = extractFromUrl(url);
console.log(urlParts);
/*
{
  protocol: 'http',
  address: '127.0.0.1',
  port: '3000',
  ip: '127.0.0.1',
  hostname: undefined,
  subdomain: undefined,
  domain: undefined,
  path: undefined,
}
*/

const { ip, port } = extractFromUrl(url);
// Or: const ip: string = extractFromUrl(url, 'ip');
console.log(ip); // '127.0.0.1'
console.log(port); // '3000'
```

# Breaking changes

v1.3 - The return type of the function change to Url or string depending on passing or not the second parameter

v2.0 - Targeting to ES6

# TODO

- [ ] Extract parameters from URL ("http://www.example.com:80/path/to/api?key1=value1&key2=value2")
- [ ] Extract #hashtags redirect from URL ("http://www.example.com:80/page#SomewhereInTheDocument", "https://github.com:32199/users/iggy#foo?bar=baz#qux")