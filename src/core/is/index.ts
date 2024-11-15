
const toString = Object.prototype.toString;

// type 
export const is = (val: unknown, type: string) => toString.call(val) === `[object ${type}]`;

// is !undefined
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
}

// is undefined
export const isUnDef = (val: any): val is undefined => !isDef(val);

// is null
export const isNull = (val: any): val is null => val === null;

// is null or undefined
export const isNullOrUnDef = (val: any) => isUnDef(val) || isNull(val);

// is string
export const isString = (val: any): val is string => is(val, 'String');

// is number
export const isNumber = (val: any): val is number => is(val, 'Number');

// is boolean
export const isBoolean = (val: any): val is boolean => is(val, 'Boolean');

// is object
export const isObject = (val: any): val is Record<string, any> => val !== null && is(val, 'Object');

// is array
export const isArray = (val: any): val is any[] => Boolean(val) && Array.isArray(val);

// is empty
export const isEmpty = (val: any) => {
  if (isNullOrUnDef(val)) return true;

  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

// is function
export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function';
}

// is promise
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

// is date
export const isDate = (val: unknown): val is Date => {
  return is(val, 'Date');
}

// is regexp
export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, 'RegExp');
}

// is window
export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
}

// is element
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
}

// is HTMLElement
export const isHTMLElement = (val: unknown): val is HTMLElement => {
  return isObject(val) && 'accessKey' in val;
}

//
export const isServer = typeof window === 'undefined';

export const isClient = !isServer;
