import { ZodType } from 'zod/v4';
type ZodSchema = ZodType<any, any> | undefined | null;

declare module '@hapi/hapi' {
    interface PluginSpecificConfiguration {
        zod?: {
          payload?: ZodSchema;
          query?: ZodSchema;
          params?: ZodSchema;
          headers?: ZodSchema;
          state?: ZodSchema;
        };
    }
}


export interface HapiZodOptions {
  formatError?: (error: any, payload?: any) => string;
  boomError?: boolean;
  parse?: {
    payload?: boolean;
    query?: boolean;
    params?: boolean;
    headers?: boolean;
    state?: boolean;
  };

  logger ?: (error: any, payload?: any, parameterType?: 'payload' | 'query' | 'params' | 'headers' | 'state') => void
}