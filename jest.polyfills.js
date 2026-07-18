'use strict';

function installFromUndici() {
  let undici;

  try {
    undici = require('node:undici');
  } catch {
    try {
      undici = require('undici');
    } catch {
      return false;
    }
  }

  const {
    FormData,
    Headers,
    Request,
    Response,
    fetch,
    AbortSignal,
    AbortController,
  } = undici;

  if (typeof globalThis.FormData === 'undefined') {
    globalThis.FormData = FormData;
  }

  if (typeof globalThis.Headers === 'undefined') {
    globalThis.Headers = Headers;
  }

  if (typeof globalThis.Request === 'undefined') {
    globalThis.Request = Request;
  }

  if (typeof globalThis.Response === 'undefined') {
    globalThis.Response = Response;
  }

  if (typeof globalThis.fetch === 'undefined') {
    globalThis.fetch = fetch;
  }

  if (typeof globalThis.AbortSignal === 'undefined') {
    globalThis.AbortSignal = AbortSignal;
  }

  if (typeof globalThis.AbortController === 'undefined') {
    globalThis.AbortController = AbortController;
  }

  return true;
}

function installMinimalFetchGlobals() {
  if (typeof globalThis.FormData === 'undefined') {
    globalThis.FormData = class FormData {
      _parts = [];
    };
  }

  if (typeof globalThis.Headers === 'undefined') {
    globalThis.Headers = class Headers {
      constructor(init) {
        this._map = new Map();

        if (init && typeof init === 'object') {
          for (const [key, value] of Object.entries(init)) {
            this._map.set(String(key).toLowerCase(), String(value));
          }
        }
      }

      append(name, value) {
        this._map.set(String(name).toLowerCase(), String(value));
      }

      get(name) {
        return this._map.get(String(name).toLowerCase()) ?? null;
      }

      has(name) {
        return this._map.has(String(name).toLowerCase());
      }
    };
  }

  if (typeof globalThis.AbortSignal === 'undefined') {
    globalThis.AbortSignal = class AbortSignal {
      aborted = false;
      reason = undefined;

      addEventListener() {}

      removeEventListener() {}
    };
  }

  if (typeof globalThis.AbortController === 'undefined') {
    globalThis.AbortController = class AbortController {
      signal = new globalThis.AbortSignal();

      abort(reason) {
        this.signal.aborted = true;
        this.signal.reason = reason;
      }
    };
  }

  if (typeof globalThis.fetch === 'undefined') {
    globalThis.fetch = async () => {
      throw new Error('fetch is not available in this Jest environment.');
    };
  }
}

if (!installFromUndici()) {
  installMinimalFetchGlobals();
}

if (typeof globalThis.Headers === 'undefined') {
  installMinimalFetchGlobals();
}
