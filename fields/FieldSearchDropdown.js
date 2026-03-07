module.exports = (Blockly) => (
  class FieldSearchDropdown extends Blockly.FieldDropdown {
    constructor() {
      super(...arguments);
    };

    showEditor_() {
      super.showEditor_();

      const menu = Blockly.DropDownDiv.getContentDiv().querySelector(".blocklyDropdownMenu");

      const search = document.createElement("input");

      Object.assign(search.style, {
        color: "#575E75",
        width: "calc(100% - 10px)",
        height: "27.5px",
        margin: "6.25px 5px 7.5px",
        paddingLeft: "7.5px",
        border: "none",
        outline: "none",
        borderRadius: "3.75px",
        boxSizing: "border-box",
        font: `bold 10pt "Helvetica Neue", "Segoe UI", Helvetica, sans-serif`
      });

      menu.prepend(search);

      const items = Array.from(menu.querySelectorAll(".blocklyMenuItem"));

      search.addEventListener("input", () => {
        const value = search.value.toLowerCase();

        items.forEach((item) => {
          const text = item.textContent.toLowerCase();

          item.style.display = text.includes(value) ? "" : "none";
        });
      });

      search.addEventListener("keydown", (event) => {
        event.stopImmediatePropagation();
      });

      search.focus();
    };
  }
);