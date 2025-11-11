---
sidebar_position: 1
title: Types
description: ZodArt types description
keywords:
  - type
  - types
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

By default, ZodArt parsers operate in **strict mode**, see more about [parsers here](/docs/3-defining_schemas/2-parsing.md).

## Strings

Corresponds to the Dart `String` type.

Definition:

```dart
ZString();
ZString().nullable();
ZString().optional();
```

Validations:

```dart
ZString().min(1);
ZString().max(7);
ZString().regex('^[a-z]*$');
```

Value processing:

```dart
ZString().toLowerCase();
ZString().toUpperCase();
ZString().trim();
```

Type transformations:

```dart
ZString().toInt();
ZString().toDouble();
ZString().toDateTime();
```

## Integers

Corresponds to the Dart `int` type.

Definition:

```dart
ZInt();
ZInt().nullable();
ZInt().optional();
```

Validations:

```dart
ZInt().min(1);
ZInt().max(7);
```

Type transformations:

```dart
ZInt().toStr((val) => '$val');
ZInt().toDouble();
```

## Decimals

Corresponds to the Dart `double` type.

Definition:

```dart
ZDouble();
ZDouble().nullable();
ZDouble().optional();
```

Validations:

```dart
ZDouble().min(1.0);
ZDouble().max(7.0);
```

Type transformations:

```dart
ZDouble().toStr((val) => '$val');
ZDouble().toInt((val) => val.round());
```

## Date and time

Corresponds to the Dart `DateTime` type.

Definition:

```dart
ZDateTime();
ZDateTime().nullable();
ZDateTime().optional();
```

Validations:

```dart
ZDateTime().min(DateTime.now());
ZDateTime().max(DateTime.now());
```

Type transformations:

```dart
ZDateTime().toStr((val) => val.toString());
```

## Boolean

Corresponds to the Dart `bool` type.

Definition:

```dart
ZBool();
ZBool().nullable();
ZBool().optional();
```

Type transformations:

```dart
ZBool().toStr((val) => val.toString());
```

## Iterables

Corresponds to the Dart `List<T>` type.

Definition:

```dart
ZArray(ZString());
ZArray(ZString()).nullable();
ZArray(ZString()).optional();
```

Validations:

```dart
ZArray(ZString()).min(1);
ZArray(ZString()).max(7);
```

Type transformations:

```dart
ZArray(ZString()).toStr((vals) => vals.join(','));
ZArray(ZInt()).toArray(myIntsToStrings); // Change the type from List<int> to List<String>
```

## Complex objects

Corresponds to the Dart records or instances based on a class.

### ZObject definition

#### Code generation

##### New class based on your schema

ZodArt automatically generates the class representation code including the `.toString()`, `.fromJson()` methods and the **equality** code.

```dart
@ZodArt.generateNewClass(outputClassName: 'Item')
abstract class ItemSchema {
  // The schema used to generate the class
  static final schema = (
    id: ZInt(),
    name: ZString().optional(),
  );

  static const z = _ItemSchemaUtils();
  static final ZObject<Item> zObject = z.zObject;
}

// ZObject<Item>
ItemSchema.zObject;
```

##### Existing class

To reuse your existing models (e.g. `freezed` classes), ZodArt automatically selects the best constructor and generates all the necessary boilerplate code to instantiate the class.

```dart
class Item {
  /// class code including a valid public constructor
}

@ZodArt.withExistingClass(outputClassType: Item)
abstract class ItemSchema {
  static final schema = (
    id: ZInt(),
    name: ZString().nullable(),
  );

  static const z = _ItemSchemaUtils();
  static final ZObject<Item> zObject = z.zObject;
}

// ZObject<Item>
ItemSchema.zObject;
```

##### Dart Record

To a Dart record as output, ZodArt automatically generates all the necessary boilerplate code to create the record.

```dart
typedef Item = ({int id, String name});

@ZodArt.withRecord(outputRecordType: Item)
abstract class ItemSchema {
  static final schema = (
    id: ZInt(),
    name: ZString(),
  );

  static const z = _ItemSchemaUtils();
  static final ZObject<Item> zObject = z.zObject;
}

// ZObject<Item>
ItemSchema.zObject;
```

#### No code generation

> ⚠️ Using code generation is [HIGHLY recommended](/docs/2-getting_started/2-code_generation.md#why-code-generation)

Without code generation you are required to write the `.fromJson()` method by yourself.
Even reusing `.fromJson()` from tools like `freezed` can be error-prone due to potential mismatches between the schema and the actual output.

```dart
// ZObject<({int id, String name})>
ZObject.withMapper(
  {
    'id': ZInt(),
    'name': ZString(),
  },
  // Mapper required to create the output
  fromJson: (Map<String, dynamic> rawData) => (
    id: rawData['id'] as int,
    name: rawData['name'] as String
  ),
);
```

### Other methods

Nullability:

```dart
myZObj.nullable();
myZObj.optional();
```

Type transformations:

```dart
myZObj.toStr(myObjToString);
myZObj.toObj(myObjToMyNewObj); // Change the type from MyObj to MyNewObj
```
