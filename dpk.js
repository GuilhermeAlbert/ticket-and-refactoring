const DpkConstants = require("./src/constants/dpk.constants");
const { createHash } = require("./src/helpers/hash.helper");

/**
 * @returns {string}
 */
function deterministicPartitionKey(event) {
  let candidate = "0";

  if (event) {
    candidate = event.partitionKey ?? createHash(JSON.stringify(event));

    if (isNotString(candidate)) candidate = JSON.stringify(candidate);
  }

  if (isLargerThanMaxPartitionKey(candidate.length))
    candidate = createHash(candidate);

  return candidate;
}

/**
 * @returns {boolean}
 */
function isNotString(input) {
  const response = typeof input !== "string";

  return response;
}

/**
 * @returns {boolean}
 */
function isLargerThanMaxPartitionKey(inputLength) {
  const response = inputLength > DpkConstants.MAX_PARTITION_KEY_LENGTH;

  return response;
}

module.exports = {
  deterministicPartitionKey,
};
