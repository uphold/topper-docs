---
sidebar_position: 15
---

# KYC sharing

To improve the onboarding experience, we provide multiple ways to empower our business customers to share user KYC information directly with Topper.

By receiving KYC details, Topper can reduce the amount of information requested from users, resulting in a faster and smoother KYC process.

Of the two approaches below, **KYC shareable tokens** is the recommended path. The **KYC sharing API** is an alternative for partners who do not use Sumsub or prefer a manual REST integration.

## KYC shareable tokens

:::tip
**Recommended approach** — use this whenever your KYC provider is Sumsub.
:::

When starting a Topper session, partners can provide a KYC shareable token, which will be used to ingest all available information for the required scopes.

Currently, we only support tokens from **Sumsub** provider.

:::note
The Sumsub shareable token flow is only initiated when the applicant has a valid Sumsub identity and Topper requires identity for the current session. If identity is not needed, the token is ignored.
:::

:::info
To use KYC shareable tokens please see [crypto on-ramp](./flows/crypto-onramp.mdx) or [crypto off-ramp](./flows/crypto-offramp.mdx) flows documentation.
:::

### User experience

The user will be presented with a KYC onboarding screen, where they will be required to capture a selfie as part of a liveness check to securely share their personal data. The Sumsub SDK will be initiated, allowing the user to clearly see the information they are about to share while guiding them through the liveness verification process. Once the selfie is successfully submitted, the user will either proceed to transact or, if necessary based on their country, be prompted to provide additional KYC details.

<video controls width="400">
  <source src="/videos/kyc-sharing-flow.mp4" type="video/mp4" />
</video>

## KYC sharing API

:::info
**Alternative approach** — use this only if you cannot integrate via Sumsub or prefer a manual REST integration.
:::

There is a REST API where partners can check user KYC details and share information regarding current missing or expired/outdated scopes.

Currently, we support the following scopes: **email**, **profile**, **address**, **phone**, and **identity**.

For more details, see the [KYC sharing documentation](https://developer.uphold.com/rest-apis/core-api/kyc/introduction).

:::info
To use the KYC sharing API, business customers must be reviewed and approved by Compliance to be authoritative for the shared scopes before gaining access.
:::
