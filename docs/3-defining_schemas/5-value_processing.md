---
sidebar_position: 5
title: Value processing
desctiption: Value processing
keywords:
  - value
  - processing
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

To change a value, use the `.process()` method.
It is available on all schema types, and can be chained freely.
The returned value must **match the return type of the schema**.

> ℹ️ Processing is skipped automatically for null values, see more on [nullability](/docs/3-defining_schemas/3-nullability.md#handling-null-values).

```dart
import 'package:zodart/zodart.dart';

String toTrendyUpperCase(String val) => '🔥 ${val.trim().toUpperCase()}';
String toFlashySuffix(String val) => '$val ✨';

List<T> revertList<T>(List<T> val) => val.reversed.toList();

final zString = ZArray(ZString().process(toTrendyUpperCase).process(toFlashySuffix)).process(revertList);

void main() {
  final res = zString.parse([' zodart ', 'world   ', '  hello']);

  print(res.value); // [🔥 HELLO ✨, 🔥 WORLD ✨, 🔥 ZODART ✨]
}
```
