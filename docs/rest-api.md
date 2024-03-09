---
sidebar_position: 7
---

# REST API

A Topper widget is a turnkey solution: you generate a bootstrap token, open it up and that's it. However, you might want to request and display information before opening the widget itself. The most common scenario is to display pricing information to the user beforehand.

Topper offers a REST API you can use to:

- Get the list of supported countries.
- Get the list of supported assets per flow.
- Get the list of supported payment methods per flow.
- Create a pricing simulation for a specific flow.

:::info
The REST API has rate-limiting rules in place. If you plan to use the REST API extensively, reach out to us and we will whitelist the IPs you use to make requests to this API.
:::

## OpenAPI documentation

To make it easier to consume the REST API, there's an [OpenAPI specification](https://www.openapis.org/) available at https://api.topperpay.com/docs/json.

You may also visualize the documentation at https://api.topperpay.com/docs.
