'use strict';

var toString = Object.prototype.toString;
// type 
var is = function (val, type) { return toString.call(val) === "[object ".concat(type, "]"); };
// is !undefined
var isDef = function (val) {
    return typeof val !== 'undefined';
};
// is undefined
var isUnDef = function (val) { return !isDef(val); };
// is null
var isNull = function (val) { return val === null; };
// is null or undefined
var isNullOrUnDef = function (val) { return isUnDef(val) || isNull(val); };
// is string
var isString = function (val) { return is(val, 'String'); };
// is number
var isNumber = function (val) { return is(val, 'Number'); };
// is boolean
var isBoolean = function (val) { return is(val, 'Boolean'); };
// is object
var isObject = function (val) { return val !== null && is(val, 'Object'); };
// is array
var isArray = function (val) { return Boolean(val) && Array.isArray(val); };
// is empty
var isEmpty = function (val) {
    if (isNullOrUnDef(val))
        return true;
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
};
// is function
var isFunction = function (val) {
    return typeof val === 'function';
};
// is promise
var isPromise = function (val) {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
// is date
var isDate = function (val) {
    return is(val, 'Date');
};
// is regexp
var isRegExp = function (val) {
    return is(val, 'RegExp');
};
// is window
var isWindow = function (val) {
    return typeof window !== 'undefined' && is(val, 'Window');
};
// is element
var isElement = function (val) {
    return isObject(val) && !!val.tagName;
};
// is HTMLElement
var isHTMLElement = function (val) {
    return isObject(val) && 'accessKey' in val;
};
//
var isServer = typeof window === 'undefined';
var isClient = !isServer;

exports.is = is;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isClient = isClient;
exports.isDate = isDate;
exports.isDef = isDef;
exports.isElement = isElement;
exports.isEmpty = isEmpty;
exports.isFunction = isFunction;
exports.isHTMLElement = isHTMLElement;
exports.isNull = isNull;
exports.isNullOrUnDef = isNullOrUnDef;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isRegExp = isRegExp;
exports.isServer = isServer;
exports.isString = isString;
exports.isUnDef = isUnDef;
exports.isWindow = isWindow;
