---
sidebar_position: 3
title: Nullability
desctiption: Nullability description
keywords:
  - nullable
  - optional
  - nullability
  - default
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

## Nullable & optional values

To allow nullable types ZodArt provides the `.nullable()` modifier for all types.

```dart
ZString(); // Allows the `String` type
ZString().nullable(); // Allows the `String?` type
```

In Dart, unlike JavaScript, there is no concept of `undefined` value. However, when parsing `ZObject` from `Map<String, dynamic>`, a missing key (`!map.containsKey('key')`) is the Dart equivalent of `undefined`.
To explicitly allow missing keys, ZodArt provides the `.optional()` modifier.

For all other types like `ZString`, `ZInt`, etc., there is no concept of a "missing" value. In this context, the `.optional()` modifier has no semantic effect and is treated as **equivalent** to `.nullable()`.

### ZObject Parsing (Map fields)

- `.nullable()` - allows the field value to be `null`
- `.optional()` - allows the field to be either `null` or **missing from the map**

| Field value             | `.nullable()`                    | `.optional()`                    |
| ----------------------- | -------------------------------- | -------------------------------- |
| not-null-value          | ✅ ParseSuccess (not-null-value) | ✅ ParseSuccess (not-null-value) |
| null                    | ✅ ParseSuccess (null)           | ✅ ParseSuccess (null)           |
| !map.containsKey('key') | ❌ ParseError                    | ✅ ParseSuccess (null)           |

### Other Types Parsing

| Value          | `.nullable()`                    | `.optional()`                    |
| -------------- | -------------------------------- | -------------------------------- |
| not-null-value | ✅ ParseSuccess (not-null-value) | ✅ ParseSuccess (not-null-value) |
| null           | ✅ ParseSuccess (null)           | ✅ ParseSuccess (null)           |

## Handling null values

Processing and validation modifiers are skipped for `null` values, but sometimes you don’t just want to accept null, but also provide a default value in that case.
For this purpose, every nullable schema type supports the `.onNull(fn)` modifier, which is invoked whenever the current value is null.

See the [full example](https://github.com/zzundalek/zodart/tree/main/example/on_null_method/on_null_method.dart).

```dart
import 'package:zodart/zodart.dart';

void main() {
  final zString = ZString().nullable().onNull(() => 'default value');

  print(zString.parse('ZodArt').value); // ZodArt
  print(zString.parse(null).value); // default value
}
```
