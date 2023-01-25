
'use strict';

var toArray = require('to-array');

/**
 * Retrieves a form control from the given root element. The ideal use-case is
 * for a `<form>` or `<fieldset>`, (via their `elements` API) but arbitrary DOM
 * elements work as well. (via `querySelectorAll`)
 *
 * @param {HTMLElement} root    The root to search from. (usually a <form>)
 * @param {String} name         The control name to find.
 * @return {HTMLElement|Array}
 */
module.exports = function (root, name) {
  if (!isElement(root)) {
    throw new TypeError('a root element is required');
  }

  if ('namedItem' in root) {
    // the short-circuit here is because IE won't find things like <fieldset>
    // even when they have an assigned name
    return normalize(root.namedItem(name) || bruteForce(root, name));
  } else if (root.elements) {
    return normalize(root.elements.namedItem(name));
  } else {
    return normalize(bruteForce(root, name));
  }
};

/**
 * When searching an arbitrary element (or for browsers that don't support
 * the elements list properly)
 *
 * @param {HTMLElement} root  The element to search within.
 * @param {String} name       The control name to search for.
 * @return {NodeList}
 */
function bruteForce(root, name) {
  return root.querySelectorAll('[name=\'' + name + '\']');
}

/**
 * Normalizes the value returned by the API:
 *  - when empty, return `null`
 *  - when only a single node, return that node directly
 *  - when a `NodeList`, return an `Array` instead
 *
 * @param {Mixed} ret  The value to normalize.
 * @return {Mixed}
 */
function normalize(ret) {
  if (!ret) {
    return null;
  } else if (isElement(ret)) {
    return ret;
  } else if (ret.length === 0) {
    return null;
  } else if (ret.length === 1) {
    return ret[0];
  } else {
    return toArray(ret);
  }
}

function isElement(el) {
  if (!el) return false;
  return el.nodeType === 1;
}
