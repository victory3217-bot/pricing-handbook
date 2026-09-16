# CH14 Scenario Design Worksheet

> This worksheet follows Scenario Compare's request structure (`scenario_compare_request`, SPEC.md §4/§19) as-is. Do not add items that are not in the schema.

## 1. Base Input (Baseline Scenario)

| Field | Value |
|---|---|
| component_id | |
| actual_price | |
| price_includes_vat | |
| target_market_price | |
| discount_rate | |
| direct_cost (by item_id) | |
| variable cost items (rate/amount, by item_id) | |
| fixed_operating_cost | |
| target_contribution_margin_rate | |
| vat_rate | |
| fx.rate_base_per_reporting (if applicable) | |

## 2. Designate the Baseline Scenario

- `baseline_scenario_id`: ________________
- Does this scenario use the Base Input as-is, or does it have its own overrides: ________________

> Note: The first scenario in the list does not automatically become the baseline. It must always be designated explicitly.

## 3. Variant Scenarios

There must be at least 2 scenarios in total (including the baseline). Repeat the table below for each scenario.

### Scenario [ ]

| Field | scenario_id | label |
|---|---|---|
| | | |

**overrides.components[]** (addressed by component_id; enter only the fields being changed)

| component_id | actual_price | target_market_price | price_includes_vat | discount_rate |
|---|---|---|---|---|
| | | | | |

**overrides.cost_items[]** (addressed by item_id; enter only the fields being changed)

| item_id | amount | rate |
|---|---|---|
| | | |

**overrides.targets**

| target_contribution_margin_rate |
|---|
| |

**overrides.tax**

| vat_rate |
|---|
| |

**overrides.fx**

| rate_base_per_reporting |
|---|
| |

> Fields left blank keep the base_input value. To explicitly clear a field (treat it as null), write "null" so it is processed as UNKNOWN.
> component_id/item_id may only use values that already exist in base_input. Adding a new component or cost item is out of scope for v0.1.
> The same component_id or item_id cannot be overridden twice within one scenario — if multiple fields need to change, put them all in the same entry.

## 4. What Changes — Summary

| Scenario | What changes (price/cost/channel/customer segment, etc.) | Purpose of review |
|---|---|---|
| | | |
| | | |

## 5. Results Checklist

- [ ] At least 2 scenarios
- [ ] baseline_scenario_id specified and matches an actual existing scenario_id
- [ ] No duplicate scenario_id
- [ ] Override target component_id/item_id values actually exist in base_input
- [ ] No duplicate override targets within any single scenario
- [ ] Checked each scenario's scenario_status (OK / INCOMPLETE / ERROR)
- [ ] Checked the 4 deltas against baseline: net_sales_ex_vat_delta, contribution_margin_delta, contribution_margin_rate_delta, break_even_quantity_delta
- [ ] Checked whether any delta status is UNKNOWN/NOT_APPLICABLE/ERROR, and if so, identified the cause
