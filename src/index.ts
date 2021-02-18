export type Url = {
  protocol?: string;
  address: string;
  ip?: string;
  hostname?: string;
  subdomain?: string;
  domain?: string;
  port?: string;
  path?: string;
};

const urlRegex = /^(?:(?<protocol>https?):\/\/)?(?=(?<address>(?<ip>\d+(?:\.\d+){3})|(?<hostname>(?!.{256})[a-z0-9.-]+))(?::(?<port>\d+))?(?<path>\/[^\s]*)?$)(?:(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])){3})|(?:(?=(?:www\.)?(?<subdomain>[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?=(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])){2,}))?\.?(?<domain>(?:\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+))(?:(?:\.?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:[a-z]{1,63}|xn--[a-z0-9]{1,59}))))(?::(?:[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?(?:\/.*)?$/;


/**
 * Extracts parts of the url
 * @param {string} url Url string
 * @param part Key name of property to return (passing this property the return type will change)
 */
function extractFromUrl(url: string, part: keyof Url): string | undefined;
function extractFromUrl(url: string): Url | undefined;
function extractFromUrl (
  url: string,
  part?: keyof Url
): Url | string | undefined {
  const matches = urlRegex.exec(url);
  const allParts = matches ? (matches.groups as Url) : undefined;
  return part && allParts ? allParts[part] : allParts;
};

export default extractFromUrl;
