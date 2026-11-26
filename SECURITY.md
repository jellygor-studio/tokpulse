# Security Policy — TokPulse

## Architecture Safeguards

- **Zero host tampering**: TokPulse never modifies `app.asar`, never injects DOM scripts into the Electron renderer, and never requires `--remote-debugging-port`.
- **Zero permission interference**: Lifecycle hooks only observe `SessionStart`, `PreInvocation`, `PostInvocation`, `PostToolUse`, and `Stop`. TokPulse intentionally does **not** register `PreToolUse` hooks and never approves, rewrites, or blocks user tool permissions.
- **Strict CSP isolation**: The MCP App UI is bundled into a single self-contained HTML document with zero external script, font, or stylesheet loads.
- **Local-only storage**: All runtime state is written exclusively inside `${PLUGIN_DATA}` using Node's built-in `node:sqlite`.

## Reporting a Vulnerability

If you discover a security issue, please report it via GitHub Security Advisories in our repository or contact the maintainers directly rather than opening a public issue.
