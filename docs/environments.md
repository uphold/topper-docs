---
sidebar_position: 4
---

# Environments

## Sandbox

Topper's sandbox is an environment that simulates the live Topper production environment. The sandbox environment provides a space where you can test your integration with Topper without touching any live accounts, and without using any real funds.

- Topper App URL: `https://app.sandbox.topperpay.com/`
- Topper REST URL: `https://api.sandbox.topperpay.com/`

:::info
If you face issues initializing Topper and see a 'something went wrong' error page, check the devtools console for details on the **bootstrap token** validation.
:::

### Email authentication and phone verification codes

You can bypass email authentication and phone verification codes by typing `000000`.

### ID verification

You can skip the need to upload a real ID by either:
- Using an email from a whitelisted domain (e.g., `user@whitelisted-domain.com`)
- Adding `+kyc` to your email address (e.g., `user+kyc@domain.com`)

Users will still see the KYC onboarding interface, maintaining a production-like experience.

:::note
To whitelist a domain, please contact your account manager.
:::

### Cards

The following card details can be used to force specific outcomes when creating accounts:

| Card number      | Outcome                 | Type   | Country | Brand      |
|------------------|-------------------------|--------|---------|------------|
| 5318773012490080 | `success`               | debit  | US      | MasterCard |
| 4748972091871094 | `amount_invalid`        | debit  | US      | Visa       |
| 4818924250131070 | `card_unauthorized`     | debit  | GB      | Visa       |
| 4407108123937239 | `card_unauthorized`     | credit | GB      | Visa       |
| 4414745735532923 | `card_declined_by_bank` | credit | US      | Visa       |
| 5148447461737269 | `card_declined_by_bank` | debit  | US      | MasterCard |
| 4086439018748730 | `card_expired`          | credit | US      | Visa       |
| 4695070264707089 | `card_expired`          | debit  | US      | Visa       |
| 4532942248840268 | `card_unsupported`      | credit | AD      | Visa       |
| 4472010538259482 | `card_unsupported`      | debit  | US      | Visa       |
| 4916426384864999 | `request_data_invalid`  | credit | US      | Visa       |
| 4648778096000816 | `request_data_invalid`  | debit  | US      | Visa       |
| 4929216735379028 | `insufficient_funds`    | credit | MT      | Visa       |
| 4247318851058116 | `insufficient_funds`    | debit  | US      | Visa       |
| 4916526184701927 | `velocity`              | credit | AE      | Visa       |
| 4467625019643180 | `velocity`              | debit  | US      | Visa       |

:::tip
When using the above card numbers, Topper will accept any value for the expiry date and CVV.
:::

:::caution
In the `crypto_offramp` flow, only `debit` cards that match the user's country of residence will be accepted.
:::

## Production

After successfully onboarding and testing your integration in our sandbox environment, you can start Topper sessions for your end users using the production environment.

- Topper App URL: `https://app.topperpay.com/`
- Topper REST URL: `https://api.topperpay.com/`

:::info
For security reasons, your **widget id** and **key id** for sandbox won't work in production. You need to generate a new [signing key](./widgets.md#generating-signing-keys) for production usage.
:::
