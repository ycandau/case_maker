//------------------------------------------------------------------------------
// General functional programming helpers

const pipe =
  (...functions) =>
  (x) =>
    functions.reduce((val, func) => func(val), x);

const always = () => true;

//------------------------------------------------------------------------------
// Problem specific helpers

const whenVowel = (ch) => 'aeiou'.includes(ch);
const whenConsonant = (ch) => !whenVowel(ch);
const whenFirst = (ch, prev) => prev === undefined;
const afterSpace = (ch, prev) => prev === ' ';

const lower = (pred) => (str) =>
  str
    .split('')
    .map((ch) => (pred(ch) ? ch.toLowerCase() : ch))
    .join('');

const raise = (pred) => (str) =>
  str
    .split('')
    .map((ch, index) => (pred(ch, str[index - 1]) ? ch.toUpperCase() : ch))
    .join('');

const replaceSpacesWith = (ch) => (str) => str.replace(/ /g, ch);

//------------------------------------------------------------------------------
// Case-makers

const lowercase = lower(always);
const uppercase = raise(always);
const vowels = pipe(lowercase, raise(whenVowel));
const consonants = pipe(lowercase, raise(whenConsonant));
const snake = pipe(lowercase, replaceSpacesWith('_'));
const kebab = pipe(lowercase, replaceSpacesWith('-'));
const title = pipe(lowercase, raise(afterSpace), raise(whenFirst));
const pascal = pipe(title, replaceSpacesWith(''));
const camel = pipe(lowercase, raise(afterSpace), replaceSpacesWith(''));

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
