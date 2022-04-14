export type UrlParameter = {
  key: string
  value: string
}

export type Url = {
  protocol?: string
  address?: string
  ip?: string
  hostname?: string
  subdomain?: string
  domain?: string
  port?: string
  path?: string
  parameters?: string | UrlParameter[]
  fragment?: string
}

const urlRegex =
  /^(?:(?<protocol>https?):\/\/)?(?=(?<address>(?<ip>\d+(?:\.\d+){3})|(?<hostname>(?!.{256})[a-z0-9.-]+))(?::(?<port>\d+))?(?<path>\/[^\s|?|#]*)?(?:\?(?<parameters>(?:&?\S+?=[^&|#]+)+))?(?<fragment>(?:#(?:(?:(?<=\\)#)|(?:[^#]))+))?$)(?:(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])){3})|(?:(?=(?<subdomain>(?:[a-z0-9][a-z0-9-.]{0,61}[a-z0-9])?(?=(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])){1,}\.(?:(?:com)|(?:org)|(?:gov)|(?:net)|(?:int)|(?:edu)|(?:mil)|(?:co))))?\.?(?<domain>(?:\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+))(?:(?:\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:[a-z]{1,63}|xn--[a-z0-9]{1,59}))))(?::(?:[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?(?:\/.*)?$/

/**
 * Convert string parameters to UrlParameter[]
 * @param {string | UrlParameter[]} parameters
 */
export function convertStrParams(
  parameters?: string | UrlParameter[]
): UrlParameter[] | undefined {
  if (typeof parameters !== 'string') return parameters

  return parameters.split('&').map((keyValue): UrlParameter => {
    const [key, value] = keyValue.split('=')
    return { key, value }
  })
}

/**
 * Extracts parts of the url
 * @param {string} url Url string
 * @param part Key name of property to return (passing this property the return type will change)
 * @returns {Url}
 * @author Alexandre Piva
 * @version 3.0.2
 * @example
 * const url = 'https://www.googleapis.com/youtube/v3/search'
 * const urlParts = extractUrlParts(url)
 * console.log(urlParts)
 * // {
 * //   protocol: 'https',
 * //   address: 'www.googleapis.com',
 * //   port: undefined,
 * //   ip: undefined,
 * //   hostname: 'www.googleapis.com',
 * //   subdomain: 'www',
 * //   domain: 'googleapis.com',
 * //   path: '/youtube/v3/search',
 * //   parameters: undefined,
 * //   fragment: undefined
 * // }
 * const domain = extractUrlParts(url, 'domain')
 * console.log(domain)
 * // 'googleapis.com'
 */
export function extractFromUrl(
  url: string,
  part: keyof Url
): string | UrlParameter[] | undefined
export function extractFromUrl(url: string): Url | undefined
export function extractFromUrl(
  url: string,
  part?: keyof Url
): Url | string | UrlParameter[] | undefined {
  const matches = urlRegex.exec(url)
  const { parameters, ...rest } = (matches?.groups as Url) ?? {}
  let allParts = matches
    ? { ...rest, parameters: parameters && convertStrParams(parameters) }
    : undefined

  // decodeURI is needed to decode the parameters
  if (allParts && allParts.parameters) {
    allParts.parameters = allParts.parameters.map(param => ({
      ...param,
      value: decodeURI(param.value)
    }))
  }

  return part && allParts ? allParts[part] : allParts
}

export default extractFromUrl
