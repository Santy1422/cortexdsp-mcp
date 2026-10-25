import { test } from 'node:test';
import assert from 'node:assert/strict';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerDemoTools } from '../src/demoTools.js';

test('registerDemoTools registers the 5 demo tools without throwing', () => {
  const server = new McpServer({ name: 'test', version: '0.0.0' });
  registerDemoTools(server);
  const names = Object.keys(server._registeredTools || {});
  for (const expected of ['dsp_thresholds', 'explain_metric', 'dnr_response_format', 'pnov_benchmark', 'return_budget']) {
    assert.ok(names.includes(expected), `missing tool ${expected}`);
  }
});

test('return_budget tool computes via its callback', async () => {
  const server = new McpServer({ name: 'test', version: '0.0.0' });
  registerDemoTools(server);
  const tool = server._registeredTools['return_budget'];
  const res = await tool.handler({ dispatched: 200, targetDcr: 99 }, {});
  const payload = JSON.parse(res.content[0].text);
  assert.equal(payload.maxReturns, 2);
});
