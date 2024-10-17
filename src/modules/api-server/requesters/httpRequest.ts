import { logResponse } from './log-response';
import { Timer } from './timer';
import {
  ApplicationError,
  externalHttpUrls,
  HttpEndpoints,
  HttpRequester,
  ServerErrorMessage,
} from './types';

export function createHttpRequester<T extends HttpEndpoints>(
  baseUrlKey: T,
  //@TODO: add token
): HttpRequester<T> {
  return async function request(url: `/${string}`, init?: RequestInit) {
    const baseUrl = externalHttpUrls[baseUrlKey];
    const actualUrl = `${baseUrl}${url}`;

    try {
      const timer = new Timer();
      const data = await fetch(actualUrl, {
        ...init,
        headers: {
          ...init?.headers,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      logResponse({
        message: 'http call',
        method: init?.method,
        url: data.url,
        statusCode: data.status,
        responseHeaders: data.headers,
        duration: timer.getElapsedMs(),
      });

      if (!data.ok) {
        throw await errorFromResponse(data);
      }

      return data;
    } catch (e) {
      if (e instanceof ApplicationError) {
        throw e;
      } else {
        throw new ApplicationError(mapServerToMessage(e), 500);
      }
    }
  };

  type InternalServerError = {
    error: string;
  };
  type MessagedServerError = {
    message: string;
  };
  type InternalServerErrorWithUpstream = InternalServerError & {
    upstreamError: string;
  };

  type InternalUpstreamServerError = {
    errorCode: 602;
    shortNorwegian: string;
    shortEnglish: string;
  };

  async function errorFromResponse(result: Response) {
    if (result.headers.get('content-type')?.includes('application/json')) {
      const data = await result.json();
      return new ApplicationError(
        mapServerToMessage(data),
        result.status,
        undefined,
        result,
      );
    } else if (result.headers.get('content-type')?.includes('text/html')) {
      return new ApplicationError(
        mapServerToMessage(result.statusText),
        result.status,
        undefined,
        result,
      );
    } else {
      const data = await result.text();
      if (result.status === 401) {
        return new ApplicationError(
          {
            message: 'Du har ikke tilgang. Prøv å logge inn på nytt.',
          },
          result.status,
          undefined,
          result,
        );
      }
      return new ApplicationError(
        mapServerToMessage(data),
        result.status,
        undefined,
        result,
      );
    }
  }

  function mapServerToMessage(e: any): ServerErrorMessage {
    if (typeof e === 'string') {
      return { message: e };
    }
    if (!isInternalServerError(e)) {
      return { message: 'Ukjent feil med tjenesten.' };
    }
    if (isMessagedError(e)) {
      return { message: e.message };
    }

    const defaultError = { message: e.error };
    if (!isInternalServerErrorWithUpstream(e)) {
      return defaultError;
    }

    try {
      const upstreamError = JSON.parse(e.upstreamError);
      if (!isInternalUpstreamServerError(upstreamError)) {
        return defaultError;
      }

      return {
        message: upstreamError.shortNorwegian,
      };
    } catch {
      return defaultError;
    }
  }

  function isMessagedError(e: any): e is MessagedServerError {
    return 'message' in e;
  }

  function isInternalServerError(e: any): e is InternalServerError {
    return 'error' in e;
  }

  function isInternalServerErrorWithUpstream(
    e: any,
  ): e is InternalServerErrorWithUpstream {
    return 'upstreamError' in e;
  }
  function isInternalUpstreamServerError(
    e: any,
  ): e is InternalUpstreamServerError {
    return 'errorCode' in e && 'shortNorwegian' in e;
  }
}
