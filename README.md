# CortexDSP MCP

**An open-source [MCP](https://modelcontextprotocol.io) server for Amazon DSP (Delivery Service Partner) operations.** Ask Claude about your scorecard, DNR investigations, DCR/POD metrics and more — right from Claude Desktop or claude.ai.

The demo tools work offline with zero setup. Plug in a **CortexDSP API key** and the server also exposes your real operation's data (DNR cases, who-delivered, scorecard comparisons, driver quality…) — securely proxied from the hosted API.

> Built for AMZL DSPs who are tired of Amazon's slow, fragmented dashboards.

## Quick start (Claude Desktop)

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cortexdsp": {
      "command": "npx",
      "args": ["-y", "cortexdsp-mcp"]
    }
  }
}
```

Restart Claude Desktop. You now have the free demo tools. To unlock your own data, add your key:

```json
{
  "mcpServers": {
    "cortexdsp": {
      "command": "npx",
      "args": ["-y", "cortexdsp-mcp"],
      "env": { "CORTEXDSP_API_KEY": "your-key-here" }
    }
  }
}
```

Get a key at **[cortexdsp.com](https://cortexdsp.com)**.

## Tools

### Free (no key, no data)

| Tool | What it does |
|---|---|
| `dsp_thresholds` | Scorecard metrics and their Fantastic targets (DCR, POD, DSC, DNR, LoR…). |
| `explain_metric` | What a metric means and how it's computed (`dcr`, `dsc`, `dnr`, `pod`, `lor`, `ementor`). |
| `dnr_response_format` | How a DNR (Did Not Receive) investigation is answered — the completion→location→detail cascade. Educational; sends nothing. |
| `pnov_benchmark` | Typical weekly ranges for lost / potential-not-on-van packages. |
| `return_budget` | How many returns you can have and still hit a target DCR. |

### With a CortexDSP key (your real data)

`dnr_list`, `missing_pnov`, `who_delivered`, `scorecard_compare`, `driver_quality`, `mentor_status`, `mail_list`, and more — scoped to your tenant. These are proxied from `api.cortexdsp.com`; this repo contains **no** business logic or credentials.

## How it works

```
Claude ──stdio──> cortexdsp-mcp (this repo)
                     ├─ demo tools        → answered locally, no data
                     └─ your-data tools   → proxied to api.cortexdsp.com with your key
```

The same package serves everyone: without a key you get the demo tools; with a valid key + active subscription, your real tools are registered by proxy. If a key is missing or invalid, you simply fall back to the demo tools.

## Privacy & security

- This repo never contains API tokens, credentials, or internal endpoints.
- Your key lives only in your local MCP config and is sent to `api.cortexdsp.com` over HTTPS.
- Demo tools are fully self-contained and cannot read any customer data.

## Develop

```bash
npm install
npm test          # unit tests (node:test)
npm start         # run the server over stdio
```

## License

MIT © CortexDSP
