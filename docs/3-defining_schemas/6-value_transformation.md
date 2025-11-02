---
sidebar_position: 6
title: Value transformation
desctiption: Value transformation
keywords:
  - value
  - transformation
  - type
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

Often you’ll want to parse the raw input, and then transform it into a model that your app actually uses.
ZodArt makes this straightforward with the built-in transformation methods (e.g. `.toInt()`, `.toObj(t)`, `.toArray(t)`, etc.).

These transformation methods are applied only to non-null values. For more about the available transformations, see the [types](/docs/3-defining_schemas/1-types.md).

See full example [here](https://github.com/zzundalek/zodart/tree/main/example/transformations/transformations.dart).

```dart
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:zodart/zodart.dart';

part 'transformations.freezed.dart';
part 'transformations.zodart.dart';
part 'transformations.zodart.type.dart';

@ZodArt.generateNewClass(outputClassName: 'LanguageDetail')
abstract class LanguageDetailSchema {
  static final schema = (
    name: ZString(),
    version: ZString().optional(),
    lastUpdate: ZDateTime(),
    notes: ZArray(ZString()).nullable(),
  );

  static const z = _LanguageDetailSchemaUtils();
  static final ZObject<LanguageDetail> zObject = z.zObject;
}

@freezed
abstract class Language with _$Language {
  const factory Language({
    required String name,
    required String version,
  }) = _Language;
}

Language toLang(LanguageDetail l) => Language(name: l.name, version: l.version ?? 'Not available');

void main() {
  final languageDetailsSchema = LanguageDetailSchema.zObject;
  final languageSchema = languageDetailsSchema.toObj(toLang);

  final res = languageSchema.parse({
    'name': 'Dart',
    'version': '3.9.0',
    'lastUpdate': DateTime.parse('2025-08-13'),
    'notes': null,
  });

  print(res.value); // Language(name: Dart, version: 3.9.0)
}
```
