# k6-jslib-formdata

FormData implements polyfill for k6.

This simplifies the creation of multipart/form-data requests from k6 scripts.
It was adapted from the [original version by Rob Wu](https://gist.github.com/Rob--W/8b5adedd84c0d36aba64) to remove references of
XMLHttpRequest and File related code which isn't supported in k6.

## Usage

```js
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
```

See the [k6 documentation website](https://k6.io/docs/examples/data-uploads/) for more details on how to use the `FormData` object.