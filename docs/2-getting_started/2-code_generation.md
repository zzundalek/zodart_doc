---
sidebar_position: 2
title: Code generation
desctiption: Code generation detail
keywords:
  - code
  - generation
  - build_runner
  - macros
last_update:
  date: 10/6/2025
  author: Zbynek Zundalek
---

Due to Dart’s limitations with `reflection`, and the [Dart team halting development on macros](https://blog.dart.dev/an-update-on-dart-macros-data-serialization-06d3037d4f12), code generation remains the most practical approach to metaprogramming in Dart.

Many major Dart packages—such as `riverpod`, `freezed`, and `drift`—heavily rely on [code generation](https://pub.dev/packages/build_runner) to simplify and automate boilerplate.

## Why code generation?

While ZodArt works perfectly **without** code generation, using it is **highly recommended**:

- 🛠️ Automatically generates a **type-safe `ZObject` mapper** — no more magic strings
- 🧩 Handles nested schemas and arrays automatically
- 🏗️ Automatically generates schema output classes if needed
- 🔄 Supports mapping to existing Freezed or custom classes
- 🔍 Exposes type-safe property access to simplify field-specific issue handling
- ✨ Significantly reduces boilerplate and improves developer experience

🔗 See a [full example with code generation](https://github.com/zzundalek/zodart/blob/main/example/main.dart)  
🔗 Or view an [example without code generation](https://github.com/zzundalek/zodart/blob/main/example/no_code_generation/no_code_generation.dart)
