module.exports = (text) => {
  const lines = text.split("\n");

  const firstLine = lines.find((line) => line.trim().length > 0);

  if (!firstLine) return text;

  const indentMatch = firstLine.match(/^[ \t]*/);
  const indentSize = (indentMatch) ? indentMatch[0].length : 0;

  if (indentSize === 0) return text;

  return (
    lines
      .map((line) => (
        (line.startsWith(" ".repeat(indentSize)))
          ? line.slice(indentSize)
          : line
      ))
      .join("\n")
      .replace(/^\n/, "")
      .replace(/\n\s*$/, "")
  );
};