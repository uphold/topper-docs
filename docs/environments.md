---
sidebar_position: 4
---

# Environments

## Sandbox

Topper app URL: `https://app.sandbox.topperpay.com/`

Topper's sandbox is an environment that simulates the live Topper production environment. The sandbox environment provides a space where you can test your integration with Topper without touching any live accounts, and without using any real funds.

The following card details can be used to force specific outcomes:

| Card number      | Outcome                 |
|------------------|-------------------------|
| 5588686116426417 | `success`               |
| 4312810406702461 | `card_unauthorized`     |
| 4414745735532923 | `card_declined_by_bank` |
| 4916426384864999 | `request_data_invalid`  |
| 4086439018748730 | `card_expired`          |
| 4532942248840268 | `card_unsupported`      |
| 4929216735379028 | `insufficient_funds`    |
| 4748972091871094 | `amount_invalid`        |
| 4916526184701927 | `velocity`              |

:::note
When using the above card numbers, Topper will accept any value for the expiry date and CVV.
:::

## Production

Topper app URL: `https://app.topperpay.com/`

After successfully onboarding and testing your integration in our sandbox environment, you can start Topper sessions for your end users using the production environment.
