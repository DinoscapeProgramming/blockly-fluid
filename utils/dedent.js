module.exports = (strings, ...values) => {
  let text = String.raw({ raw: strings }, ...values);

  text = text.replace(/^\n/, "").replace(/\n$/, "");

  const indent = text.match(/^[ \t]*(?=\S)/gm);

  if (indent) {
    const minimumIndent = Math.min(...indent.map(i => i.length));

    text = text.replace(new RegExp(`^[ \\t]{${minimumIndent}}`, "gm"), "");
  };

  return text;
};