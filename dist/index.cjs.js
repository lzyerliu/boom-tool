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

/**
 * file download
 * @param data
 * @param filename
 * @param mine
 * @param bom
 */
var fileDownload = function (data, filename, mine, bom) {
    var bolbData = (typeof bom !== 'undefined') ? [bom, data] : [data];
    var blob = new Blob(bolbData, { type: mine || 'application/octet-stream' });
    // @ts-ignore
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        // @ts-ignore
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var blobUrl_1 = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
        var a_1 = document.createElement('a');
        a_1.style.display = 'none';
        a_1.href = blobUrl_1;
        a_1.setAttribute('download', filename);
        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
        if (typeof a_1.download === 'undefined') {
            a_1.setAttribute('target', '_blank');
        }
        document.body.appendChild(a_1);
        a_1.click();
        var timer_1 = setTimeout(function () {
            document.body.removeChild(a_1);
            window.URL.revokeObjectURL(blobUrl_1);
            clearTimeout(timer_1);
        }, 500);
    }
};

var IDX = 256, HEX = [], SIZE = 256, BUFFER;
while (IDX--)
    HEX[IDX] = (IDX + 256).toString(16).substring(1);
var uid = function (len) {
    var i = 0, tmp = (len || 11);
    if (!BUFFER || ((IDX + tmp) > (SIZE * 2))) {
        for (BUFFER = '', IDX = 0; i < SIZE; i++) {
            BUFFER += HEX[Math.random() * 256 | 0];
        }
    }
    return BUFFER.substring(IDX, IDX++ + tmp);
};

exports.fileDownload = fileDownload;
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
exports.uid = uid;
