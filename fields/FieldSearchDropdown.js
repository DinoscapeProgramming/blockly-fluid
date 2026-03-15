module.exports = (Blockly) => (
  class FieldSearchDropdown extends Blockly.FieldDropdown {
    constructor() {
      super(...arguments);
    };

    showEditor_() {
      super.showEditor_();

      const menu = Blockly.DropDownDiv.getContentDiv().querySelector(".blocklyDropdownMenu");

      const search = document.createElement("input");

      search.spellcheck = false;

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

      requestAnimationFrame(() => {
        menu.querySelector(".blocklyMenuItemSelected").scrollIntoView({ block: "nearest" });

        requestAnimationFrame(() => {
          search.focus();
        });
      });

      const items = Array.from(menu.querySelectorAll(".blocklyMenuItem"));
      const separators = Array.from(menu.querySelectorAll(".blocklyMenuSeparator"));

      search.addEventListener("input", () => {
        menu.scrollTop = 0;

        const value = search.value.toLowerCase();

        items.forEach((item) => {
          const text = item.textContent.toLowerCase();

          item.style.display = text.includes(value) ? "" : "none";
        });

        separators.forEach((separator) => {
          let previousElement = separator.previousElementSibling;
          let nextElement = separator.nextElementSibling;

          while (previousElement && (previousElement.style.display === "none")) {
            previousElement = previousElement.previousElementSibling;
          };

          while (nextElement && (nextElement.style.display === "none")) {
            nextElement = nextElement.nextElementSibling;
          };

          separator.style.display = (
            previousElement?.classList.contains("blocklyMenuItem") &&
            nextElement?.classList.contains("blocklyMenuItem")
          ) ? "" : "none";
        });
      });

      search.addEventListener("keydown", (event) => {
        event.stopImmediatePropagation();
      });

      search.focus();
    };
  }
);