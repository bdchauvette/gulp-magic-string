const { addFooter } = require("..")
const { fibonacci } = require("./fixtures")
const { transform } = require("./helpers")

describe("string footer", () => {
  it("adds the provided string to the end of the file contents", async () => {
    const file = fibonacci.toVinyl()
    const transformedFile = await transform(file, addFooter("👣👣👣"))
    expect(transformedFile.contents.toString()).toMatchSnapshot()
  })
})

describe("function footer", () => {
  it("passes the file to the function", async () => {
    const file = fibonacci.toVinyl()
    const footer = jest.fn()
    await transform(file, addFooter(footer))
    expect(footer).toHaveBeenCalledTimes(1)
    expect(footer).toHaveBeenLastCalledWith(file)
  })

  it("adds the generated footer to the end of the file contents", async () => {
    const file = fibonacci.toVinyl()
    const footer = (f) => `👣👣👣 - ${f.basename}`
    const transformedFile = await transform(file, addFooter(footer))
    expect(transformedFile.contents.toString()).toMatchSnapshot()
  })
})
