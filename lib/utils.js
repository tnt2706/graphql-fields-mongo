const _ = require('lodash');

/**
 *
 * create the return value
 * @param {[string]} fields input fields
 * @param {string} [returnType='array'] must be either: string, array, or object. Default: array
 * @returns
 */
function createResult(fields, returnType = 'array') {
  return returnType === 'array' ? fields
    : returnType === 'string' ? fields.join(' ')
      : _.reduce(fields, (result, item) => ({ ...result, [item]: 1 }), {});
}

/**
 * Remove Path Collision from input fields
 *
 * @param {[string]} fields input fields
 * @param {string} [returnType='array'] must be either: string, array, or object. Default: array
 * @returns fields projection
 * @author tinhtran
 */

function removePathCollision(fields, returnType = 'array') {
  let results = fields.sort();

  fields.forEach(field => {
    results = results.filter(f => !f.startsWith(`${field}.`));
  });

  return createResult(results, returnType);
}

module.exports = {
  removePathCollision,
  createResult,
};
