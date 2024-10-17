import { logger } from '../logger';

type LogResponseParams = {
  message: string;
  duration: number;
  responseHeaders?: any;
  url?: string;
  statusCode?: number;
  method?: string;
};

export const logResponse = ({
  message,
  duration,
  responseHeaders,
  url,
  statusCode,
  method,
}: LogResponseParams) => {
  let severity = 'INFO';
  if (statusCode && statusCode >= 400) {
    severity = 'ERROR';
  }

  const time = responseHeaders
    ? new Date(responseHeaders?.get('date')).toISOString()
    : new Date().toISOString();

  const log = {
    severity: severity,
    time: time,
    message: message,
    method: method,
    url: url,
    code: statusCode,
    duration: `${duration}ms`,
  };

  if (severity == 'INFO') {
    logger.info(log);
  } else {
    logger.error(log);
  }
};
