const { magicString } = require("./magic-string")

function addHeader(headerTextOrFn) {
  const header =
    typeof headerTextOrFn === "string" ? () => headerTextOrFn : headerTextOrFn

  return magicString((magic, _original, file) => {
    return magic.prepend("" + header(file) + "\n")
  })
}

module.exports = { addHeader }
