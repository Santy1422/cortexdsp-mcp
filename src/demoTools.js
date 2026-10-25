// Demo tools — self-contained, no real data, no network. Always registered.
import { z } from 'zod';
import { returnBudget } from './lib/calc.js';
import { THRESHOLDS, METRICS, DNR_FORMAT, PNOV_BENCHMARK } from './lib/reference.js';

const json = (obj) => ({ content: [{ type: 'text', text: JSON.stringify(obj, null, 2) }] });

export function registerDemoTools(server) {
  server.registerTool(
    'dsp_thresholds',
    {
      description: 'Indicative Amazon DSP scorecard metrics and their Fantastic targets (DCR, POD, DSC, DNR, LoR…).',
      inputSchema: {},
    },
    async () => json(THRESHOLDS),
  );

  server.registerTool(
    'explain_metric',
    {
      description: 'Explain what a DSP scorecard metric means and how it is computed (dcr, dsc, dnr, pod, lor, ementor).',
      inputSchema: { name: z.enum(['dcr', 'dsc', 'dnr', 'pod', 'lor', 'ementor']) },
    },
    async ({ name }) => json({ metric: name, explanation: METRICS[name] }),
  );

  server.registerTool(
    'dnr_response_format',
    {
      description: 'Educational: how a DNR (Did Not Receive) investigation is answered — the completion→location→detail cascade. Sends nothing.',
      inputSchema: {},
    },
    async () => json(DNR_FORMAT),
  );

  server.registerTool(
    'pnov_benchmark',
    {
      description: 'Typical weekly ranges for lost / potential-not-on-van packages (aggregated, anonymous).',
      inputSchema: {},
    },
    async () => json(PNOV_BENCHMARK),
  );

  server.registerTool(
    'return_budget',
    {
      description: 'How many returns (RTS) you can have and still hit a target DCR. Pure calculator.',
      inputSchema: {
        dispatched: z.number().int().positive(),
        targetDcr: z.number().positive().max(100).optional(),
      },
    },
    async ({ dispatched, targetDcr }) => json(returnBudget(dispatched, targetDcr ?? 99.0)),
  );
}
