---
sidebar_position: 1
---

# Crypto on-ramp

## Bootstrap token payload

* **source** (_optional_): Object configuring asset used to make payment, and amount to be paid.
  * **amount** (_optional_): String representing the amount to be paid.
  * **asset** (_optional_): Code of asset used to make payment (for example "USD").
* **target**: Object configuring recipient wallet.
  * **address**: Recipient wallet address.
  * **amount** (_optional_): Amount of the receiving asset to be purchased.
  * **asset**: Cryptoasset to be received.
  * **network**: Network of the receiving asset.
  * **label** (_optional_): Label for the recipient to be shown in the Topper UI.

At least one of **`source.amount`** or **`target.amount`** _must_ be provided.