const { magicString } = require("./magic-string")

function addFooter(footerTextOrFn) {
  const footer =
    typeof footerTextOrFn === "string" ? () => footerTextOrFn : footerTextOrFn

  return magicString((magic, _original, file) => {
    return magic.append("\n" + footer(file))
  })
}

module.exports = { addFooter }
