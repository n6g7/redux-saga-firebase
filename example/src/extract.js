const extractLines = doc => {
  const lines = doc.split('\n')

  return (start, end) => lines.slice(start - 1, end).join('\n')
}

export default extractLines
