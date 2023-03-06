const { deterministicPartitionKey } = require("../dpk");

describe("deterministicPartitionKey", () => {
  it("should returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("should returns the given partition key", () => {
    const event = {
      uuid: "1234567890abcdef",
    };

    const key = deterministicPartitionKey(event);
    const expectedKey =
      "c59272471749889935273e576a50fa562b66197cfb4b5c24695889057f7dab87ded780aa546a3b08c721871dd5f4cfd6d6c90b88398756f8e5eb9ce47d38fdc0";

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
});
