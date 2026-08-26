// The challenge bank. Each entry powers one interaction with the pet.
//
// Shape of a challenge:
//   id       unique string
//   diff     "easy" | "medium" | "hard"  (maps to Feed / Play / Train)
//   fn       the exact function name the learner must define
//   xp       reward for solving it
//   prompt   what to build
//   starter  the code the editor is pre-filled with
//   tests    [{ args: [...], expected: any }]  run against the learner's fn
//
// Adding your own is easy — see the "Grow the challenge bank" section of the README.

export const CHALLENGES = [
  // ── easy → Feed ──────────────────────────────────────────────────────────
  {
    id: "double", diff: "easy", fn: "double", xp: 10,
    prompt: "Write `double(n)` that returns n multiplied by 2.",
    starter: "function double(n) {\n  \n}",
    tests: [{ args: [2], expected: 4 }, { args: [5], expected: 10 }, { args: [0], expected: 0 }],
  },
  {
    id: "sumTwo", diff: "easy", fn: "sumTwo", xp: 10,
    prompt: "Write `sumTwo(a, b)` that returns their sum.",
    starter: "function sumTwo(a, b) {\n  \n}",
    tests: [{ args: [2, 3], expected: 5 }, { args: [10, -4], expected: 6 }, { args: [0, 0], expected: 0 }],
  },
  {
    id: "isEven", diff: "easy", fn: "isEven", xp: 10,
    prompt: "Write `isEven(n)` that returns true if n is even, else false.",
    starter: "function isEven(n) {\n  \n}",
    tests: [{ args: [4], expected: true }, { args: [7], expected: false }, { args: [0], expected: true }],
  },
  {
    id: "shout", diff: "easy", fn: "shout", xp: 10,
    prompt: 'Write `shout(str)` that returns the string uppercased with a "!" added.',
    starter: "function shout(str) {\n  \n}",
    tests: [{ args: ["hi"], expected: "HI!" }, { args: ["code"], expected: "CODE!" }],
  },
  {
    id: "lastItem", diff: "easy", fn: "lastItem", xp: 10,
    prompt: "Write `lastItem(arr)` that returns the last element of the array.",
    starter: "function lastItem(arr) {\n  \n}",
    tests: [{ args: [[1, 2, 3]], expected: 3 }, { args: [["a", "b"]], expected: "b" }],
  },

  // ── medium → Play ────────────────────────────────────────────────────────
  {
    id: "reverseString", diff: "medium", fn: "reverseString", xp: 20,
    prompt: "Write `reverseString(str)` that returns the string reversed.",
    starter: "function reverseString(str) {\n  \n}",
    tests: [{ args: ["hello"], expected: "olleh" }, { args: ["abc"], expected: "cba" }],
  },
  {
    id: "sumArray", diff: "medium", fn: "sumArray", xp: 20,
    prompt: "Write `sumArray(arr)` that returns the sum of all numbers in the array.",
    starter: "function sumArray(arr) {\n  \n}",
    tests: [{ args: [[1, 2, 3]], expected: 6 }, { args: [[10, 20]], expected: 30 }, { args: [[]], expected: 0 }],
  },
  {
    id: "countVowels", diff: "medium", fn: "countVowels", xp: 20,
    prompt: "Write `countVowels(str)` that returns how many vowels (a,e,i,o,u) are in the string.",
    starter: "function countVowels(str) {\n  \n}",
    tests: [{ args: ["hello"], expected: 2 }, { args: ["sky"], expected: 0 }, { args: ["aeiou"], expected: 5 }],
  },
  {
    id: "maxOf", diff: "medium", fn: "maxOf", xp: 20,
    prompt: "Write `maxOf(arr)` that returns the largest number in the array.",
    starter: "function maxOf(arr) {\n  \n}",
    tests: [{ args: [[3, 7, 2]], expected: 7 }, { args: [[-1, -5]], expected: -1 }],
  },
  {
    id: "factorial", diff: "medium", fn: "factorial", xp: 20,
    prompt: "Write `factorial(n)` that returns n! (factorial). factorial(0) is 1.",
    starter: "function factorial(n) {\n  \n}",
    tests: [{ args: [5], expected: 120 }, { args: [0], expected: 1 }, { args: [3], expected: 6 }],
  },

  // ── hard → Train ─────────────────────────────────────────────────────────
  {
    id: "fizzbuzz", diff: "hard", fn: "fizzbuzz", xp: 35,
    prompt: 'Write `fizzbuzz(n)` returning an array 1..n where multiples of 3 become "Fizz", of 5 become "Buzz", and of both become "FizzBuzz".',
    starter: "function fizzbuzz(n) {\n  \n}",
    tests: [{ args: [5], expected: [1, 2, "Fizz", 4, "Buzz"] }, { args: [3], expected: [1, 2, "Fizz"] }],
  },
  {
    id: "isPalindrome", diff: "hard", fn: "isPalindrome", xp: 35,
    prompt: "Write `isPalindrome(str)` that returns true if the string reads the same forwards and backwards, ignoring case.",
    starter: "function isPalindrome(str) {\n  \n}",
    tests: [{ args: ["Racecar"], expected: true }, { args: ["hello"], expected: false }, { args: ["Level"], expected: true }],
  },
  {
    id: "fibonacci", diff: "hard", fn: "fibonacci", xp: 35,
    prompt: "Write `fibonacci(n)` returning the nth Fibonacci number. fibonacci(0)=0, fibonacci(1)=1.",
    starter: "function fibonacci(n) {\n  \n}",
    tests: [{ args: [0], expected: 0 }, { args: [1], expected: 1 }, { args: [7], expected: 13 }, { args: [10], expected: 55 }],
  },
  {
    id: "unique", diff: "hard", fn: "unique", xp: 35,
    prompt: "Write `unique(arr)` that returns a new array with duplicates removed, keeping the first occurrence order.",
    starter: "function unique(arr) {\n  \n}",
    tests: [{ args: [[1, 1, 2, 3, 3]], expected: [1, 2, 3] }, { args: [[5, 5, 5]], expected: [5] }],
  },
  {
    id: "titleCase", diff: "hard", fn: "titleCase", xp: 35,
    prompt: "Write `titleCase(str)` that capitalizes the first letter of every word.",
    starter: "function titleCase(str) {\n  \n}",
    tests: [{ args: ["hello world"], expected: "Hello World" }, { args: ["the quick fox"], expected: "The Quick Fox" }],
  },
];
