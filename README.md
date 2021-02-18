# extract-from-url

Extracts parts of the url

## Example

Url with hostname

```ts
import extractFromUrl, { Url } from 'extract-from-url';

const url = 'https://www.subdomain.domain.com:80/path/123';
const urlParts: Url = extractFromUrl(url);
const hostname: string = extractFromUrl(url, 'hostname');

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

console.log(hostname); // 'www.subdomain.domain.com'
```

Ip address url

```ts
import extractFromUrl, { Url } from 'extract-from-url';

const url = 'http://127.0.0.1:3000';
const urlParts: Url = extractFromUrl(url);
const ip: string = extractFromUrl(url, 'ip');

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

console.log(ip); // '127.0.0.1'
```

# Breaking changes

v1.3 - The return type of the function change to Url or string depending on passing or not the second parameter