// create a chain of middleware functions
// first middleware function should return  response


export function chain(
  functions,
  index = 0
) {
  const current = functions[index]

  if (current) {
    const next = chain(functions, index + 1)
    return current(next)
  }

  return (
    request,
    event,
    response
  ) => {
    return response
  }
}
