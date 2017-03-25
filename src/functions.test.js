import { call } from 'redux-saga/effects'

import functionsModule, { getFunctionURL } from './functions'

describe('functions', () => {
  const projectId = 'qdkqlsmd'
  const region = 'lqkdsmlqk'
  let context

  beforeEach(() => {
    context = {
      projectId: jest.fn(() => projectId),
      region
    }
  })

  describe('call(functionName, parameters={})', () => {
    it('works with text', () => {
      const functionName = 'qsdsqldlq'
      const contentType = 'qlmdkd'
      const response = {
        headers: {
          get: jest.fn(() => contentType)
        },
        ok: true,
        text: jest.fn()
      }
      const data = 'qlkdmsq'
      const iterator = functionsModule.call.call(context, functionName)

      expect(iterator.next().value)
      .toEqual(call(
        fetch,
        `https://${region}-${projectId}.cloudfunctions.net/${functionName}`
      ))

      expect(context.projectId.mock.calls.length).toBe(1)

      expect(iterator.next(response).value)
      .toEqual(call([response, response.text]))

      expect(response.headers.get.mock.calls.length).toBe(1)
      expect(response.headers.get.mock.calls[0]).toEqual([
        'Content-Type'
      ])

      expect(iterator.next(data)).toEqual({
        done: true,
        value: data
      })
    })

    it('works with json', () => {
      const functionName = 'qsdsqldlq'
      const contentType = 'application/json'
      const response = {
        headers: {
          get: jest.fn(() => contentType)
        },
        ok: true,
        json: jest.fn()
      }
      const data = 'qlkdmsq'
      const iterator = functionsModule.call.call(context, functionName)

      expect(iterator.next().value)
      .toEqual(call(
        fetch,
        `https://${region}-${projectId}.cloudfunctions.net/${functionName}`
      ))

      expect(context.projectId.mock.calls.length).toBe(1)

      expect(iterator.next(response).value)
      .toEqual(call([response, response.json]))

      expect(response.headers.get.mock.calls.length).toBe(1)
      expect(response.headers.get.mock.calls[0]).toEqual([
        'Content-Type'
      ])

      expect(iterator.next(data)).toEqual({
        done: true,
        value: data
      })
    })

    it('throws when it fails', () => {
      const functionName = 'qsdsqldlq'
      const response = {
        ok: false
      }

      try {
        const iterator = functionsModule.call.call(context, functionName)

        expect(iterator.next().value)
        .toEqual(call(
          fetch,
          `https://${region}-${projectId}.cloudfunctions.net/${functionName}`
        ))

        expect(context.projectId.mock.calls.length).toBe(1)

        expect(iterator.next(response).value)
        .toEqual(response)

        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBe(response)
      }
    })
  })

  describe('getFunctionURL(functionName, parameters)', () => {
    it('generates correct URLs - without parameters', () => {
      const functionName = 'qsdsqldlq'
      const result = getFunctionURL.call(context, functionName)

      expect(result)
      .toBe(`https://${region}-${projectId}.cloudfunctions.net/${functionName}`)
    })

    it('generates correct URLs - with parameters', () => {
      const functionName = 'qsdsqldlq'
      const parameters = {
        a: 'qpdkq',
        b: 'qdlmlqdms'
      }
      const result = getFunctionURL.call(context, functionName, parameters)

      expect(result)
      .toBe(`https://${region}-${projectId}.cloudfunctions.net/${functionName}?a=${parameters.a}&b=${parameters.b}`)
    })
  })
})
