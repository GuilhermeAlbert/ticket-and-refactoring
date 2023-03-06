const crypto = require("crypto");
const HashConstants = require("../constants/hash.constants");

/**
 * @returns {string}
 */
function createHash(
  data,
  algorithm = HashConstants.ALGORITHM,
  encoding = HashConstants.BINARY_TO_TEXT_ENCODING
) {
  const hash = crypto.createHash(algorithm).update(data).digest(encoding);

  return hash;
}

module.exports = {
  createHash,
};
