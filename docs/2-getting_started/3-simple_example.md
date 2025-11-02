---
sidebar_position: 3
title: Simple example
desctiption: First simple example
keywords:
  - example
  - main
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

> ❗️ Don't forget to change the `<FILE_NAME>` to your file name and run `dart run build_runner build`.

```dart
import 'package:zodart/zodart.dart';

part '<FILE_NAME>.zodart.dart';
part '<FILE_NAME>.zodart.type.dart';

// Item schema (automatically generates the Item class)
@ZodArt.generateNewClass(outputClassName: 'Item')
abstract class ItemSchema {
  /// Schema definition
  static final schema = (
    id: ZInt().min(1).max(9999),
    name: ZString().trim().min(1).max(20),
    makerName: ZString().process((val) => '$val🚀'), // append 🚀 to the name
    notes: ZArray(ZString().min(1)).nullable(), // nullable list of notes
    price: ZDouble().min(0),
    archived: ZBool().optional(), // optional archived flag
  );

  // Access to generated helper methods like props list etc.
  static const z = _ItemSchemaUtils();
  static final ZObject<Item> zObject = z.zObject;
}

void main() {
  // Parse a map
  final res = ItemSchema.zObject.parse({
    'id': 7,
    'name': 'Cookie',
    'makerName': 'ZodArt',
    'price': 7.5,
    'notes': null,
  });

  // To access the parsed result use `.isSuccess`
  if (res.isSuccess) {
    print(res.value); // Prints: Item(..., id: 7, makerName: ZodArt🚀, ...
  } else {
    print('❌ Validation failed: ${res.issueSummary}'); // Print all issues
  }

  // Or use `match` method for a more FP way
  res.match(
    (issues) => print('❌ Validation failed: ${issues.localizedSummary}'),
    (item) => print('🟢 Validation successful: $item'),
  );

  // To obtain only issues summary for `item.price` use `getSummaryFor`
  final priceIssueSummary = res.getSummaryFor(ItemSchemaProps.price.name);
  print('Item.price issue: $priceIssueSummary');
}
```
