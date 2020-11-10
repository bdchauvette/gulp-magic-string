const fs = require("fs")
const path = require("path")
const File = require("vinyl")

class Fixture {
  constructor(filepath) {
    this.filepath = path.join("test/fixtures", filepath)
    this.contents = fs.readFileSync(path.resolve(__dirname, filepath))
  }

  toVinyl() {
    return new File({
      path: this.filepath,
      contents: Buffer.from(this.contents),
    })
  }
}

const fibonacci = new Fixture("./fibonacci.js")

const tracer = new Fixture("./tracer.js")

module.exports = { fibonacci, tracer }
