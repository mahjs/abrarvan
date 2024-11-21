const createMessageFromError = (error: { errors: { [key in string]: string[] } }) => {
  const keys = Object.keys(error.errors)

  return `${keys[0]}: ${error.errors[keys[0]].join()}`
}

export default createMessageFromError
