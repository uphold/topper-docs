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
| 4485040371536584 | `success`               |
| 4312810406702461 | `card_unauthorized`     |
| 4821276111223694 | `card_declined_by_bank` |
| 4648778096000816 | `request_data_invalid`  |
| 4695070264707089 | `card_expired`          |
| 4472010538259482 | `card_unsupported`      |
| 4247318851058116 | `insufficient_funds`    |
| 4748972091871094 | `amount_invalid`        |
| 4467625019643180 | `velocity`              |

## Production

Topper app URL: `https://app.topperpay.com/`

After successfully onboarding and testing your integration in our sandbox environment, you can start Topper sessions for your end users using the production environment.
