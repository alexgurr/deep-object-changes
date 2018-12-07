import getDeepObjectChanges from './';

describe('common/utils/getDeepObjectChanges', () => {
  test('should return empty object for two of the same object', () => {
    const MOCK_PAYLOAD = {
      foo: 'bar',
      bar: 'foo',
      foobar: { foo: 'bar' }
    };

    expect(getDeepObjectChanges(MOCK_PAYLOAD, MOCK_PAYLOAD)).toEqual({});
  });

  test('should handle basic changes', () => {
    const MOCK_PAYLOAD = {
      foo: 'bar',
      bar: 'foo',
      foobar: { foo: 'bar' }
    };

    const CHANGES = {
      foo: 'bar',
      bar: 'foobar',
      foobar: { foo: 'bar' }
    };

    expect(getDeepObjectChanges(MOCK_PAYLOAD, CHANGES)).toEqual({ bar: 'foobar' });
  });

  test('should handle object changes', () => {
    const MOCK_PAYLOAD = {
      foo: 'bar',
      bar: 'foo'
    };

    const CHANGES = {
      foo: 'bar',
      bar: 'foobar',
      foobar: { foo: 'bar' }
    };

    expect(getDeepObjectChanges(MOCK_PAYLOAD, CHANGES)).toEqual({
      bar: 'foobar',
      foobar: { foo: 'bar' }
    });
  });

  test('should handle nested objects', () => {
    const MOCK_PAYLOAD = {
      foo: 'bar',
      bar: 'foo',
      foobar: {
        a: 1,
        foo: 'bar',
        bar: {
          b: 2,
          foo: 'bar'
        }
      }
    };

    const CHANGES = {
      foo: 'bar',
      bar: 'foo',
      foobar: {
        a: 1,
        foo: 'bar',
        bar: {
          b: 2,
          foo: 'abc'
        }
      }
    };

    expect(getDeepObjectChanges(MOCK_PAYLOAD, CHANGES)).toEqual({
      foobar: {
        bar: {
          foo: 'abc'
        }
      }
    });
  });
});

