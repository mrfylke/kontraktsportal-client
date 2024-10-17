import { createHttpRequester } from './requesters/httpRequest';
import { ConditionalRequester, HttpEndpoints } from './requesters/types';

export type ExternalClient<U extends HttpEndpoints, T> = T & {
  client: ConditionalRequester<U>;
};

export type ExternalClientFactory<
  U extends HttpEndpoints,
  T,
> = () => ExternalClient<U, T>;

export function createClient<U extends HttpEndpoints, T>(
  baseUrlType: U,
  apiFn: (request: ConditionalRequester<U>) => T,
): ExternalClient<U, T> {
  const client = createHttpRequester(baseUrlType);

  return {
    ...apiFn(client as ConditionalRequester<U>),
    client: client as ConditionalRequester<U>,
  };
}
