// Proxy tools — only active with a valid CortexDSP API key. These carry NO
// business logic: they connect to the hosted CortexDSP MCP and re-expose its
// tools 1:1. The real logic lives behind the API, never in this public repo.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { z } from 'zod';

export async function registerProxyTools(server, { apiKey, baseUrl }) {
  const url = new URL(baseUrl);
  url.searchParams.set('key', apiKey);

  const client = new Client({ name: 'cortexdsp-mcp-proxy', version: '1.0.0' });
  await client.connect(new StreamableHTTPClientTransport(url));

  const { tools } = await client.listTools();
  for (const tool of tools) {
    const props = tool.inputSchema?.properties || {};
    const required = new Set(tool.inputSchema?.required || []);
    const shape = {};
    for (const k of Object.keys(props)) shape[k] = required.has(k) ? z.any() : z.any().optional();

    server.registerTool(
      tool.name,
      { description: tool.description || `CortexDSP: ${tool.name}`, inputSchema: shape },
      async (args) => client.callTool({ name: tool.name, arguments: args || {} }),
    );
  }
  return tools.map((t) => t.name);
}
