const isDev = () => process.env.NODE_ENV !== 'production'

function assert(condition, message) {
  if (isDev() && !condition) throw Error(message)
}

export default assert
