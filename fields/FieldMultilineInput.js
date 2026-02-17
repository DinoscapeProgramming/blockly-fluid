module.exports = (Blockly) => {
  class FieldMultilineInput extends Blockly.Field {
    constructor(text) {
      super(text);
      this.multiline = true;
    };

    static fromJson(options) {
      return new FieldMultilineInput(options["text"]);
    };

    showEditor_() {
      const div = Blockly.DropDownDiv.getContentDiv();

      Blockly.utils.dom.clear(div);

      const textarea = document.createElement("textarea");

      textarea.value = this.getValue();
      textarea.rows = 5;
      textarea.style.resize = "both";

      div.appendChild(textarea);

      textarea.focus();

      textarea.addEventListener("input", () => {
        this.setValue(textarea.value);
      });

      Blockly.DropDownDiv.showPositionedByField(this, this.sourceBlock_);
    };
  };

  Blockly.fieldRegistry.register("field_multiline_input", FieldMultilineInput);
};