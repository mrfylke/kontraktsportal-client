import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultLocale } from '../config';

describe('i18n', () => {
  it('should return default locale if cookie is not set', async () => {
    vi.doMock('next/headers', () => ({
      cookies: vi.fn().mockReturnValue({
        get: vi.fn().mockReturnValue(undefined),
      }),
    }));
    const { getUserLocale } = await import('../locale');
    expect(await getUserLocale()).toBe(defaultLocale);
  });

  it('should return locale from cookie', async () => {
    vi.doMock('next/headers', () => ({
      cookies: vi.fn().mockReturnValue({
        get: vi.fn().mockReturnValue({ value: 'en' }),
      }),
    }));
    const { getUserLocale } = await import('../locale');
    expect(await getUserLocale()).toBe('en');
  });

  it('should set the locale in the cookies', async () => {
    const setMock = vi.fn();
    vi.doMock('next/headers', () => ({
      cookies: vi.fn().mockReturnValue({
        set: setMock,
      }),
    }));

    const { setUserLocale } = await import('../locale');
    await setUserLocale('no');
    expect(setMock).toHaveBeenCalledWith('locale', 'no');
  });

  afterEach(() => {
    vi.resetModules(); // Reset module state to avoid mock leakage
  });
});
