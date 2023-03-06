const TestConstants = require("../src/constants/test.constants");
const { createHash } = require("../src/helpers/hash.helper");

describe("createHash", () => {
  it("should create a string hash using the giving params", () => {
    const hash = createHash(TestConstants.MY_TEST_STRING);

    expect(typeof hash).toBe("string");
  });

  it("should return the right hash", () => {
    const hash = createHash(TestConstants.MY_TEST_STRING);

    expect(hash).toBe(TestConstants.MY_TEST_HASH_STRING);
  });
});
