import ReduxSagaFirebase from './index'

describe('ReduxSagaFirebase', () => {
  describe('constructor(firebaseApp)', () => {
    const app = 'kqdlqkd'
    let rsf

    beforeEach(() => {
      rsf = new ReduxSagaFirebase(app)
    })

    it('takes a firebase app as argument', () => {
      expect(rsf.app).toBe(app)
    })

    it('defines authentication methods', () => {
      expect(rsf.login).toBeInstanceOf(Function)
      expect(rsf.logout).toBeInstanceOf(Function)
      expect(rsf.authChannel).toBeInstanceOf(Function)
    })

    it('defines database methods', () => {
      expect(rsf.get).toBeInstanceOf(Function)
      expect(rsf.create).toBeInstanceOf(Function)
      expect(rsf.update).toBeInstanceOf(Function)
      expect(rsf.patch).toBeInstanceOf(Function)
      expect(rsf.delete).toBeInstanceOf(Function)
      expect(rsf.channel).toBeInstanceOf(Function)
    })
  })
})
