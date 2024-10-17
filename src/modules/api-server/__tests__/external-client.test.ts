import { describe } from 'node:test';
import { afterAll, assertType, beforeEach, expect, it, Mock, vi } from 'vitest';
import { createClient } from '../external-client';

const initialFetch = global.fetch;
let mockFetch: Mock;

beforeEach(() => {
  mockFetch = vi.fn();
  global.fetch = mockFetch;
});

afterAll(() => {
  global.fetch = initialFetch;
});

describe('external client', () => {
  it('should pass request with correct base url', () => {
    const client = createClient('http-kontraktsportal-api', function (request) {
      return {
        api: async () => {
          try {
            await request('/foo');
          } catch {}
        },
      };
    });

    client.api();

    expect(mockFetch).toHaveBeenCalledWith(
      process.env.KONTRAKTSPORTAL_API_URL + '/foo',
      expect.anything(),
    );
  });

  it('should return properly created API', () => {
    const mock = vi.fn();
    const client = createClient('http-kontraktsportal-api', function () {
      return {
        api: mock,
      };
    });

    client.api();
    expect(mock).toBeCalled();
  });

  it('give type inference through apis', () => {
    const client = createClient('http-kontraktsportal-api', function () {
      return {
        api(n: number) {
          return n * 42;
        },
      };
    });

    assertType<number>(client.api(1));

    // @ts-expect-error answer is not a string
    assertType<string>(client.api(1));
  });

  it('should pass in headers as sent in by request', async () => {
    const client = createClient('http-kontraktsportal-api', function (request) {
      return {
        api: async () => {
          try {
            await request('/foo', {
              headers: {
                'Custom-Header': 'foo',
              },
            });
          } catch {}
        },
      };
    });

    client.api();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Custom-Header': 'foo',
        }),
      }),
    );
  });
});
