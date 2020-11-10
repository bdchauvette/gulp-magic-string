const { once } = require("events")

/**
 * @param {import('vinyl')} file
 * @param {import('stream').Transform} stream
 * @returns {Promise<import('vinyl')>}
 */
async function transform(file, stream) {
  const firstChunk = once(stream, "data")

  stream.write(file)
  stream.end()

  const [transformedFile] = await firstChunk
  return transformedFile
}

module.exports = { transform }
