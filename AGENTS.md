# k6-jslib-formdata

FormData polyfill for k6 that builds multipart/form-data request bodies.

## Architecture

Single-file library with no build step, no dependencies, no tests. Users import it directly from jslib.k6.io in their k6 scripts, not bundled into k6 itself.

The constructor creates a MIME boundary and a parts array. `append`/`set` push field/file pairs onto it. `body` serializes into a multipart byte array and returns an ArrayBuffer.

Data flows one way: field values in, serialized ArrayBuffer out. The caller passes the ArrayBuffer plus a content-type header (with boundary) to k6's HTTP APIs.

## Gotchas

- The byte conversion truncates characters to the low byte. Multi-byte UTF-8 will be mangled. This is intentional: k6's HTTP layer handles encoding separately.
- `set` replaces ALL matching field names but keeps them all in place. This differs from the browser spec, which replaces the first and removes duplicates.
- The module uses CommonJS-style `exports.FormData` assignment, but k6's module system treats it as a named export. Standard Node.js or browser semantics do not apply.
- ESLint config pulls in React/JSX/Airbnb rules from a template. They are irrelevant to this repo.
