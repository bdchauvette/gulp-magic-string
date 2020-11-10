const { addHeader } = require("..")
const { fibonacci } = require("./fixtures")
const { transform } = require("./helpers")

describe("string header", () => {
  it("adds the provided string to the end of the file contents", async () => {
    const file = fibonacci.toVinyl()
    const transformedFile = await transform(file, addHeader("🗣🗣🗣"))
    expect(transformedFile.contents.toString()).toMatchSnapshot()
  })
})

describe("function header", () => {
  it("passes the file to the function", async () => {
    const file = fibonacci.toVinyl()
    const header = jest.fn()
    await transform(file, addHeader(header))
    expect(header).toHaveBeenCalledTimes(1)
    expect(header).toHaveBeenLastCalledWith(file)
  })

  it("adds the generated header to the end of the file contents", async () => {
    const file = fibonacci.toVinyl()
    const header = (f) => `🗣🗣🗣 - ${f.basename}`
    const transformedFile = await transform(file, addHeader(header))
    expect(transformedFile.contents.toString()).toMatchSnapshot()
  })
})
