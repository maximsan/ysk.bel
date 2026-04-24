'use strict';

function bracketAttribute(attrName) {
  return `[${attrName}]`;
}

function idSelector(id) {
  return `#${id}`;
}

module.exports = {
  bracketAttribute,
  idSelector,
};
