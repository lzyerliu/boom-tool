import { flatMap } from 'lodash-es';

/**
 * 获取 location.search/hash 查询参数
 * @param search ?k1=234&id=234234&k2=222 | k1=234&id=234234&k2=222
 * @param keys 
 * @returns 
 */
const searchParams = (search: string, ...keys: string[]) => {

  search = search.replace(/#|\?/, '');
  const params = new URLSearchParams(search);

  // @ts-ignore
  return flatMap(keys).reduce<Record<string, any>>((prev, key) => {
    prev[key] = params.get(key);
    return prev;
  }, {});
}

/**
 * 获取 url 查询参数
 * @param url 
 */
const getUrlParams = (url: string) => {
  let params: { [key: string]: any } = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    // @ts-ignore
    (m: any, key: string, value: string) => {
      params[key] = <string>value;
    }
  );
  return params;
}


/**
 * url 拼接 params
 * @param url 
 * @param params 
 * @param prefix 
 * @returns 
 */
const concatParams = (url: string, params: Record<string, any>, prefix: '?' | '#' = '?') => {
  let query = '';
  const keys = Object.keys(params);
  if (keys.length) {
    query = keys.reduce((str, k, i) => {
      str += `${i ? '&' : ''}${k}=${params[k]}`;
      return str;
    }, prefix);
  }
  return url + query;
}

export {
  searchParams,
  getUrlParams,
  concatParams
}
