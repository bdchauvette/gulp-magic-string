const esbuild = require("esbuild")
const vm = require("vm")
const { SourceMapConsumer } = require("source-map")
const { magicString } = require("..")
const { fibonacci, tracer } = require("./fixtures")
const { transform } = require("./helpers")

it("errors on non-buffer files", async () => {
  const file = { path: "mock-file", isBuffer: () => false }
  await expect(
    transform(file, magicString(jest.fn()))
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"file 'mock-file' is not buffered"`
  )
})

describe("source maps", () => {
  it("does not apply a source map if the input file does not have source maps enabled", async () => {
    const file = fibonacci.toVinyl()
    const transformedFile = await transform(
      file,
      magicString((magical) => magical.prepend("beep boop"))
    )
    expect(transformedFile).not.toHaveProperty("sourceMap")
  })

  it("applies the source map if the input file has source maps enabled", async () => {
    const file = tracer.toVinyl()

    const { code, map } = await esbuild.transform(file.contents.toString(), {
      format: "iife",
      minify: true,
      sourcefile: file.basename,
      sourcemap: "external",
    })

    file.sourceMap = { ...JSON.parse(map), file: file.basename }
    file.contents = Buffer.from(code)

    const transformedFile = await transform(
      file,
      magicString((magical) => magical.prepend("/* ✨✨✨ */"))
    )

    expect(transformedFile).toHaveProperty("sourceMap")

    const sandbox = { traceLocation: {} }
    vm.runInNewContext(file.contents.toString(), sandbox)

    const smc = await new SourceMapConsumer(file.sourceMap)
    const originalContents = smc.originalPositionFor(sandbox.traceLocation)

    expect(originalContents).toMatchObject({
      source: "tracer.js",
      line: 17,
      column: 22,
    })
  })
})
