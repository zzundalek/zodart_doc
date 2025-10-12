---
sidebar_position: 1
title: Installation
desctiption: Installation steps
keywords:
  - pub
  - install
  - add
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

Setting up ZodArt is quick and easy:

> ℹ️ Optional: Even though using code generation is **HIGHLY** recomended (see [why code generation](/docs/2-getting_started/2-code_generation.md#why-code-generation)), ZodArt can work without it.
> If you really don't want to use code generation for some reason, only [Add ZodArt package](#add-zodart-package).

1. [Add ZodArt package](#add-zodart-package)
1. [Add build_runner package](#add-build_runner-package)
1. [Use ZodArt annotations](#use-zodart-annotations)
1. [🚀 Recommended: Install ZodArt snippets extension](#install-zodart-snippets)

## Add ZodArt package

Add [ZodArt](https://pub.dev/packages/zodart) package to your dependencies:

For Flutter project:

```bash
flutter pub add zodart
```

For Dart project:

```bash
dart pub add zodart
```

## Add build_runner package

Add [build_runner](https://pub.dev/packages/build_runner) package to your dependencies:

For Flutter project:

```bash
flutter pub add dev:build_runner
```

For Dart project:

```bash
dart pub add dev:build_runner
```

## Use ZodArt annotations

1. Add a `part` directive into your code to include the generated code:

   ```dart
   import 'package:zodart/zodart.dart';

   // MANDATORY
   // Add part '<your_file_name.zodart.dart>'; so for 'code_gen_example.dart' add:
   part 'code_gen_example.zodart.dart';

   // MANDATORY when generating output class
   // Add part '<your_file_name.zodart.type.dart>'; so for 'code_gen_example.dart' add:
   part 'code_gen_example.zodart.type.dart';

   /// your code using `@ZodArt` annotation follows
   ```

1. Run `build_runner` to generate the ZodArt helper / output classes

   ```bash
   dart run build_runner build
   ```

## 🚀 Recommended: Install ZodArt snippets extension for VS Code {#install-zodart-snippets}

To simplify the schema creation use the official [ZodArt Snippets extension for VS Code](https://marketplace.visualstudio.com/items?itemName=mergepanic.zodart-snippets).

![ZodArt Snippets extension](./img/zodart_snippets_new_class.gif)

## Links

🔗 See the [full working example](https://github.com/zzundalek/zodart/blob/main/example/main.dart).
