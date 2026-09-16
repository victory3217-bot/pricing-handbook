# CH10-EX02. Case 2 — Nothing Confirmed Yet (Same Product)

- Related Chapter: CH10 (MODE A — Current Price Diagnosis)
- Related Tool: MODE A (`core/engine/modes/mode_a.py`, `run_mode_a`)
- Data source: `docs/features/mode_a_current_price/CASE.md` "Case 2 — same product, nothing confirmed yet" (fictional data, `04_incomplete_inputs.json`)

## What This Case Illustrates

The same product as EX01, but showing what MODE A outputs when none of the cost and tax data have been entered yet. It confirms CH10's core design principle: MODE A honestly reports unconfirmed values as `UNKNOWN` rather than substituting 0.

## Case Data

The same premium tumbler product, but `price_includes_vat`, `vat_rate`, the `amount`/`rate` of every cost item, and even `fx.rate_base_per_reporting` are all `null` (`04_incomplete_inputs.json`).

## Result

- `mode_a.status = "INCOMPLETE"`
- All 7 metrics are `UNKNOWN`
- 7 warnings — each metric specifies exactly which Client Input field is missing
- `direct_cost_total` and `variable_cost_total` each fail independently, due to different missing fields.
- `gross_profit` fails because both `actual_price_ex_vat` and `direct_cost_total` are unresolved (`DOWNSTREAM_UNKNOWN`). The metrics after it fail in a chain as a result.

## Why This Case Matters

This case directly corrects a mistake made by the project's prior (pre-Harness) prototype spreadsheet. That spreadsheet treated the same kind of missing cost as 0, and once reported a plausible-looking but baseless 81.5% margin. Case 2 shows what it looks like when, in the same situation, the engine honestly shows "what it doesn't know."
