/**
 * App Config
 */

export const AUTH_SCHEME = 'Bearer '; // default for JWT module
export const ACCESS_TOKEN_KEY = 'et';
export const REFRESH_TOKEN_KEY = 'ert';
export const IMAGE_TOKEN_KEY = 'eit';
export const HOME_URL_KEY = 'ehu';
export const REMEMBER_ME_KEY = 'er';

/**
 * Shared
 */

export const VALIDATION_REGEX = {
  // Old phone regex
  // phone: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  // Australian phone regex
  // phone: /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/,
  // 7+numbers phone regex
  // tslint:disable-next-line:max-line-length
  phone: /^[+]?(?=(?:[^\dx]*\d){7})(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/,
  email: /^[a-zA-Z0-9_\.]{3,32}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/,
  postCode: /^(\d{4})$/
};

export const JWT = {sign:  function(jwk, headers, claims) {
    // Make a shallow copy of the key
    // (to set ext if it wasn't already set)
    jwk = Object.assign({}, jwk);

    // The headers should probably be empty
    headers.typ = 'JWT';
    headers.alg = 'ES256';
    if (!headers.kid) {
      // alternate: see thumbprint function below
      headers.jwk = { kty: jwk.kty, crv: jwk.crv, x: jwk.x, y: jwk.y };
    }

    const jws = {
      // JWT "headers" really means JWS "protected headers"
      protected: strToUrlBase64(JSON.stringify(headers)),

      // JWT "claims" are really a JSON-defined JWS "payload"
      payload: strToUrlBase64(JSON.stringify(claims)),
      signature: ''
    };

    // To import as EC (ECDSA, P-256, SHA-256, ES256)
    const keyType = {
      name: 'ECDSA',
      namedCurve: 'P-256',
      hash: { name: 'SHA-256' }
    };

    // To make re-exportable as JSON (or DER/PEM)
    const exportable = true;

    // Import as a private key that isn't black-listed from signing
    const privileges: KeyUsage[] = ['sign'];

    // Actually do the import, which comes out as an abstract key type
    return crypto.subtle
    // .importKey('jwk', jwk, keyType, exportable, privileges)
      .importKey('jwk', jwk, keyType, exportable, privileges)
      .then(function(privateKey) {
        // Convert UTF-8 to Uint8Array ArrayBuffer
        // const data = new TextEncoder().encode(jws.protected + '.' + jws.payload);

        const uint8Array = strToUint8(jws.protected + '.' + jws.payload);

        // The signature and hash should match the bit-entropy of the key
        // https://tools.ietf.org/html/rfc7518#section-3
        const sigType = { name: 'ECDSA', hash: { name: 'SHA-256' } };

        return crypto.subtle.sign(sigType, privateKey, uint8Array).then(function(signature) {
          // returns an ArrayBuffer containing a JOSE (not X509) signature,
          // which must be converted to Uint8 to be useful

          jws.signature = uint8ToUrlBase64(new Uint8Array(signature));

          // JWT is just a "compressed", "protected" JWS
          return jws.protected + '.' + jws.payload + '.' + jws.signature;
        });
      });
  }};

export const EC = {
  generate: function() {
    const keyType = {
      name: 'ECDSA',
      namedCurve: 'P-256'
    };
    const exportable = true;
    const privileges: KeyUsage[] = ['sign', 'verify'];
    return crypto.subtle.generateKey(keyType, exportable, privileges).then(function(key) {
      // returns an abstract and opaque WebCrypto object,
      // which in most cases you'll want to export as JSON to be able to save
      return crypto.subtle.exportKey('jwk', key.privateKey);
    });
  },
  neuter: function(jwk) {
    const copy = Object.assign({}, jwk);
    delete copy.d;
    copy.key_ops = ['verify'];
    return copy;
  }
};

export const JWK = {
  thumbprint: function(jwk) {
    // lexigraphically sorted, no spaces
    const sortedPub = '{"crv":"CRV","kty":"EC","x":"X","y":"Y"}'
      .replace('CRV', jwk.crv)
      .replace('X', jwk.x)
      .replace('Y', jwk.y);

    // The hash should match the size of the key,
    // but we're only dealing with P-256
    return crypto.subtle
      .digest({ name: 'SHA-256' }, strToUint8(sortedPub))
      .then(function(hash) {
        return uint8ToUrlBase64(new Uint8Array(hash));
      });
  }
};

function strToUint8(str) {
  return new TextEncoder().encode(str);
}

function strToUrlBase64(str) {
  return binToUrlBase64(utf8ToBinaryString(str));
}

function binToUrlBase64(bin) {
  return btoa(bin)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/g, '');
}

function utf8ToBinaryString(str) {
  var escstr = encodeURIComponent(str);
  // replaces any uri escape sequence, such as %0A,
  // with binary escape, such as 0x0A
  var binstr = escstr.replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode(parseInt(p1, 16));
  });

  return binstr;
}

function uint8ToUrlBase64(uint8: Uint8Array) {
  let bin = '';
  uint8.forEach(function(code) {
    bin += String.fromCharCode(code);
  });
  return binToUrlBase64(bin);
}
