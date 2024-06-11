---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Widgets

## Creating a widget {#creating-widget}

As a business customer, you may have one or more widgets which will allow your end users to interact with Topper. A widget is associated with one of the flows supported by Topper — currently [crypto on-ramp](./flows/crypto-onramp.mdx) is the only supported flow.

Each widget has its own:

- **Signing keys**: Keys used to sign and verify **bootstrap tokens**.
- **Events** and **webhooks**: Used to receive updates on end user sessions.

During the onboarding process, you will be guided through the process of creating the widgets required for your business needs, and you will be provided with a **widget id** for each.

## Generating a signing key {#generating-signing-keys}

You must generate at least one asymmetric key per widget.

The public key should be sent to Topper as part of the onboarding process, and you will be provided with a unique **key id** which associates your public key with your widget. The private key will be used to sign **bootstrap tokens**, which you will use to [initiate Topper sessions](#initiate-session) for your end users.

Topper supports the following key algorithms:

- Elliptic Curve (`ES256`, `ES384`, `ES512`)
- RSA (`RS256`, `RS384`, `RS512`)

<Tabs>
  <TabItem label="Node.js" value="nodejs" default>

Here is a quick Node.js snippet to generate an ES256 key pair in Topper's preferred JWK format:

```js
import { generateKeyPairSync } from 'crypto';

// Generate a key pair.
const alg = 'ES256';
const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });

// Output in JWK format.
console.log('Private JWK:');
console.log(JSON.stringify({ alg, ...privateKey.export({ format: 'jwk' }) }));
console.log('Public JWK:');
console.log(JSON.stringify({ alg, ...publicKey.export({ format: 'jwk' }) }));

// Private JWK:
// {"alg":"ES256","kty":"EC","x":"dxk0WKKhOyFbU0eZD0plgOB8l9rM-SD5NDgnGpvg99o","y":"nIMebHLyyisqfQKkb-bCp6dVNwVqDR3FLA5ZWUZ_yQ8","crv":"P-256","d":"mdAQEjZBkxtoVeque2wXqebfo1HY0_C2uGApqeKEaX8"}
// Public JWK:
// {"alg":"ES256","kty":"EC","x":"dxk0WKKhOyFbU0eZD0plgOB8l9rM-SD5NDgnGpvg99o","y":"nIMebHLyyisqfQKkb-bCp6dVNwVqDR3FLA5ZWUZ_yQ8","crv":"P-256"}
```

  </TabItem>
  <TabItem label="OpenSSL CLI" value="openssl">

To generate an ES256 key pair using the OpenSSL CLI, use the following commands:

```bash
# Create a private key in `private.pem`.
openssl ecparam -genkey -name prime256v1 -noout -out private.pem

# Create a public key in `public.pem` using the private key in `private.pem`.
openssl ec -in private.pem -pubout -out public.pem
```

  </TabItem>
</Tabs>

## Initiating a session {#initiate-session}

To initiate a Topper session on behalf of your end user you must generate and sign a **bootstrap token**, a [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519) with a payload configuring the Topper widget, signed by the private key generated when creating the widget during onboarding.

The _header_ of the **bootstrap token** must contain the following data:

- `typ`: Must be "JWT".
- `alg`: The algorithm used to sign the payload, for example "ES256".
- `kid`: The **key id** associated with the public key generated when creating the widget.

The _payload_ of the **bootstrap token** must contain the following claims:

- `iat` The timestamp the token was issued (number of _seconds_ since the Unix epoch).
- `jti`: A unique ID for the session which will be used for updates in events or webhooks.
- `sub`: The **widget id** of the widget.

The _payload_ should also contain configuration specific to the widget for which the session is being created.


<Tabs>
  <TabItem label="Node.js" value="nodejs" default>

Here is a Node.js snippet to generate a **bootstrap token** for the [crypto on-ramp](./flows/crypto-onramp.mdx) flow using the [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) package. Please note that the code below is for illustrative purposes only, and the integration should be adapted to your application.

```js
import { createPrivateKey, randomUUID } from 'node:crypto';
import { promisify } from 'node:util';
import jsonwebtoken from 'jsonwebtoken';

// Function to create a bootstrap token signer to be reused.
const createBootstrapTokenSigner = (widgetId, keyId, jwk) => {
  const jwkObject = JSON.parse(jwk);
  const privateKey = createPrivateKey({ format: 'jwk', key: jwkObject });
  const options = { algorithm: jwkObject.alg, keyid: keyId };

  // Promisify `jsonwebtoken.sign()` function to use async/await.
  const signJwt = promisify(jsonwebtoken.sign);

  return async claims => {
    claims = { ...claims, sub: widgetId };

    return await signJwt(claims, privateKey, options);
  };
};

// Widget id example supplied by Topper.
const widgetId = 'd259f6ac-3e8d-46eb-9e6c-c92e138b7660';
// Key id example supplied by Topper.
const keyId = 'c084a85d-c486-4035-9c60-8cec81d8b8f5';
// Private JWK example you generated.
const jwk = '{"alg":"ES256","kty":"EC","x":"dxk0WKKhOyFbU0eZD0plgOB8l9rM-SD5NDgnGpvg99o","y":"nIMebHLyyisqfQKkb-bCp6dVNwVqDR3FLA5ZWUZ_yQ8","crv":"P-256","d":"mdAQEjZBkxtoVeque2wXqebfo1HY0_C2uGApqeKEaX8"}';

// Example of creating a bootstrap token.
const signBootstrapToken = createBootstrapTokenSigner(widgetId, keyId, jwk);
const bootstrapToken = await signBootstrapToken({
  jti: randomUUID(),
  source: {
    amount: '100.00',
    asset: 'USD'
  },
  target: {
    address: '0xb794f5ea0ba39494ce839613fffba74279579268',
    asset: 'ETH',
    network: 'ethereum',
    label: 'My wallet'
  }
});

console.log('Bootstrap token:', bootstrapToken);
```

  </TabItem>

  <TabItem label="Java" value="java" default>

Here is a Java snippet to generate a **bootstrap token** for the [crypto on-ramp](./flows/crypto-onramp.mdx) flow using [`nimbus-jose-jwt`](https://mvnrepository.com/artifact/com.nimbusds/nimbus-jose-jwt). Please note that the code below is for illustrative purposes only, and the integration should be adapted to your application.

```java
package example;

import java.text.ParseException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import static java.util.Map.entry;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.factories.*;
import com.nimbusds.jose.jwk.*;
import com.nimbusds.jwt.*;

public class BootstrapTokenSigner {
  private final String keyId;
  private final String widgetId;
  private final JWK jwk;
  private final JWSSigner jwsSigner;

  public static void main(String[] args) throws ParseException, JOSEException {
    // Widget id example supplied by Topper.
    String widgetId = "d259f6ac-3e8d-46eb-9e6c-c92e138b7660";
    // Key id example supplied by Topper.
    String keyId = "c084a85d-c486-4035-9c60-8cec81d8b8f5";
    // Private JWK example you generated.
    String jwk = "{\"alg\":\"ES256\",\"kty\":\"EC\",\"x\":\"dxk0WKKhOyFbU0eZD0plgOB8l9rM-SD5NDgnGpvg99o\",\"y\":\"nIMebHLyyisqfQKkb-bCp6dVNwVqDR3FLA5ZWUZ_yQ8\",\"crv\":\"P-256\",\"d\":\"mdAQEjZBkxtoVeque2wXqebfo1HY0_C2uGApqeKEaX8\"}";

    // Example of creating a bootstrap token.
    BootstrapTokenSigner bootstrapTokenSigner = new BootstrapTokenSigner(widgetId, keyId, jwk);
    String bootstrapToken = bootstrapTokenSigner.sign(Map.ofEntries(
      entry("source", Map.ofEntries(
        entry("amount", "100.00"),
        entry("asset", "USD"))
      ),
      entry("target", Map.ofEntries(
        entry("address", "0xb794f5ea0ba39494ce839613fffba74279579268"),
        entry("asset", "ETH"),
        entry("network", "ethereum"),
        entry("label", "My wallet")
      ))
    ));

    System.out.printf("Bootstrap token: %s", bootstrapToken);
  }

  public BootstrapTokenSigner(String widgetId, String keyId, String jwkStr) throws ParseException, JOSEException {
    this.widgetId = widgetId;
    this.keyId = keyId;

    // Parse JWK and create a signer to be used when signing JWTs.
    jwk = JWK.parse(jwkStr);
    jwsSigner = new DefaultJWSSignerFactory().createJWSSigner(jwk);
  }

  public String sign(Map<String, Object> claims) throws JOSEException, ParseException {
    claims = new HashMap<>(claims);

    claims.put("sub", this.widgetId);

    // Add iat claim if not present.
    if (!claims.containsKey("iat")) {
      claims.put("iat", Instant.now().getEpochSecond());
    }

    JWTClaimsSet jwtClaimsSet = JWTClaimsSet.parse(claims);
    JWSAlgorithm jwsAlgorithm = JWSAlgorithm.parse(jwk.getAlgorithm().getName());
    JWSHeader jwsHeader = new JWSHeader.Builder(jwsAlgorithm)
        .type(JOSEObjectType.JWT)
        .keyID(keyId)
        .build();

    SignedJWT signedJwt = new SignedJWT(jwsHeader, jwtClaimsSet);

    signedJwt.sign(jwsSigner);

    return signedJwt.serialize();
  }
}
```

  </TabItem>
</Tabs>

After a **bootstrap token** has been generated, a Topper session can be started by opening a browser window for the end user using Topper's app URL. The **bootstrap token** should be added to the `bt` parameter of the query string.

<Tabs>
  <TabItem label="Sandbox" value="sandbox" default>

```
https://app.sandbox.topperpay.com/?bt=<bootstrap token>
```

  </TabItem>
  <TabItem label="Production" value="production" default>

```
https://app.topperpay.com/?bt=<bootstrap token>
```

  </TabItem>
</Tabs>

Using the [Web SDK](./web-sdk.md), the configuration process is seamless, allowing you to choose between multiple ways of initializing Topper and have support for [browser events](./browser-events.md):

<Tabs>
  <TabItem label="Sandbox" value="sandbox" default>

```
const topper = new TopperWebSdk({ environment: TOPPER_ENVIRONMENTS.SANDBOX });

topper.initialize({ bootstrapToken: <bootstrap token> });
```

  </TabItem>
  <TabItem label="Production" value="production" default>

```
const topper = new TopperWebSdk();

topper.initialize({ bootstrapToken: <bootstrap token> });
```

  </TabItem>
</Tabs>

In order to prevent social and replay attacks, a **bootstrap token** will only be valid for 3 minutes after its issue time (from the `iat` claim). A **bootstrap token** may only be used to create a session one time, any subsequent attempts to create a session with the same token will be rejected.

## A note about security {#a-note-about-security}

For security reasons, the **widget id** and **key id** we provide for the sandbox and production [environments](./environments.md) will be different. Moreover, you should not use the same signing key for both environments.

As the name implies, signing private keys should be kept secure. Do not expose them to clients. If a signing private key is compromised in any of the environments, reach out to us and we will delete the associated public key from your widget.
