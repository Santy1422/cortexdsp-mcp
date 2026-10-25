#!/usr/bin/env node
// cortexdsp-mcp — open-source MCP server for Amazon DSP operations.
// Demo tools always on (no data). With a CortexDSP API key, your real
// operation's tools are proxied from the hosted API.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerDemoTools } from './demoTools.js';
import { registerProxyTools } from './proxyTools.js';

const BASE_URL = process.env.CORTEXDSP_API_URL || 'https://api.cortexdsp.com/mcp';
const API_KEY = process.env.CORTEXDSP_API_KEY || '';

async function main() {
  const server = new McpServer({ name: 'cortexdsp', version: '0.1.0' });
  registerDemoTools(server);

  if (API_KEY) {
    try {
      const names = await registerProxyTools(server, { apiKey: API_KEY, baseUrl: BASE_URL });
      console.error(`[cortexdsp-mcp] connected to ${BASE_URL} — ${names.length} live tools`);
    } catch (err) {
      console.error(`[cortexdsp-mcp] could not load live tools (${err.message}); demo tools only.`);
    }
  } else {
    console.error('[cortexdsp-mcp] no CORTEXDSP_API_KEY set — demo tools only. Get a key at https://cortexdsp.com');
  }

  await server.connect(new StdioServerTransport());
}

main().catch((e) => { console.error(e); process.exit(1); });
