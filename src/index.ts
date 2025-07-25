import { Plugin, Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import z, { ZodType } from "zod";
import "./types";
import { HapiZodOptions} from "./types";
import { swaggerPlugin } from "./swaggerplugin";
import { normalizeBooleans } from "./utils";

const ZodValidatorPlugin = (options: HapiZodOptions = {}): Plugin<null> => {
  const { boomError = true, parse = { payload: true, query: true, params: true, headers: true, state: true } } = options || {};
  const supportedProps = ['payload', 'query', 'params', 'headers', 'state'] as const;
  return {
    name: "ZodValidatorPlugin",
    register(server) {
      server.ext("onPreHandler", async (request: Request, h: ResponseToolkit) => {
        const routeValidation = request.route.settings.plugins.zod as {
          payload?: ZodType<any, any>;
          query?: ZodType<any, any>;
          params?: ZodType<any, any>;
          headers?: ZodType<any, any>;
          state?: ZodType<any, any>;
        };

        try {

          // Adding loop so that in future adding in array will be enough
          for (const prop of supportedProps) {
            if (routeValidation?.[prop] && parse[prop]) {
              if(prop === 'query'){;
                const parsedProp = routeValidation[prop].parse(normalizeBooleans(request[prop]));
                Object.assign(request, { [prop]: parsedProp });
              }
              else{
                const parsedProp = routeValidation[prop].parse(request[prop]);
                Object.assign(request, { [prop]: parsedProp });
              }
            }
          }

          return h.continue;
        } catch (err) {
          const error = options.formatError ? options.formatError(err) : z.prettifyError(err);
          if(boomError) {
            if(options.logger) {
              options.logger(error);
            }
            else{
              console.error(error);
            }
            return Boom.badRequest(error);
          }
          throw new Error(error);
        }
      });
    },
  };
};

export default ZodValidatorPlugin;
export { HapiZodOptions };
export type ZodValidatorPlugin = typeof ZodValidatorPlugin;
export { swaggerPlugin } from "./swaggerplugin";
export { ZodDocsOptions } from "./swaggerplugin";
export type SwaggerPlugin = typeof swaggerPlugin;