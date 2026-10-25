import { test } from 'node:test';
import assert from 'node:assert/strict';
import { returnBudget, dpmo } from '../src/lib/calc.js';

test('returnBudget: 200 dispatched @ 99% leaves 2 returns', () => {
  assert.deepEqual(returnBudget(200, 99), { dispatched: 200, targetDcr: 99, maxReturns: 2 });
});

test('returnBudget: floors partial returns', () => {
  // 150 * 0.01 = 1.5 -> 1
  assert.equal(returnBudget(150, 99).maxReturns, 1);
});

test('returnBudget: default target is 99%', () => {
  assert.equal(returnBudget(1000).maxReturns, 10);
});

test('returnBudget: rejects bad input', () => {
  assert.throws(() => returnBudget(0, 99));
  assert.throws(() => returnBudget(100, 0));
  assert.throws(() => returnBudget(100, 150));
});

test('dpmo: 1 defect in 100000 = 10 dpmo', () => {
  assert.equal(dpmo(1, 100000), 10);
});

test('dpmo: rejects zero opportunities', () => {
  assert.throws(() => dpmo(5, 0));
});
