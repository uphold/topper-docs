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

To help you verify that a request has come from Topper, we include a `X-Topper-JWS-Signature` header with each request. This header is a [JSON Web Signature](https://datatracker.ietf.org/doc/html/rfc7515) with [detached content](https://datatracker.ietf.org/doc/html/rfc7515#appendix-F), meaning the payload portion of the token has been removed. This token can be verified using the public key provided when creating the webhook.

<Tabs>
  <TabItem label="Node.js" value="nodejs" default>

Here is a Node.js snippet to verify a signature using the [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) package:

```js
const { createPublicKey } = require('crypto');
const { promisify } = require('util');
const jsonwebtoken = require('jsonwebtoken');

// Verify a webhook request.
async function verifyWebhookRequest(request) {
  // Load public key in JWK format from an environment variable.
  const publicKeyJwk = JSON.parse(process.env.TOPPER_WEBHOOK_PUBLIC_KEY);

  // Promisify the `jsonwebtoken.verify()` method for simplicity.
  const verify = promisify(jsonwebtoken.verify);

  // Parse the JWK formatted key.
  const publicKey = createPublicKey({ format: 'jwk', key: publicKeyJwk });

  // Replace the payload portion of the JWS for verification.
  const [header,, signature] = request.headers['X-Topper-JWS-Signature'].split('.');
  const payload = Buffer.from(JSON.stringify(request.body)).toString('base64url');
  const token = `${header}.${payload}.${signature}`;

  // Verify the complete token.
  await verify(token, publicKey);
}
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
