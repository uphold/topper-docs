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
const { generateKeyPairSync } = require('crypto');

// Generate a key pair
const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });

// Output in JWK format
console.log({
  privateKey: privateKey.export({ format: 'jwk' }),
  publicKey: publicKey.export({ format: 'jwk' })
});

// {
//   privateKey: {
//     kty: 'EC',
//     x: 'zXlHACgk6oYgeTGirjFMToKXPIulH19yB2ywv3ji0L8',
//     y: 'CrYvGe6X_A-8YujOMpHlKOmNtUzHXQF4-O0hR6Y9XTo',
//     crv: 'P-256',
//     d: 'LerkJ-8frEQFj-0Yiw_s6_d8gu0qwha_ita4RIsYO2Q'
//   },
//   publicKey: {
//     kty: 'EC',
//     x: 'zXlHACgk6oYgeTGirjFMToKXPIulH19yB2ywv3ji0L8',
//     y: 'CrYvGe6X_A-8YujOMpHlKOmNtUzHXQF4-O0hR6Y9XTo',
//     crv: 'P-256'
//   }
// }
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

Here is a Node.js snippet to generate a **bootstrap token** for the [crypto on-ramp](./flows/crypto-onramp.mdx) flow using the [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) package:

```js
const { createPrivateKey, randomUUID } = require('crypto');
const { promisify } = require('util');
const jsonwebtoken = require('jsonwebtoken');

// Load private key in JWK format from an environment variable.
const privateKeyJwk = JSON.parse(process.env.MY_SIGNING_PRIVATE_KEY);

// Promisify the `jsonwebtoken.sign()` method for simplicity.
const sign = promisify(jsonwebtoken.sign);

// Parse the JWK formatted key.
const privateKey = createPrivateKey({ format: 'jwk', key: privateKeyJwk });

// Create the options the `jsonwebtoken.sign()` method.
const options = {
  algorithm: 'ES256',
  keyid: '<key id>'
};

// Create the payload for the bootstrap token, note that the
// `jsonwebtoken.sign()` method automatically adds the `iat` claim.
const payload = {
  jti: randomUUID(),
  sub: '<widget id>',
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
};

// Output the signed bootstrap token.
console.log(await sign(payload, privateKey, options));

// 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJmYmIxZTBhLTc1ZDYtNDFlYi1hZjY4LTY1ODRlMTY3ZDQwMCJ9.eyJqdGkiOiJmNThmZTk0Yi1kNjUxLTQ4NmYtOTEwYS1jZmMyMWYyZGM1NTciLCJzdWIiOiIyOWQwY2U4Mi02ZTdkLTQ5OGMtYTUxZC03MDcxZGUyYTQ4Y2UiLCJzb3VyY2UiOnsiYW1vdW50IjoiMTAwLjAwIiwiYXNzZXQiOiJVU0QifSwidGFyZ2V0Ijp7ImFkZHJlc3MiOiIweGI3OTRmNWVhMGJhMzk0OTRjZTgzOTYxM2ZmZmJhNzQyNzk1NzkyNjgiLCJhc3NldCI6IkVUSCIsIm5ldHdvcmsiOiJldGhlcmV1bSIsImxhYmVsIjoiTXkgd2FsbGV0In0sImlhdCI6MTY3OTMyMTI0Nn0.uVwWAC37b6qdc74aGSRCcXzNDIzOXCdibFcv6k68tFXCYknItzkoUDapMl798r2nXEq9jq7VSZMuYvbakmo0Hw'
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

In order to prevent social and replay attacks, a **bootstrap token** will only be valid for 60 seconds after its issue time (from the `iat` claim). A **bootstrap token** may only be used to create a session one time, any subsequent attempts to create a session with the same token will be rejected.

## A note about security {#a-note-about-security}

For security reasons, the **widget id** and **key id** we provide for the sandbox and production [environments](./environments.md) will be different. Moreover, you should not use the same signing key for both environments.

As the name implies, signing private keys should be kept secure. Do not expose them to clients. If a signing private key is compromised in any of the environments, reach out to us and we will delete the associated public key from your widget.
