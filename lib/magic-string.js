const stream = require("stream")
const assert = require("assert")
const mergeSourceMaps = require("merge-source-map")
const MagicString = require("magic-string")

/**
 * @param {(magical: import('MagicString'), original: string, file: import('vinyl')) => import('MagicString')} updateString
 */
function magicString(updateString) {
  assert.strictEqual(
    typeof updateString,
    "function",
    "updateString param must be a function"
  )

  return new stream.Transform({
    objectMode: true,

    transform(file, _encoding, done) {
      if (!file.isBuffer()) {
        const error = new TypeError(`file '${file.path}' is not buffered`)
        return done(error)
      }

      const original = file.contents.toString("utf8")
      let magical = new MagicString(original)
      magical = updateString(magical, original, file)

      if (file.sourceMap) {
        const magicalMap = magical.generateMap({
          file: file.basename,
          source: file.sourceMap.sources[0],
          hires: true,
        })
        file.sourceMap = mergeSourceMaps(file.sourceMap, magicalMap)
      }

      file.contents = Buffer.from(magical.toString())

      done(null, file)
    },
  })
}

module.exports = { magicString }
