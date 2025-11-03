# Hapi-Zod Plugin

A plugin for Hapi.js that integrates Zod for request validation. This plugin simplifies the validation of payload, query, and params using Zod schemas.

## Version Compatibility

- For **Zod v4**, use **hapi-zod v2.x.x**:
  ```bash
  npm install hapi-zod
  ```
- For **Zod v3**, use **hapi-zod v1.3.6**:
  ```bash
  npm install hapi-zod@1.3.6
  ```
## Requirements

- **Hapi.js**: Version 17 or higher
- **Node.js**: Version 16 or higher

## Installation

```bash
npm install hapi-zod
```

## Usage

```typescript
import Hapi from '@hapi/hapi';
import ZodValidatorPlugin from 'hapi-zod';
import { z } from 'zod';

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const payloadSchema = z.object({
  name: z.string(),
  age: z.number(),
});

server.route({
  method: 'POST',
  path: '/example',
  options: {
    plugins: {
      zod: {
        payload: payloadSchema,
      },
    },
  },
  handler: (request, h) => {
    return h.response({ message: 'Validation passed!' });
  },
});

const start = async () => {
  await server.register(ZodValidatorPlugin());
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

start();
```

## New Features

### Options

The plugin now supports the following additional options:

- **boomError**: Customize the error response using Boom. Example:
  ```typescript
  const options = {
    boomError: (err) => Boom.badRequest(err.message),
  };
  ```

- **formatError**: Format the error before returning it. Example:
  ```typescript
  const options = {
    formatError: (err) => ({ message: err.message, details: err.errors }),
  };
  ```

- **parse**: Enable or disable parsing for specific parts of the request. Defaults to `true` for all parts. Example:
  ```typescript
  const options = {
    parse: {
      payload: true,
      query: false,
      params: true,
    },
  };
  ```

### Updated Usage

```typescript
const options = {
  boomError: (err) => Boom.badRequest(err.message),
  formatError: (err) => ({ message: err.message, details: err.errors }),
  parse: {
    payload: true,
    query: false,
    params: true,
  },
};

await server.register(ZodValidatorPlugin(options));
```

## Swagger Plugin Usage

The `hapi-zod` package also includes a Swagger plugin to generate OpenAPI documentation from Zod schemas.

### Example

```typescript
import Hapi from '@hapi/hapi';
import HapiZodPlugin, { swaggerPlugin } from 'hapi-zod';
import { z } from 'zod';


const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const payloadSchema = z.object({
  name: z.string(),
  age: z.number(),
});

server.route({
  method: 'POST',
  path: '/example',
  options: {
    plugins: {
      zod: {
        payload: payloadSchema,
      },
    },
  },
  handler: (request, h) => {
    return h.response({ message: 'Validation passed!' });
  },
});

const start = async () => {
  await server.register(HapiZodPlugin());
  await server.register(swaggerPlugin({
    openapiSpec: {
      title: 'My API Docs',
      version: '1.0.0',
      description: 'API documentation generated from Zod schemas',
    },
    docsPath: '/docs',
    jsonPath: '/openapi.json',
    enableSwaggerUI: true,
    includedTags: ['public'],
  }));
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

start();
```

### Swagger Plugin Options

The `swaggerPlugin` supports the following options:

- **openapiSpec**: The API documentation spec. Default: `{
            openapi: '3.0.0',
            info: {
                title : 'Ops API Docs',
                version: '1.0.0',
                description: ''
            },
        }`.
- **docsPath**: The path to access the Swagger UI. Default: `'/ops/docs'`.
- **jsonPath**: The path to access the OpenAPI JSON schema. Default: `'/ops/openapi.json'`.
- **enableSwaggerUI**: Whether to enable the Swagger UI. Default: `true`.
- **defaultResponseSchema**: The default response schema for all routes. Default: `z.object({ success: z.boolean() })`.
- **includedTags**: Limit documentation to only routes tagged with one of the `includedTags`. Default: `[]` (document every route).

## Collaborators

- **Balaji L Narayanan**: [lbalaji8385@gmail.com](mailto:lbalaji8385@gmail.com)
- **Rajesh Shah**: [shahrajesh2113@yahoo.com](mailto:shahrajesh2113@yahoo.com)

## Contributing

We welcome contributions to enhance this plugin. If you have ideas or improvements, feel free to submit a pull request.

## Issues

If you encounter any issues, please raise them on our [GitHub Issues page](https://github.com/balaji8385/hapi-zod/issues).

## License

This project is licensed under the MIT License.
