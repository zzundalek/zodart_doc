---
sidebar_position: 2
title: Parsing values
desctiption: Parsing values
keywords:
  - parse
  - parsing
last_update:
  date: 3/23/2026
  author: Zbynek Zundalek
---

## Strict mode

By default, ZodArt parsers operate in **strict mode**. This means they will only accept input values that **match the expected type exactly**. Any type mismatch will result in a **ParseError**.

The only exception is **ZObject**, which accepts only `Map<String, dynamic>` as input.

| ➡️input ⬇️output | `List` | `bool` | `DateTime` | `double` | `int` | `Map<String, dynamic>` | `String` | `others` |
| ---------------- | ------ | ------ | ---------- | -------- | ----- | ---------------------- | -------- | -------- |
| ZArray           | ✅     | ❌     | ❌         | ❌       | ❌    | ❌                     | ❌       | ❌       |
| ZBool            | ❌     | ✅     | ❌         | ❌       | ❌    | ❌                     | ❌       | ❌       |
| ZDateTime        | ❌     | ❌     | ✅         | ❌       | ❌    | ❌                     | ❌       | ❌       |
| ZDouble          | ❌     | ❌     | ❌         | ✅       | ❌    | ❌                     | ❌       | ❌       |
| ZEnum            | ❌     | ❌     | ❌         | ❌       | ❌    | ❌                     | ✅       | ✅\*     |
| ZInt             | ❌     | ❌     | ❌         | ❌       | ✅    | ❌                     | ❌       | ❌       |
| ZObject          | ❌     | ❌     | ❌         | ❌       | ❌    | ✅                     | ❌       | ❌       |
| ZString          | ❌     | ❌     | ❌         | ❌       | ❌    | ❌                     | ✅       | ❌       |

\* Can accept `Enum` values when using a custom parser.
