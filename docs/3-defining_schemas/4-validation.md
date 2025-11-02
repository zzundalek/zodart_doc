---
sidebar_position: 4
title: Validation
desctiption: Data validation
keywords:
  - valid
  - validation
  - refine
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

> ❗️ Important: Never throw inside a `.refine()` function — ZodArt will not catch it.

In addition to built-in validation methods like `.min()`, you can add your own validation logic using the `.refine()` method.

The `.refine()` method should return `true` if the value is valid, or `false` otherwise.
When `.refine()` returns `false`, ZodArt creates a `ZIssueCustom` issue.
You can optionally provide a `message` or `code` to include it in the issue.

See [full example](https://github.com/zzundalek/zodart/tree/main/example/refine_method/refine_method.dart).

> ℹ️ To return multiple issues or apply advanced validations use the `.superRefine()` [method](https://github.com/zzundalek/zodart/tree/main/example/super_refine_method/super_refine_method.dart).

```dart
import 'package:zodart/zodart.dart';

part 'refine_method.zodart.dart';
part 'refine_method.zodart.type.dart';

/// Schema defined using ZodArt
@ZodArt.generateNewClass(outputClassName: 'Person')
abstract class PersonSchema {
  /// Validates that:
  /// - `firstName` is from 1 to 20 characters long
  /// - `lastName` is from 1 to 30 characters long
  /// - `validFrom` is a timestamp in seconds
  /// - `validTo` is an optional timestamp in seconds
  static final schema = (
    firstName: ZString().min(1).max(20),
    lastName: ZString().min(1).max(30),
    validFrom: ZInt(),
    validTo: ZInt().optional(),
  );

  // Access to generated helper methods like props list etc.
  static const z = _PersonSchemaUtils();
  static final ZObject<Person> zObject = z.zObject;
}

void main() {
  // Refine the `personSchema` to ensure that `validFrom` < `validTo`
  final refinedPersonSchema = PersonSchema.zObject.refine(
    (person) {
      final validTo = person.validTo;
      return validTo == null || person.validFrom < validTo;
    },
    message: 'validFrom must be earlier than validTo.',
  );

  // Parse raw input (e.g. from an API, user form, etc.)
  // ZodArt infers the type of `result.value` as `Person`
  final result = refinedPersonSchema.parse({
    'firstName': 'Zod',
    'lastName': 'Art',
    'validFrom': 1749952242,
    'validTo': 631152000,
  });

  // Prints the custom error message 'validFrom must be earlier than validTo.'
  print(result.issueSummary);
}
```
