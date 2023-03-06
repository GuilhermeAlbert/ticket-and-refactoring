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

  it("should return the right hash with another algorithm", () => {
    const algorithm = "sha256";
    const hash = createHash(TestConstants.MY_TEST_STRING, algorithm);
    const expectedValue =
      "6a49c53edc7a267dd11793fae30298fd36425cd1d8cdf728233822df0f517e54";

    expect(hash).toBe(expectedValue);
  });

  it("should return the right hash with another algorithm and other encoding", () => {
    const algorithm = "sha256";
    const encoding = "base64";
    const hash = createHash(TestConstants.MY_TEST_STRING, algorithm, encoding);
    const expectedValue = "aknFPtx6Jn3RF5P64wKY/TZCXNHYzfcoIzgi3w9RflQ=";

    expect(hash).toBe(expectedValue);
  });
});
