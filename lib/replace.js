const { magicString } = require("./magic-string")
const escape = require("escape-string-regexp")

/**
 * @param {string | RegExp} pattern
 * @param {string | (substring: string) => string}
 */
function replace(pattern, replacementTextOrFn) {
  if (typeof pattern === "string") {
    pattern = new RegExp(escape(pattern), "g")
  }

  const replacement =
    typeof replacementTextOrFn === "string"
      ? () => replacementTextOrFn
      : replacementTextOrFn

  return magicString((magical, original, file) => {
    let match
    while ((match = pattern.exec(original))) {
      const start = match.index
      const end = start + match[0].length
      magical.overwrite(start, end, replacement(match[0], file))
    }
    return magical
  })
}

module.exports = { replace }
