import { Url } from '../index';
import extractFromUrl from '../../dist/index';

describe('Extrai partes de uma url', () => {
  test('Deve extrair corretamente todas as partes de uma url válida', () => {
    const url = 'https://www.subdomain.domain.com:80/path/123';
    const parts: Url = {
      protocol: 'https',
      address: 'www.subdomain.domain.com',
      port: '80',
      ip: undefined,
      hostname: 'www.subdomain.domain.com',
      subdomain: 'subdomain',
      domain: 'domain.com',
      path: '/path/123',
    };

    expect(extractFromUrl(url)).toEqual(parts);
  });
});