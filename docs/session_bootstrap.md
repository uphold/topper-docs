---
sidebar_position: 2
---

# Creating a session

## Key generation

When onboarding with Topper you must generate an SSL key pair which will be used to sign **bootstrap tokens** which are used to initiate Topper sessions for your end users.

The public key will be provided to Topper, and you will be provided with a unique **key UUID** associated with your public key. The private key will be used to sign **bootstrap tokens**.

Here is a quick Node.js snippet to generate a key pair in JWK format:

```js
import { generateKeyPairSync } from 'node:crypto';

const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });

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

## Bootstrap token

To initiate a Topper session on behalf of your end user you must generate and sign a **bootstrap token**, a JSON Web Token with a payload configuring the Topper flow, signed by the private key generated when onboarding with Topper.

The _header_ of the **bootstrap token** must contain the following claims:

* **typ**: Must be "JWT".
* **alg**: The algorithm used to sign the payload, for example "ES256".
* **kid**: The **key UUID** associated with the public key generated during onboarding.

The _payload_ of the **bootstrap token** must contain the following claims:

* **iat**: The timestamp the token was issued at, the number of _seconds_ since the Unix epoch.
* **jti**: A unique UUID for the session which will be used for updates in events or webhooks.
* **sub**: The UUID of the associated flow.

The _payload_ should also contain configuration specific to the flow being started.

Here is a Node.js snippet to generate a **bootstrap token** for the crypto on-ramp flow:

```js
import { createPrivateKey, randomUUID } from 'node:crypto';
import { promisify } from 'node:util';
import jsonwebtoken from 'jsonwebtoken';
import privateKeyJwk from './some/store';

const sign = promisify(jsonwebtoken.sign);
const privateKey = createPrivateKey({ format: 'jwk', key: privateKeyJwk });
const sessionId = randomUUID();

const options = {
  algorithm: 'ES256',
  keyid: '<key uuid>'
};

const payload = {
  jti: sessionId,
  sub: '<flow id>',
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

console.log(await sign(payload, privateKey, options));

// 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJmYmIxZTBhLTc1ZDYtNDFlYi1hZjY4LTY1ODRlMTY3ZDQwMCJ9.eyJqdGkiOiJmNThmZTk0Yi1kNjUxLTQ4NmYtOTEwYS1jZmMyMWYyZGM1NTciLCJzdWIiOiIyOWQwY2U4Mi02ZTdkLTQ5OGMtYTUxZC03MDcxZGUyYTQ4Y2UiLCJzb3VyY2UiOnsiYW1vdW50IjoiMTAwLjAwIiwiYXNzZXQiOiJVU0QifSwidGFyZ2V0Ijp7ImFkZHJlc3MiOiIweGI3OTRmNWVhMGJhMzk0OTRjZTgzOTYxM2ZmZmJhNzQyNzk1NzkyNjgiLCJhc3NldCI6IkVUSCIsIm5ldHdvcmsiOiJldGhlcmV1bSIsImxhYmVsIjoiTXkgd2FsbGV0In0sImlhdCI6MTY3OTMyMTI0Nn0.uVwWAC37b6qdc74aGSRCcXzNDIzOXCdibFcv6k68tFXCYknItzkoUDapMl798r2nXEq9jq7VSZMuYvbakmo0Hw'
```

## Start session

After a **bootstrap token** has been generated, a Toppper session can be started by opening a browser session for the end user at the URL `https://topperpay.io/?bt=<bootstrap token>`.