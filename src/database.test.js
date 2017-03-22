import { call } from 'redux-saga/effects';

import dbModule from './database';

describe('database', () => {
  let ref, database, context;

  beforeEach(() => {
    ref = {
      on: jest.fn(),
      once: jest.fn(),
      push: jest.fn(),
      remove: jest.fn(),
      set: jest.fn(),
      update: jest.fn(),
    };
    database = {
      ref: jest.fn(() => ref),
    };
    context = {
      app: {
        database: jest.fn(() => database)
      }
    };
  });

  describe('get(path)', () => {
    it('works', () => {
      const path = 'skddksl';
      const val = 'jqdqkld';
      const result = {
        val: jest.fn(() => val),
      }
      const iterator = dbModule.get.call(context, path);

      expect(iterator.next().value)
      .toEqual(call([ref, ref.once], 'value'));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(result)).toEqual({
        done: true,
        value: val
      });

      expect(result.val.mock.calls.length).toBe(1);
      expect(result.val.mock.calls[0]).toEqual([]);
    });
  });

  describe('create(path, data)', () => {
    it('works', () => {
      const path = 'skddksl';
      const data = 'okqdkj';
      const result = 'jqkdsqls';
      const iterator = dbModule.create.call(context, path, data);

      expect(iterator.next().value)
      .toEqual(call([ref, ref.push], data));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result
      });
    });
  });

  describe('update(path, data)', () => {
    it('works', () => {
      const path = 'skddksl';
      const data = 'okqdkj';
      const result = 'jqkdsqls';
      const iterator = dbModule.update.call(context, path, data);

      expect(iterator.next().value)
      .toEqual(call([ref, ref.set], data));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result
      });
    });
  });

  describe('patch(path, data)', () => {
    it('works', () => {
      const path = 'skddksl';
      const data = 'okqdkj';
      const result = 'jqkdsqls';
      const iterator = dbModule.patch.call(context, path, data);

      expect(iterator.next().value)
      .toEqual(call([ref, ref.update], data));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result
      });
    });
  });

  describe('delete(path)', () => {
    it('works', () => {
      const path = 'skddksl';
      const result = 'jqkdsqls';
      const iterator = dbModule.delete.call(context, path);

      expect(iterator.next().value)
      .toEqual(call([ref, ref.remove]));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result
      });
    });
  });

  describe('channel(path, event)', () => {
    it('works', () => {
      const path = 'skddksl';
      const event = 'okqdkj';
      dbModule.channel.call(context, path, event);

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(ref.on.mock.calls.length).toBe(1);
      expect(ref.on.mock.calls[0][0]).toBe(event);
    });
  });
});
