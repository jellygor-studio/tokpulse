# TokPulse

**Real-time token speed, cache-savings calculator, prefix cache-drop diagnostics, and project cost billing — built natively as an MCP App for Antigravity.**

No remote debugging flags. No DOM injection. Survives every Antigravity update.

[中文文档](./README.zh-CN.md) · [Privacy Policy](./PRIVACY.md) · [Security Policy](./SECURITY.md)

---

## Why TokPulse

1. **Native MCP App (`aux_pane` + `global` + inline)**: Opens in the side panel beside your conversation, full-width from **Plugins** in the left sidebar, or inline in chat. Automatically adapts to light/dark themes and host fonts.
2. **Real-Time Speed & Pixel Lion Toggle**: Track live throughput (`tok/s`), session/global average, per-turn duration, and peak speed with a waveform sparkline or animated pixel lion mode.
3. **Entire-App or Per-Session Monitoring**: Monitor all Antigravity sessions together, auto-follow your latest active conversation, or drill into any specific thread. Subagent fragments are counted in totals without cluttering your session picker.
4. **Accurate Cache Hit Rate & Context Gauge**: Reads exact local `input_tokens`, `cache_read_tokens`, and `output_tokens` directly from standard transcripts.
5. **Global Multilingual UI**: Automatically follows your Antigravity / OS language (`en`, `zh-CN`, `zh-TW`, `ja`, `ko`, `es`, `fr`, `de`).

## Free vs. Pro

| Capability | Free | Pro |
| :--- | :---: | :---: |
| Live speed (`tok/s`), avg, peak, turn time & Pixel Lion toggle | Included | Included |
| Exact cache hit rate & context window gauge | Included | Included |
| 7-day daily usage chart & active session list | Included | Included |
| Equivalent API cost & **Cache Savings ($)** calculator | — | Included |
| **Project / Workspace Cost Breakdown** | — | Included |
| **Prefix Cache-Drop Diagnostics** & `/compact` alerts (0–100 score) | — | Included |
| Full 14-day / Week / Month trends & 14-week activity heatmap | — | Included |
| 1-click **CSV billing & Markdown report export** | — | Included |

## Quick Install

```bash
agy plugin install https://github.com/jellygor-studio/tokpulse
```

Then open **TokPulse** from the side pane **`+`** menu or **Plugins** in the left sidebar.

## Privacy First

All prompts, transcripts, and usage ledgers remain 100% on your local machine. Free mode makes zero network requests. Pro license activation sends only your license key and an anonymous SHA-256 device hash to Polar.
