const { replace } = require("..")
const { fibonacci } = require("./fixtures")
const { transform } = require("./helpers")

describe("string pattern", () => {
  describe("string replacement", () => {
    it("replaces matching substrings with the provided value", async () => {
      const file = fibonacci.toVinyl()
      const transformedFile = await transform(file, replace("fibonacci", "fib"))
      expect(transformedFile.contents.toString()).toMatchSnapshot()
    })
  })

  describe("function replacement", () => {
    it("calls the function with (substring, file)", async () => {
      const file = fibonacci.toVinyl()
      const replacement = jest.fn().mockReturnValue("fib")
      await transform(file, replace("fibonacci", replacement))
      expect(replacement).toHaveBeenLastCalledWith("fibonacci", file)
    })

    it("replaces matching substrings with the return value of the provided function", async () => {
      const file = fibonacci.toVinyl()
      const replacement = (substr) => substr.toUpperCase()
      const transformedFile = await transform(
        file,
        replace("fibonacci", replacement)
      )
      expect(transformedFile.contents.toString()).toMatchSnapshot()
    })
  })
})

describe("RegExp pattern", () => {
  describe("string replacement", () => {
    it("replaces matching substrings with the provided value", async () => {
      const file = fibonacci.toVinyl()
      const transformedFile = await transform(
        file,
        replace(/fibonacci/g, "fib")
      )
      expect(transformedFile.contents.toString()).toMatchSnapshot()
    })
  })

  describe("function replacement", () => {
    it("calls the function with (substring, file)", async () => {
      const file = fibonacci.toVinyl()
      const replacement = jest.fn().mockReturnValue("fib")
      await transform(file, replace(/fibonacci/g, replacement))
      expect(replacement).toHaveBeenLastCalledWith("fibonacci", file)
    })

    it("replaces matching substrings with the return value of the provided function", async () => {
      const file = fibonacci.toVinyl()
      const replacement = (substr) => substr.toUpperCase()
      const transformedFile = await transform(
        file,
        replace(/fibonacci/g, replacement)
      )
      expect(transformedFile.contents.toString()).toMatchSnapshot()
    })
  })
})
