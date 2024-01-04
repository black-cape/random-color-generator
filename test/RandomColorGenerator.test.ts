import {RandomColorGenerator} from 'src';
import {expect, test} from 'vitest';

test('can construct without specifying a seed', function () {
  const randomColorGenerator = new RandomColorGenerator();

  expect(randomColorGenerator).toBeDefined();
});

test('can construct specifying a seed', function () {
  const randomColorGenerator = new RandomColorGenerator(1);

  expect(randomColorGenerator).toBeDefined();
});

test('can construct specifying another color function', function () {
  function newColorFunction(color: number) {
    return color.toString();
  }

  const randomColorGenerator = new RandomColorGenerator(1, newColorFunction);

  expect(randomColorGenerator).toBeDefined();
  expect(randomColorGenerator.next()).toBeDefined();
});

test('can get the seed value', function () {
  const seed = 123456789;

  const randomColorGenerator = new RandomColorGenerator(seed);

  expect(randomColorGenerator.seed).toBe(seed);
});

test('gets next color with key', function () {
  const key = 'test';

  const randomColorGenerator = new RandomColorGenerator(0);
  const result = randomColorGenerator.next(key);

  expect(result).toBeDefined();
});

test('gets next color without a key', function () {
  const randomColorGenerator = new RandomColorGenerator(0);
  const result = randomColorGenerator.next();

  expect(result).toBeDefined();
});

test('gets the same color when using the same key', function () {
  const key = 'test';

  const randomColorGenerator = new RandomColorGenerator(0);
  const result1 = randomColorGenerator.next(key);
  const result2 = randomColorGenerator.next(key);

  expect(result1).toEqual(result2);
});

test('gets different colors when using different keys', function () {
  const key1 = 'test1';
  const key2 = 'test2';

  const randomColorGenerator = new RandomColorGenerator(0);
  const result1 = randomColorGenerator.next(key1);
  const result2 = randomColorGenerator.next(key2);

  expect(result1).not.toEqual(result2);
});
