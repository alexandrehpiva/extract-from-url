# extract-from-url

Extracts parts of the url

## Example

Url with hostname

```ts
import extractFromUrl, { Url } from 'extract-from-url';

const url = 'https://www.subdomain.domain.com:80/path/123';
const urlParts: Url = extractFromUrl(url);

console.log(urlParts);
/* urlParts:
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
```

Ip address url

```ts
import extractFromUrl, { Url } from 'extract-from-url';

const url = 'http://127.0.0.1:3000';
const urlParts: Url = extractFromUrl(url);

console.log(urlParts);
/* urlParts:
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
```
