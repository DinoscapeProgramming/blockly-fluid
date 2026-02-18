# Blockly, but fluid

If you've ever used Blockly before, you'd know what kind of pain it is to use. Especially crafting your own blocks. You're not alone. Blockly Fluid is the DX-focused adapter of defining blocks with their own generators.

## See it in action!

https://yolkweb.org

## Installation

### Node.js/Deno/Bun

```sh
$ npm install blockly-fluid
```

#### ESM

```js
import BlocklyFluid from "blockly-fluid";
```

#### CommonJS

```js
const BlockyFluid = require("blockly-fluid");
```

### Browser

```js
import BlockyFluid from "https://esm.sh/blockly-fluid";
```

## Initialization

You have to provide your own Blockly instance since there isn't a reliable way to import Blockly in every environment.

```js
const Blocks = BlocklyFluid(Blockly, options);
```

### Options

All options are **optional**, Blockly Fluid tries to never force specifying specific information and assumes defaults by default.

```js
{
  generator: Blockly.JavaScript /*
    This is the fallback generator. It will be used for the "generator" property of a block's definition.
  */,
  generators: {
    JavaScript: Blockly.JavaScript // etc.
  },
  translate: (text) => mySuperCoolTranslationLogic(text) // translates labels, default values & tooltips
}
```

## Make My Block

```js
Blocks["block-name"] = {
  hat: false /*
    default: false,
    purpose:
      - creates a round shape on top of the block
      - great for event blocks
  */,
  layout: ["wait", "SECONDS", "seconds"] /*
    default: [],
    purpose:
      - specifies the parts of a block in chronological order
      - if the value is found to be the name of an input, field or statement, it will be inserted
      - otherwise, the text will be inserted as a label
  */
}
```

A flexible **Proxy wrapper** for Blockly blocks that lets you define **dynamic inputs, layouts, fields, and shadows** with ease! Perfect for creating modular, reusable blocks that can adapt at runtime.

---

## Features 🚀

* **Dynamic Inputs** 🔌
  Define `inputs` with optional `check` types and `shadow DOM` — all can be functions for runtime evaluation.

* **Flexible Layouts** 🧩
  Use `layout` arrays to arrange your block fields. Tokens can be functions or strings.

* **Custom Fields** ✏️
  Supports:

  * `text` → `FieldTextInput`
  * `multiline` → `FieldMultilineInput`
  * `dropdown` → `FieldDropdown`
  * Default → translated text

* **Dynamic Statements** 📑
  `statements` labels can be functions for runtime flexibility.

* **Previous / Next / Output / Tooltip / Color** 🎨
  All block properties can be static values or functions.

* **Automatic Shadow DOM** 🌟
  Automatically adds shadow DOM to inputs with `"String"` or `"Number"` checks.

* **Translation Ready** 🌍
  Built-in support for multi-language translations with placeholders.

---

## Usage 💡

```js
const Blockly = require("blockly");
const Blocks = require("blockly-fluid")(Blockly);

Blocks["controls_repeat_forever"] = {
  layout: ["repeat forever", "DO"],
  statements: {
    DO: {
      label: () => Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] || "do"
    }
  },
  previous: true,
  next: true,
  tooltip: "Repeat the enclosed blocks forever"
};
```

### Features in action:

* Dynamic field labels ✅
* Custom multiline input ✅
* Shadow DOM automatically set ✅
* Runtime evaluated inputs, statements, colors, tooltips ✅

---

## Example Block 🧱

```js
Blocks["metadata_set_description"] = {
  color: "#565353",
  layout: ["set description", "DESCRIPTION"],
  fields: {
    DESCRIPTION: {
      type: "multiline",
      default: "Enter description..."
    }
  },
  tooltip: "Metadata block to specify command's description."
};
```

---

## Supported Field Types ✨

| Type        | Blockly Field       |
| ----------- | ------------------- |
| `text`      | FieldTextInput      |
| `multiline` | FieldMultilineInput |
| `dropdown`  | FieldDropdown       |
| Default     | Translated text     |

---

## Why use this module? 💖

* Save time creating complex Blockly blocks
* All block properties can be **dynamic functions**
* Built-in **shadow DOM support**
* Built-in **translation** handling
* Works for **both static and runtime-generated blocks**

---

## License 📄

MIT License — free to use, modify, and distribute!

---

*Made with ❤️ (and probably caffeine) by [Dinoscape](https://github.com/DinoscapeProgramming)*