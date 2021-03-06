export type UrlParameter = {
  key: string
  value: string
}

export type Url = {
  protocol?: string
  address: string
  ip?: string
  hostname?: string
  subdomain?: string
  domain?: string
  port?: string
  path?: string
  parameters?: string | UrlParameter[]
}

const urlRegex =
  /^(?:(?<protocol>https?):\/\/)?(?=(?<address>(?<ip>\d+(?:\.\d+){3})|(?<hostname>(?!.{256})[a-z0-9.-]+))(?::(?<port>\d+))?(?<path>\/[^\s|?|#]*)?(?:\?(?<parameters>(?:&?\S+?=[^&|#]+)+))?$)(?:(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])){3})|(?:(?=(?:www\.)?(?<subdomain>[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?=(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])){2,}))?\.?(?<domain>(?:\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+))(?:(?:\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:[a-z]{1,63}|xn--[a-z0-9]{1,59}))))(?::(?:[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?(?:\/.*)?$/

/**
 * Convert string parameters to UrlParameter[]
 * @param {string | UrlParameter[]} parameters
 */
function convertStrParams(
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
 */
function extractFromUrl(
  url: string,
  part: keyof Url
): string | UrlParameter[] | undefined
function extractFromUrl(url: string): Url | undefined
function extractFromUrl(
  url: string,
  part?: keyof Url
): Url | string | UrlParameter[] | undefined {
  const matches = urlRegex.exec(url)
  const { parameters, ...rest } = (matches?.groups as Url) ?? {}
  const allParts = matches
    ? { ...rest, parameters: parameters && convertStrParams(parameters) }
    : undefined
  return part && allParts ? allParts[part] : allParts
}

export default extractFromUrl
