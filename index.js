module.exports = (Blockly, { generator: languageGeneratorFallback, generators: languageGenerators = {}, translate = (text) => text } = {}) => {
  const Blocks = new Proxy({}, {
    set(_, name, {
      hat,
      layout = [],
      inputs = {},
      fields = {},
      statements = {},
      previous = !hat,
      next = true,
      output,
      color,
      inline = true,
      deletable = true,
      tooltip = "",
      help = "",
      generator: blockGeneratorFallback,
      generators: blockGenerators = {}
    }) {
      Blockly.Blocks[name] = {
        init: function () {
          if ((typeof hat === "function") ? hat() : hat) this.setStyle("hat_blocks");

          if (typeof layout === "function") (layout = layout());
          if (typeof inputs === "function") (inputs = inputs());
          if (typeof statements === "function") (statements = statements());

          if ((Array.isArray(layout)) ? layout.length : ((typeof layout === "string") ? layout : false)) {
            ((Array.isArray(layout)) ? layout : [layout]).forEach((token) => {
              if (typeof token === "function") (token = token());

              const input = (typeof inputs[token] === "function") ? inputs[token]() : inputs[token];
              const field = (typeof fields[token] === "function") ? fields[token]() : fields[token];
              const statement = (typeof statements[token] === "function") ? statements[token]() : statements[token];

              if (input) {
                if (input.check === "Color") (input.check = "Colour");
                if ((typeof input.check === "function") && ![String, Number, Boolean, Array, Object].includes(input.check)) (input.check = input.check());

                const valueInput = this.appendValueInput(token)

                if (input.check) {
                  if (!Array.isArray(input.check)) (input.check = [input.check]);

                  input.check = input.check.map((check) => [null, "null"].includes(check) ? "Null" : ((check === "undefined") ? "Undefined" : ([String, Number, Boolean, Array, Object].includes(check) ? check.name : check)));

                  valueInput.setCheck(input.check || null);
                } else {
                  valueInput.connection.setShadowDom(new DOMParser().parseFromString(`<shadow type="string"><field name="TEXT"></field></shadow>`, "text/xml").firstChild);
                };

                if (input.shadow) {
                  if (typeof input.shadow === "function") (input.shadow = input.shadow());

                  valueInput.connection.setShadowDom(new DOMParser().parseFromString(`<shadow type="${((typeof input.shadow.type === "function") ? input.shadow.type() : (input.shadow.type || "text")).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")}">${(typeof input.shadow.content === "function") ? input.shadow.content() : (input.shadow.content || "")}</shadow>`, "text/xml").firstChild);
                };
              } else if (field) {
                const dummy = this.appendDummyInput();

                switch (field.type) {
                  case "text":
                    dummy.appendField(new Blockly.FieldTextInput(...[
                      translate((typeof field.default === "function") ? field.default() : (field.default || "")),
                      ...(field.validator) ? [field.validator] : []
                    ]), token);
                    break;
                  case "multiline":
                    dummy.appendField(new Blockly.FieldMultilineInput(...[
                      translate((typeof field.default === "function") ? field.default() : (field.default || "")),
                      ...(field.validator) ? [field.validator] : []
                    ]), token);
                    break;
                  case "dropdown":
                    dummy.appendField(new Blockly.FieldDropdown(...[
                      Object.entries(field.options).map(([name, text]) => [translate((typeof text === "function") ? text() : text), (typeof name === "function") ? name() : name]),
                      ...(field.validator) ? [field.validator] : []
                    ]), token);
                    break;
                  case "variable":
                    dummy.appendField(new Blockly.FieldVariable(...[
                      translate((typeof field.default === "function") ? field.default() : (field.default || "")),
                      ...(field.validator) ? [field.validator] : []
                    ]), token);
                    break;
                  default:
                    dummy.appendField(translate(token));
                };
              } else if (statement) {
                const statementInput = this.appendStatementInput(token).setCheck(null);

                if (statement.label) statementInput.appendField(translate((typeof statement.label === "function") ? statement.label() : statement.label));
              } else {
                this.appendDummyInput().appendField(translate(token));
              };
            });
          };

          if (!output) {
            if ((typeof previous === "function") ? previous() : previous) this.setPreviousStatement(true, null);
            if ((typeof next === "function") ? next() : next) this.setNextStatement(true, null);
          } else {
            if (output === "Color") (output = "Colour");
            if ((typeof output === "function") && ![String, Number, Boolean, Array, Object].includes(output)) (output = output());

            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true, (output === true) ? null : (([String, Number, Boolean, Array, Object].includes(output)) ? output.name : output));
          };

          this.setColour((color != null) ? ((typeof color === "function") ? color() : color) : (((toolbox) => toolbox.contents_ || toolbox.contents.values())(Blockly.getMainWorkspace().getToolbox()).find((category) => category.toolboxItemDef_.contents?.some((block) => block.type === name))?.toolboxItemDef_?.colour || "#000000"));
          this.setInputsInline((typeof inline === "function") ? inline() : inline);
          this.setDeletable((typeof deletable === "function") ? deletable() : deletable);
          this.setTooltip(translate((typeof tooltip === "function") ? tooltip() : tooltip));
          this.setHelpUrl((typeof help === "function") ? help() : help);

          this.inputList.forEach((input) => {
            if (input.connection?.shadowDom || !Array.isArray(input.connection?.check) || input.connection.check.every((check) => !["String", "Number"].includes(check))) return;

            input.connection.setShadowDom(new DOMParser().parseFromString(`<shadow type="${((input.connection.check?.length === 1) && (input.connection.check[0] === "Number")) ? "number" : "string"}"><field name="${((input.connection.check?.length === 1) && (input.connection.check[0] === "Number")) ? "NUMBER" : "TEXT"}"></field></shadow>`, "text/xml").firstChild);
          });
        }
      };

      Object.entries({
        ...blockGenerators,
        ...(blockGeneratorFallback) ? {
          Fallback: blockGeneratorFallback
        } : {}
      }).forEach(([languageName, blockGenerator]) => {
        if (![
          ...Object.keys(languageGenerators),
          "Fallback"
        ].includes(languageName)) return;

        const languageGenerator = ({
          ...Object.fromEntries([
            Blockly.JavaScript,
            Blockly.Python,
            Blockly.Lua,
            Blockly.PHP
          ].filter(Boolean).map((codeGenerator) => [codeGenerator.name_, codeGenerator])),
          ...languageGenerators,
          ...{
            Fallback: languageGeneratorFallback
          }
        })[languageName];

        if (!languageGenerator) return;

        if (!languageGenerator.uniqueVariable) {
          languageGenerator.uniqueVariable = (variable) => {
            return languageGenerator.nameDB_.getDistinctName(
              variable,
              Blockly.VARIABLE_CATEGORY_NAME
            );
          };
        };

        if (!languageGenerator.hatStackToCode) {
          languageGenerator.hatStackToCode = (hatBlock) => {
            if (!hatBlock) return "";

            let code = "";
            let current = hatBlock.getNextBlock();

            while (current) {
              code += (languageGenerator.forBlock[current.type]) ? languageGenerator.forBlock[current.type](current, languageGenerator) : "";

              current = current.getNextBlock();
            };

            return code;
          };
        };

        languageGenerator.forBlock[name] = (block) => (((code) => {
          if (!output) return code;

          return (Array.isArray(code)) ? [
            (code[1]?.toLowerCase() !== "nugget") ? code[0] : `(() => {\n${code[0].split("\n").map((line) => "  " + line).join("\n")}\n})()`,
            languageGenerator[`ORDER_${(code[1]?.toLowerCase().replaceAll("nugget", "") || "NONE").toUpperCase()}`]
          ] : [
            code,
            languageGenerator.ORDER_NONE
          ];
        })((typeof blockGenerator === "function") ? blockGenerator(...[
          ...((values) => {
            if (!Object.keys(values).length) return [];

            return [values];
          })({
            ...block.inputList.reduce((accumulator, input) => ({
              ...accumulator,
              ...Object.fromEntries(input.fieldRow.filter((field) => field.name).map((field) => [
                field.name,
                ((value) => {
                  if (!(field instanceof Blockly.FieldVariable)) return value;

                  return languageGenerator.nameDB_.getName(value, Blockly.VARIABLE_CATEGORY_NAME);
                })(block.getFieldValue(field.name))
              ])),
              ...(input.name) ? {
                [input.name]: (({
                  [Blockly.INPUT_VALUE]: () => languageGenerator.valueToCode(block, input.name, languageGenerator.ORDER_ATOMIC),
                  [Blockly.NEXT_STATEMENT]: () => languageGenerator.statementToCode(block, input.name)
                })[input.type] || (() => null))()
              } : {}
            }), {}),
          }), languageGenerator
        ]) : blockGenerator));
      });

      return true;
    },

    get(_, name) {
      return Blockly.Blocks[name];
    }
  });

  Blocks["string"] = {
    layout: "TEXT",
    fields: {
      TEXT: {
        type: "text"
      }
    },
    output: true,

    generator: ({ TEXT = `""` }) => [
      `"${TEXT}"`,
      "atomic"
    ]
  };

  Blocks["number"] = {
    layout: "NUMBER",
    fields: {
      NUMBER: {
        type: "text",
        default: "0",
        validator: (value) => {
          if (!value) return "0";
          if (/^-?\d*\.?\d*$/.test(value)) return value;
        }
      }
    },
    output: Number,

    generator: ({ NUMBER = 0 }) => [
      NUMBER,
      "atomic"
    ]
  };

  return Blocks;
};