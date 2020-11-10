// eslint-disable-next-line no-unused-vars
/* global traceLocation: true */

function trace(err) {
  const positions = /at .+?:(\d+):(\d+)\n/
  const [, line, column] = positions.exec(err.stack)
  return { line: +line, column: +column }
}

// Using the error technique from [0]:
//
// - throw an error in the compiled source
// - get the compiled line and col from the stack trace
// - make sure it matches up with the original line and column
//
// [0] https://fitzgeraldnick.com/2013/08/02/testing-source-maps.html
traceLocation = trace(new Error("Where am I?"))
