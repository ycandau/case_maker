/* eslint no-unused-vars: 'off' */

//------------------------------------------------------------------------------
// Functional operators

const id = (x) => x;

const pipe =
  (...functions) =>
  (x) =>
    functions.reduce((val, func) => func(val), x);

const map = (...functions) =>
  functions.length === 1
    ? (array) => array.map(functions[0])
    : (array) => array.map(pipe(...functions));

const reduce = (func, init) => (array) => array.reduce(func, init);

const toArray = (x) => (Array.isArray(x) ? x : [x]);

const ascend = (a, b) => a - b;
const descend = (a, b) => b - a;
const sort = (compare, get) => (array) =>
  [...array].sort((a, b) => compare(get(a), get(b)));

//------------------------------------------------------------------------------
// String manipulators

const raiseWhen = (pred) => (str) =>
  str
    .split('')
    .map((ch) => (pred(ch) ? ch.toUpperCase() : ch))
    .join('');

const lowerAll = (str) => str.toLowerCase();
const raiseAll = (str) => str.toUpperCase();
const lowerFirst = (str) => str[0].toLowerCase() + str.slice(1);
const raiseFirst = (str) => str[0].toUpperCase() + str.slice(1);

const replace = (search, replace_) => (str) => str.replace(search, replace_);
const parse = (str) => str.split(' ');
const join = (sep) => (array) => array.join(sep);

//------------------------------------------------------------------------------
// Case makers

const title = pipe(lowerAll, parse, map(raiseFirst), join(' '));
const pascal = pipe(title, replace(/ /g, ''));
const camel = pipe(pascal, lowerFirst);
const snake = pipe(lowerAll, replace(/ /g, '_'));
const kebab = pipe(lowerAll, replace(/ /g, '-'));
const vowels = raiseWhen((ch) => 'aeiou'.includes(ch));
const consonants = raiseWhen((ch) => !'aeiou'.includes(ch));

const caseFunctions = {
  camel: { priority: 1, func: camel },
  pascal: { priority: 1, func: pascal },
  snake: { priority: 1, func: snake },
  kebab: { priority: 1, func: kebab },
  title: { priority: 1, func: title },
  vowels: { priority: 2, func: vowels },
  consonants: { priority: 2, func: consonants },
  upper: { priority: 3, func: raiseAll },
  lower: { priority: 3, func: lowerAll },
};

const makeCase = (input, caseNames) => {
  const getPriority = (case_) => caseFunctions[case_].priority;
  const makeCase = (str, case_) => caseFunctions[case_].func(str);

  return pipe(
    toArray,
    sort(ascend, getPriority),
    reduce(makeCase, input)
  )(caseNames);
};

//------------------------------------------------------------------------------
// Testing

const assertEqual = function (actual, expected) {
  const passed = (actual, expected) =>
    `\x1b[2m\x1b[32m   Assertion passed: ${actual} === ${expected}`;
  const failed = (actual, expected) =>
    `\x1b[0m\x1b[31m\u274c Assertion failed: ${actual} !== ${expected}`;
  const assert = actual === expected ? passed : failed;
  console.log(assert(actual, expected));
};

assertEqual(makeCase('this is a string', 'camel'), 'thisIsAString');
assertEqual(makeCase('this is a string', 'pascal'), 'ThisIsAString');
assertEqual(makeCase('this is a string', 'snake'), 'this_is_a_string');
assertEqual(makeCase('this is a string', 'kebab'), 'this-is-a-string');
assertEqual(makeCase('this is a string', 'title'), 'This Is A String');
assertEqual(makeCase('this is a string', 'vowels'), 'thIs Is A strIng');
assertEqual(makeCase('this is a string', 'consonants'), 'THiS iS a STRiNG');
assertEqual(
  makeCase('this is a string', ['upper', 'snake']),
  'THIS_IS_A_STRING'
);
