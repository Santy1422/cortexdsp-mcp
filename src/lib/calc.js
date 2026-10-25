// Pure, testable helpers for the demo tools. No network, no real data.

/**
 * How many returns (RTS) you can still have and keep a target DCR.
 * DCR = delivered / dispatched. returns = dispatched - delivered.
 * maxReturns = floor(dispatched * (1 - targetDcr/100)).
 */
export function returnBudget(dispatched, targetDcr = 99.0) {
  const d = Number(dispatched);
  const t = Number(targetDcr);
  if (!Number.isFinite(d) || d <= 0) throw new Error('dispatched must be a positive number');
  if (!Number.isFinite(t) || t <= 0 || t > 100) throw new Error('targetDcr must be between 0 and 100');
  const maxReturns = Math.floor(d * (1 - t / 100));
  return { dispatched: d, targetDcr: t, maxReturns };
}

/**
 * DPMO (defects per million opportunities) from a count + total.
 */
export function dpmo(defects, opportunities) {
  const o = Number(opportunities);
  if (!Number.isFinite(o) || o <= 0) throw new Error('opportunities must be a positive number');
  return Math.round((Number(defects) / o) * 1_000_000);
}
