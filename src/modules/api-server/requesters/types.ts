import { IncomingHttpHeaders } from 'http';
import { NextApiResponse } from 'next';

export const externalHttpUrls = {
  'http-kontraktsportal-api': process.env.KONTRAKTSPORTAL_API_URL,
} as const;

export type HttpEndpoints = keyof typeof externalHttpUrls;
export type ReqWithHeaders = {
  headers: IncomingHttpHeaders;
};
export type HttpRequester<T extends HttpEndpoints> = (
  url: `/${string}`,
  init?: RequestInit | undefined,
) => Promise<Response>;

export type ConditionalRequester<U extends HttpEndpoints> = HttpRequester<U>;

export type ServerErrorMessage = {
  message: string;
};

export class ApplicationError extends Error {
  data: ServerErrorMessage;
  status: number;
  correlationId?: string;
  upstreamResponse?: Response | NextApiResponse<any>;

  constructor(
    error: ServerErrorMessage,
    status: number = 500,
    correlationId?: string,
    upstreamResponse?: Response | NextApiResponse<any>,
  ) {
    super();
    this.data = error;
    this.status = status;
    this.correlationId = correlationId;
    this.upstreamResponse = upstreamResponse;
  }
}
