//------------------------------------------------------------------------------
// General functional programming helpers

const pipe =
  (...functions) =>
  (x) =>
    functions.reduce((val, func) => func(val), x);

const always = () => true;
const never = () => false;

//------------------------------------------------------------------------------
// Problem specific helpers

const whenVowel = (ch) => 'aeiou'.includes(ch);
const whenConsonant = (ch) => !whenVowel(ch);

const raise = (pred) => (str) =>
  str
    .split('')
    .map((ch) => (pred(ch) ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');

const replaceSpacesWith = (ch) => (str) => str.replace(/ /g, ch);

//------------------------------------------------------------------------------
// Case-makers

const uppercase = raise(always);
const lowercase = raise(never);
const vowels = raise(whenVowel);
const consonants = raise(whenConsonant);
const snake = pipe(raise(never), replaceSpacesWith('_'));
const kebab = pipe(raise(never), replaceSpacesWith('-'));
const title = uppercase;
const pascal = uppercase;
const camel = uppercase;

//------------------------------------------------------------------------------
// Tests

const assert = (match, msg) =>
  console.log(`[${match ? '  -  ' : ' !!! '}]: ${msg}`);

const str = 'Test this string';

assert(uppercase(str) === 'TEST THIS STRING', 'uppercase');
assert(lowercase(str) === 'test this string', 'lowercase');
assert(vowels(str) === 'tEst thIs strIng', 'vowels');
assert(consonants(str) === 'TeST THiS STRiNG', 'consonants');
assert(snake(str) === 'test_this_string', 'snake');
assert(kebab(str) === 'test-this-string', 'kebab');
assert(title(str) === 'Test This String', 'title');
assert(pascal(str) === 'TestThisString', 'pascal');
assert(camel(str) === 'testThisString', 'camel');
