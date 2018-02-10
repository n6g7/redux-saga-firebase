describe('assert(condition, message)', () => {
  const message = 'heeeeey'
  let assert

  describe('in dev', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'dev'
      assert = require('./assert').default
    })

    it('throws an error when the condition is false', () => {
      expect(() => assert(false, message)).toThrowError((message))
    })

    it('does not throw an error when the condition is true', () => {
      expect(() => assert(true, message)).not.toThrowError((message))
    })
  })

  describe('in prod', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production'
      assert = require('./assert').default
    })

    it('does not throw an error when the condition is false', () => {
      expect(() => assert(false, message)).not.toThrowError((message))
    })

    it('does not throw an error when the condition is true', () => {
      expect(() => assert(true, message)).not.toThrowError((message))
    })
  })
})
