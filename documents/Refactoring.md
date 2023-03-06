# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

---

## Your Explanation Here

### Exports

I moved the function inside a function declaration and removed the exports. Function declaration is cleaner and less confusing than using exports.

🚫 Before

```js
exports.deterministicPartitionKey = (event) => {
  ...
}
```

✅ After

```js
function deterministicPartitionKey(event) {
  ...
}

module.exports = { deterministicPartitionKey };
```

---

### Constants

I separated the necessary constants into specific files for this purpose. This way it is easy to separate what is configuration and what is environment variables, for example.

For example:

<details>
<summary>DKP constants</summary>

<br>

```js
const DeterministicPartitionKeyConstants = Object.freeze({
  MAX_PARTITION_KEY_LENGTH: 256,
});

module.exports = DeterministicPartitionKeyConstants;
```

</details>

<details>
<summary>Hash constants</summary>

<br>

```js
const HashConstants = Object.freeze({
  ALGORITHM: "sha3-512",
  BINARY_TO_TEXT_ENCODING: "hex",
});

module.exports = HashConstants;
```

</details>

<br>

I also added a default value to the "candidate" variable, which made me eliminate an unnecessary "else".

🚫 Before

```js
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
let candidate;
```

✅ After

```js
let candidate = "0";
```

---

### Optimizing conditions

I created a new file to help me create a hash. That way I don't have to repeat the same code in several different places. In this file I made the function to create the hash receiving optional parameters. This way I have less work to define the type of algorithm and the encoding.

<details open>
<summary>Hash helper</summary>

<br>

```js
function createHash(
  data,
  algorithm = HashConstants.ALGORITHM,
  encoding = HashConstants.BINARY_TO_TEXT_ENCODING
) {
  const hash = crypto.createHash(algorithm).update(data).digest(encoding);

  return hash;
}
```

</details>

With that I can use the same function for different scenarios. Below for example, after removing unnecessary checks, I use the same hash function.

🚫 Before

```js
if (event) {
  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }
}
```

✅ After

```js
if (event) {
  candidate = event.partitionKey ?? createHash(JSON.stringify(event));

  ...
}
```

---

### Validations

I'm checking if the "candidate" is a string inside the "event" if block to avoid code duplication.

🚫 Before

```js
if (candidate) {
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
} else {
  candidate = TRIVIAL_PARTITION_KEY;
}
```

✅ After

```js
if (isNotString(candidate)) candidate = JSON.stringify(candidate);
```

Finally, I do a simple check on the size of the "candidate".

🚫 Before

```js
if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
  candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
}
```

✅ After

```js
if (isLargerThanMaxPartitionKey(candidate.length))
  candidate = createHash(candidate);
```
