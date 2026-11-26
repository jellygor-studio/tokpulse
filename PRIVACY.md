# Privacy Policy — TokPulse

Last updated: November 2026

TokPulse is designed with a **100% local-first** architecture.

## 1. What Stays Strictly on Your Machine

- All conversation prompts, model outputs, thinking traces, and source code never leave your device.
- TokPulse reads local session transcript logs strictly to compute numeric metrics (token counts, cache hits, timing, model names, and workspace project labels).
- All aggregated ledgers, exported CSV/Markdown reports, and preferences are stored locally in your Antigravity plugin data directory (`${PLUGIN_DATA}/tokpulse.db`).
- TokPulse does **not** include analytics SDKs, ad trackers, or telemetry beacons.

## 2. Optional Network Request (Pro License Activation Only)

TokPulse makes zero network requests in Free mode.

If you choose to activate a **TokPulse Pro** license key, the local MCP server sends a single HTTPS POST request to Polar (`https://api.polar.sh/v1/customer-portal/license-keys/*`) containing only:

1. Your license key
2. A one-way SHA-256 anonymous device fingerprint (for enforcing activation limits)

No prompts, token counts, workspace paths, filenames, or email addresses are transmitted during license validation.

## 3. Data Deletion

Uninstalling the plugin or deleting `${PLUGIN_DATA}/tokpulse.db` permanently removes all locally cached metrics and license records.
