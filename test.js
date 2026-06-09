import { FormData } from './index.js';

export default function () {
  const fd = new FormData();

  // append text fields
  fd.append('field1', 'value1');
  fd.append('field1', 'value2');

  // append a file-like object
  fd.append('file', {
    data: 'filecontent',
    filename: 'a.txt',
    content_type: 'text/plain',
  });

  // set replaces all existing values for a field name
  fd.set('field1', 'replaced');

  const body = fd.body();
  if (!(body instanceof ArrayBuffer)) {
    throw new Error('body() did not return an ArrayBuffer');
  }

  const text = String.fromCharCode.apply(null, new Uint8Array(body));

  if (text.indexOf('replaced') === -1) {
    throw new Error('set() did not replace field value');
  }
  if (text.indexOf('value1') !== -1) {
    throw new Error('set() did not overwrite the original value');
  }
  if (text.indexOf('a.txt') === -1) {
    throw new Error('filename missing from body');
  }
  if (text.indexOf('text/plain') === -1) {
    throw new Error('content_type missing from body');
  }

  console.log('FormData tests passed, body length = ' + body.byteLength);
}
