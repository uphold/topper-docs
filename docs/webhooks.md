---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhooks

## Introduction

For each widget you have configured, you may configure a number of webhooks. When there are updates to one of your user's Topper sessions, we will make a HTTP `POST` request to your configured URL to provide further information.

During the onboarding process you may provide us with webhook URLs, and the events you wish to receive for each one. We will then provide you with a public key for each URL, which you can use to securely verify the request was sent by Topper.

A webhook request will include the following data:

- `name`: Name of the event type.
- `id`: UUID of the event which will persist across retries, can be used as an idempotency key.
- `bootstrapTokenId`: The `jti` claim of the bootstrap token used to initiate the session.
- `data`: Payload of the event.

## Events

Full information about the available events and their associated payloads can be found on the associated **Flows** page.

| Flow | Event | Trigger |
| - | - | - |
| [crypto_onramp](./flows/crypto-onramp.mdx) | [`order:crypto-onramp:committed`](./flows/crypto-onramp.mdx#ordercrypto-onrampcommitted) | User placed an order. |
| [crypto_onramp](./flows/crypto-onramp.mdx) | [`order:crypto-onramp:charged`](./flows/crypto-onramp.mdx#ordercrypto-onrampcharged) | User has been charged for their order. |
| [crypto_onramp](./flows/crypto-onramp.mdx) | [`order:crypto-onramp:completed`](./flows/crypto-onramp.mdx#ordercrypto-onrampcompleted) | User's order has completed. |
| [crypto_onramp](./flows/crypto-onramp.mdx) | [`order:crypto-onramp:failed`](./flows/crypto-onramp.mdx#ordercrypto-onrampfailed) | User's order has failed. |
| [crypto_onramp](./flows/crypto-onramp.mdx) | [`order:crypto-onramp:refund:completed`](./flows/crypto-onramp.mdx#ordercrypto-onramprefundcompleted) | User's order has been successfully refunded. |

## Verifying a request

To help you verify that a request has come from Topper, we include a `X-Topper-JWS-Signature` header with each request. This header is a [JSON Web Signature](https://datatracker.ietf.org/doc/html/rfc7515) (JWS) with [detached content](https://datatracker.ietf.org/doc/html/rfc7515#appendix-F), meaning the payload portion of the token has been removed. This token can be verified using the public key provided when creating the webhook.

<Tabs>
  <TabItem label="Node.js" value="nodejs" default>

Here is a Node.js snippet to verify a signature using the [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) package. Please note that the code below is for illustrative purposes only, and the integration should be adapted to your application.

```js
import { createPublicKey } from 'node:crypto';
import { promisify } from 'node:util';
import jsonwebtoken from 'jsonwebtoken';

// Function that returns a webhook verifier to be reused across requests.
const createWebhookVerifier = jwk => {
  const jwkObject = JSON.parse(jwk);
  const publicKey = createPublicKey({ format: 'jwk', key: jwkObject });
  const options = { algorithms: [jwkObject.alg] }

  // Promisify the `jsonwebtoken.verify()` function to use async/await.
  const verifyJwt = promisify(jsonwebtoken.verify);

  return async (body, jws) => {
    // Replace the payload portion of the JWS for verification.
    const [header, , signature] = jws.split('.');
    const payload = Buffer.from(body).toString('base64url');
    const token = `${header}.${payload}.${signature}`;

    // Verify the token.
    try {
      await verifyJwt(token, publicKey, options);
    } catch (error) {
      if (error instanceof jsonwebtoken.JsonWebTokenError) {
        return false;
      }

      throw error;
    }

    return true;
  };
};

// JWK public key example supplied by Topper.
const jwk = '{"x":"7-INQ150R-MCWlj5X_wyGLRIRYAA-o8NakJiUq7gOGg","y":"dM-GsyJvdDOuALE3l-U9lPL8V3gY_5BPjLH539yTdKU","alg":"ES256","crv":"P-256","kid":"15a5142e-c20f-466e-8132-234dbdae97e7","kty":"EC"}'
// Request body example.
const body = '{"foo":"bar"}';
// X-Topper-JWS-Signature request header example.
const jws = 'eyJhbGciOiJFUzI1NiJ9..2H0Ypm5sVzuSpgyZySdAJan05lYxctqhmO8btghFQQzkisvSlNvNWzQ1kqTPXTLP_dR4zQZrTsSsShAK51I4EQ';

// Example of verifying a webhook request.
const verifyWebhook = createWebhookVerifier(jwk);
const verified = await verifyWebhook(body, jws);

console.log('Verified:', verified);
```

  </TabItem>

  <TabItem label="Java" value="java">

Here is a Java class to verify a signature using the [`nimbus-jose-jwt`](https://mvnrepository.com/artifact/com.nimbusds/nimbus-jose-jwt). Please note that the code below is for illustrative purposes only, and the integration should be adapted to your application.

```java
package example;

import java.security.Key;
import java.text.ParseException;
import java.util.Arrays;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.factories.*;
import com.nimbusds.jose.jwk.*;

public class WebhookVerifier {
  private final JWK jwk;
  private final Key key;

  public static void main(String[] args) throws ParseException {
    // JWK public key example supplied by Topper.
    String jwk = "{\"x\":\"7-INQ150R-MCWlj5X_wyGLRIRYAA-o8NakJiUq7gOGg\",\"y\":\"dM-GsyJvdDOuALE3l-U9lPL8V3gY_5BPjLH539yTdKU\",\"alg\":\"ES256\",\"crv\":\"P-256\",\"kid\":\"15a5142e-c20f-466e-8132-234dbdae97e7\",\"kty\":\"EC\"}";
    // Request body example.
    String body = "{\"foo\":\"bar\"}";
    // X-Topper-JWS-Signature request header example.
    String jws = "eyJhbGciOiJFUzI1NiJ9..2H0Ypm5sVzuSpgyZySdAJan05lYxctqhmO8btghFQQzkisvSlNvNWzQ1kqTPXTLP_dR4zQZrTsSsShAK51I4EQ";

    // Example of verifying a webhook request.
    WebhookVerifier webhookVerifier = new WebhookVerifier(jwk);
    boolean verified = webhookVerifier.verify(body, jws);

    System.out.printf("Verified: %b", verified);
  }

  public WebhookVerifier(String jwkStr) throws ParseException {
    // Parse JWK and convert to a Java key to be used when verifying signatures.
    jwk = JWK.parse(jwkStr);
    key = KeyConverter.toJavaKeys(Arrays.asList(new JWK[]{jwk})).get(0);
  }

  public boolean verify(String requestBody, String jws) {
    // Parse JWS into a JWS object.
    JWSObject jwsObject;

    try {
      jwsObject = JWSObject.parse(jws, new Payload(requestBody));
    } catch (ParseException e) {
      return false;
    }

    // Check if key referenced in the JWS header matches the JWK.
    JWSHeader jwsHeader = jwsObject.getHeader();
    JWKMatcher jwsMatcher = JWKMatcher.forJWSHeader(jwsHeader);

    if (!jwsMatcher.matches(jwk)) {
      return false;
    }

    // Verify the JWS using the public key.
    try {
      JWSVerifier jwsVerifier = new DefaultJWSVerifierFactory().createJWSVerifier(jwsHeader, key);

      return jwsObject.verify(jwsVerifier);
    } catch (JOSEException e) {
      return false;
    }
  }
}
```

  </TabItem>

  <TabItem label="Golang" value="go">

Here is a golang snippet to verify a signature using the [`github.com/lestrrat-go/jwx/v2`](https://github.com/lestrrat-go/jwx) package. Please note that the code below is for illustrative purposes only, and the integration should be adapted to your application.

```go
package main

import (
  "encoding/base64"

  "github.com/lestrrat-go/jwx/v2/jwk"
  "github.com/lestrrat-go/jwx/v2/jws"
)

func createWebhookVerifier(key string) (func(body string, sig string) (bool, error), error) {
  jwkObject, err := jwk.ParseKey([]byte(key))

  if err != nil {
    return nil, err
  }

  return func(body, sig string) (bool, error) {
    header, _, signature, err := jws.SplitCompactString(sig)

    if err != nil {
      return false, err
    }

    token := string(header) + "." + (base64.RawStdEncoding.EncodeToString([]byte(body))) + "." + string(signature)
    _, err = jws.Verify([]byte(token), jws.WithKey(jwkObject.Algorithm(), jwkObject))

    if err != nil {
      return false, err
    }

    return true, nil
  }, nil

}

// JWK public key example supplied by Topper.
var pubKey = "{\"x\":\"7-INQ150R-MCWlj5X_wyGLRIRYAA-o8NakJiUq7gOGg\",\"y\":\"dM-GsyJvdDOuALE3l-U9lPL8V3gY_5BPjLH539yTdKU\",\"alg\":\"ES256\",\"crv\":\"P-256\",\"kid\":\"15a5142e-c20f-466e-8132-234dbdae97e7\",\"kty\":\"EC\"}"

// Request body example.
var body = "{\"foo\":\"bar\"}"

// X-Topper-JWS-Signature request header example.
var topperJwsSig = "eyJhbGciOiJFUzI1NiJ9..2H0Ypm5sVzuSpgyZySdAJan05lYxctqhmO8btghFQQzkisvSlNvNWzQ1kqTPXTLP_dR4zQZrTsSsShAK51I4EQ"

func main() {
  webhookVerifier, err := createWebhookVerifier(pubKey)

  if err != nil {
    panic(err)
  }

  ok, err := webhookVerifier(body, topperJwsSig)

  if err != nil {
    panic(err)
  }

  println("Verified:", ok)
}
```

  </TabItem>

  <TabItem label="Python" value="python">

Here is a python snippet to verify a signature using the [`python-jose`](https://github.com/mpdavis/python-jose) package. Please note that the code below is for illustrative purposes only, and the integration should be adapted to your application.

```python
from jose import jwk, jws
from jose.constants import ALGORITHMS
from jose.utils import base64url_encode
import json, base64

# Function that returns a webhook verifier to be reused across requests.
def createWebhookVerifier(pubJwk):
  jwkObject = jwk.construct(json.loads(pubJwk))

  def webhookVerifier(body, topperJwsSig):
    # Replace the payload portion of the JWS for verification.
    jwsSplited = topperJwsSig.split('.')
    header, signature = jwsSplited[0], jwsSplited[2]
    payload = base64url_encode(bytes(body, encoding="utf-8"))
    
    token = f"{header}.{payload.decode("utf-8")}.{signature}"

    # Verify the token.
    try:
      jws.verify(token, jwkObject.public_key(), ALGORITHMS.ES256)
    except:
      return False

    return True

  return webhookVerifier

# JWK public key example supplied by Topper.
pubJwk = '{"x":"7-INQ150R-MCWlj5X_wyGLRIRYAA-o8NakJiUq7gOGg","y":"dM-GsyJvdDOuALE3l-U9lPL8V3gY_5BPjLH539yTdKU","alg":"ES256","crv":"P-256","kid":"15a5142e-c20f-466e-8132-234dbdae97e7","kty":"EC"}'
# Request body example.
body = '{"foo":"bar"}'
# X-Topper-JWS-Signature request header example.
topperJwsSig = 'eyJhbGciOiJFUzI1NiJ9..2H0Ypm5sVzuSpgyZySdAJan05lYxctqhmO8btghFQQzkisvSlNvNWzQ1kqTPXTLP_dR4zQZrTsSsShAK51I4EQ'

if __name__ == "__main__": 
  # Example of verifying a webhook request.
  verifyWebhook = createWebhookVerifier(pubJwk)
  verified = verifyWebhook(body, topperJwsSig)

  print('Verified:', verified)
```

  </TabItem>

  <TabItem label="PHP" value="php">

Here is a php snippet to verify a signature using the [`web-token/jwt-framework`](https://github.com/web-token/jwt-framework) package. Please note that the code below is for illustrative purposes only, and the integration should be adapted to your application.

```php
<?php

require_once "vendor/autoload.php";

use Base64Url\Base64Url;
use Jose\Component\Core\JWK;
use Jose\Component\Core\AlgorithmManager;
use Jose\Component\Signature\Algorithm\ES256;
use Jose\Component\Signature\JWSLoader;
use Jose\Component\Signature\JWSVerifier;
use Jose\Component\Signature\Serializer\CompactSerializer;
use Jose\Component\Signature\Serializer\JWSSerializerManager;

function createWebhookVerifier($jwk)
{
  $jwkObject = JWK::createFromJson($jwk);
  $serializerManager = new JWSSerializerManager([new CompactSerializer()]);
  $jwsVerifier = new JWSVerifier(new AlgorithmManager([new ES256()]));

  return function ($body, $jws) use ($jwkObject, $jwsVerifier, $serializerManager) {
    // Replace the payload portion of the JWS for verification.
    $jwsSplited = explode(".", $jws);
    [$header, $_, $signature] = $jwsSplited;
    $encodedBody = Base64Url::encode($body);
    $token = "$header.$encodedBody.$signature";

    return $jwsVerifier->verifyWithKey($serializerManager->unserialize($token), $jwkObject, 0);
  };
}

// JWK public key example supplied by Topper.
$jwk = '{"x":"7-INQ150R-MCWlj5X_wyGLRIRYAA-o8NakJiUq7gOGg","y":"dM-GsyJvdDOuALE3l-U9lPL8V3gY_5BPjLH539yTdKU","alg":"ES256","crv":"P-256","kid":"15a5142e-c20f-466e-8132-234dbdae97e7","kty":"EC"}';
// Request body example.
$body = '{"foo":"bar"}';
// X-Topper-JWS-Signature request header example.
$jws = 'eyJhbGciOiJFUzI1NiJ9..2H0Ypm5sVzuSpgyZySdAJan05lYxctqhmO8btghFQQzkisvSlNvNWzQ1kqTPXTLP_dR4zQZrTsSsShAK51I4EQ';

// Example of verifying a webhook request.
$verifyWebhook = createWebhookVerifier($jwk);
$verified = $verifyWebhook($body, $jws) ? "true" : "false";

echo "Verified: $verified";
```

  </TabItem>
</Tabs>

## Timeouts and failures

Requests are made with a 4 second timeout. If a request times out, or if we receive an error response code (`408`, `409`, `429`, or `5XX`) in that period, the request will be retried several times with exponential backoff. The request will be retried up to 10 times over a period of approximately 3 hours.

## IP whitelisting

The following is a list of IP addresses we will use to make webhook requests:

- `35.188.196.183`
- `104.198.177.219`
- `104.154.232.87`
- `130.211.229.195`
- `104.198.221.24`
- `104.197.27.15`
- `35.194.9.154`
- `104.154.144.51`
- `104.197.210.12`
- `35.225.6.73`
