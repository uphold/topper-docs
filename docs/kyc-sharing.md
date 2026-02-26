---
sidebar_position: 15
---

# KYC sharing

To improve the onboarding experience, we provide multiple ways to empower our business customers to share user KYC information directly with Topper.

By receiving KYC details, Topper can reduce the amount of information requested from users, resulting in a faster and smoother KYC process.

## KYC shareable tokens

When starting a Topper session, partners can provide a KYC shareable token, which will be used to ingest all available information for the required scopes.

Currently, we only support tokens from **Sumsub** provider.

:::note
Only applicants with a valid identity will be able to be ingested through the shareable token.
:::

:::info
To use KYC shareable tokens please see [crypto on-ramp](./flows/crypto-onramp.mdx) or [crypto off-ramp](./flows/crypto-offramp.mdx) flows documentation.
:::

## KYC sharing API

There is a REST API where partners can check user KYC details and share information regarding current missing or expired/outdated scopes.

Currently, we support the following scopes: **email**, **profile**, **address**, **phone**, and **identity**.

For more details, see the [KYC sharing documentation](https://developer.uphold.com/rest-apis/core-api/kyc/introduction).

:::info
To use the KYC sharing API, business customers need to complete a compliance check and be approved before gaining access.
:::
