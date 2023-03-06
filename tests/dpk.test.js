const { deterministicPartitionKey } = require("../dpk");

describe("deterministicPartitionKey", () => {
  it("should returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("should returns the given partition key", () => {
    const event = {
      uuid: "1234567890abcdef",
      data: {
        message: "My partition key",
      },
      id: "123ABC456EFG",
    };

    const key = deterministicPartitionKey(event);
    const expectedKey =
      "5f0bf9b71084057b6c4d76c66e067d7d6a3a0b25f0786618116296c680a0d87a797f501d74f7b79c71206a66b1aea5013175985f795467050eaa03abff018097";

    expect(key).toBe(expectedKey);
  });

  it("should returns the hash data", () => {
    const partitionKey = "1";
    const event = {
      partitionKey,
    };

    const key = deterministicPartitionKey(event);

    expect(key).toBe(partitionKey);
  });

  it("should parse a non-string to a string using the function", () => {
    const partitionKey = 100;
    const event = {
      partitionKey,
    };

    const key = deterministicPartitionKey(event);

    expect(key).toBe(String(partitionKey));
  });

  test("should generate hash key when candidate length exceeds maximum partition key length", () => {
    const event = {
      partitionKey: "0123456789abcdef".repeat(20),
    };
    const result = deterministicPartitionKey(event);

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toBe(event);
  });
});
