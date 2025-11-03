import { Plugin } from '@hapi/hapi';
import { z, ZodObject } from 'zod/v4';
import { OpenAPIObject, SecuritySchemeObject } from 'openapi3-ts/oas30';
import type { RequestBodyObject, SchemaObject } from 'openapi3-ts/oas30';
export interface ZodDocsOptions {
  openapiSpec?: Partial<OpenAPIObject>;
  securitySchemes?: { [name: string]: SecuritySchemeObject };
  docsPath?: string;
  jsonPath?: string;
  enableSwaggerUI?: boolean;
  defaultResponseSchema?: z.ZodTypeAny;
  includedTags?: string[];
}

/**
 * Hapi plugin to serve OpenAPI JSON and Swagger UI from Zod schemas
 */
export const swaggerPlugin = (options: ZodDocsOptions = {}): Plugin<{}> => {
  const {
    docsPath = '/ops/docs',
    jsonPath = '/ops/openapi.json',
    enableSwaggerUI = true,
    openapiSpec = {
      openapi: '3.0.0',
      info: {
        title: 'Ops API Docs',
        version: '1.0.0',
        description: '',
      },
    },
    securitySchemes = {},
    defaultResponseSchema = z.object({
      success: z.boolean(),
    }),
  } = options;

  return {
    name: 'ZodDocsPlugin',
    version: '1.0.0',
    register: async (server) => {
      const paths: OpenAPIObject['paths'] = {};

      let routes = server.table();
      if (includedTags.length) {
        // Only document routes tagged with one of includedTags[]
        routes = routes.filter(route => route.settings.tags?.some(tag => includedTags.includes(tag)))
      }

      for (const route of server.table()) {
        const zodConfig = route.settings?.plugins?.zod;
        if (!zodConfig) continue;

        const method = route.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
        const path = route.path;
        const summary = route.settings.description;
        const tags = route.settings.tags || [];

        const parameters: any[] = [];

        // Query parameters
        if (zodConfig.query && zodConfig.query instanceof ZodObject) {
          for (const [key, schema] of Object.entries(zodConfig.query._zod.def.shape)) {
            parameters.push({
              name: key,
              in: 'query',
              required: !schema.isOptional?.(),
              schema: z.toJSONSchema(schema) as unknown as SchemaObject,
            });
          }
        }

        // Path parameters
        if (zodConfig.params && zodConfig.params instanceof ZodObject) {
          const paramsSchema = zodConfig.params as z.ZodObject<any>;
          for (const [key, schema] of Object.entries(zodConfig.params._zod.def.shape)) {
            parameters.push({
              name: key,
              in: 'path',
              required: true,
              schema: z.toJSONSchema(schema),
            });
          }
        }

        // Request body
        

        const requestBody: RequestBodyObject | undefined = zodConfig.payload
            ? {
                content: {
                    'application/json': {
                    schema: z.toJSONSchema(zodConfig.payload) as unknown as SchemaObject,
                    },
                },
                required: true,
                }
            : undefined;

        if (!paths[path]) paths[path] = {};

        paths[path][method] = {
          summary,
          tags,
          parameters: parameters.length > 0 ? parameters : undefined,
          requestBody,
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: z.toJSONSchema(defaultResponseSchema),
                },
              },
            },
          },
        };
      }

      const document: OpenAPIObject = {
        openapi: '3.0.0',
        info: openapiSpec.info!,
        paths,
        components: {
          securitySchemes: securitySchemes || {},
        },
      };

      if (Object.keys(securitySchemes).length > 0) {
        document.security = Object.keys(securitySchemes).map((name) => ({
          [name]: [],
        }));
      }
      // Serve OpenAPI JSON
      server.route({
        method: 'GET',
        path: jsonPath,
        handler: () => document,
        options: {
          tags: ['docs'],
          auth: false,
          description: 'OpenAPI JSON schema',
        },
      });

      // Serve Swagger UI
      if (enableSwaggerUI) {
        server.route({
          method: 'GET',
          path: docsPath,
          handler: (_, h) => {
            return h
              .response(`<!DOCTYPE html>
<html>
  <head>
    <title>${openapiSpec.info?.title || 'API Docs'}</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      SwaggerUIBundle({ url: '${jsonPath}', dom_id: '#swagger-ui' });
    </script>
  </body>
</html>`)
              .type('text/html');
          },
          options: {
            tags: ['docs'],
            auth: false,
            description: 'Swagger UI',
          },
        });
      }
    },
  };
};
