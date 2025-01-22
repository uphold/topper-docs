---
sidebar_position: 12
---

# Initial Screen

The initial screen on Topper is the amount and asset selection.

To skip this screen on initialization and go straight to authentication, simply add the `initial_screen` query parameter to the URL like `https://app.topperpay.com/?bt=<bootstrap token>&initial_screen=authentication`.



| Amount selection screen | Authentication screen   |
|-------------------------|-------------------------|
| <img src="/images/amount-selection-screen.jpg" alt="Amount selection screen" width="300"/> | <img src="/images/get-started-screen.jpg" alt="Authentication screen" width="300"/> |


**What other initial screens are supported?**

Currently only the Authentication screen is supported.


**Using the [Web SDK](./web-sdk.md):**

```js
const topper = new TopperWebSdk({ initial_screen: TOPPER_INITIAL_SCREENS.AUTHENTICATION });

topper.initialize({ bootstrapToken: <bootstrap token> });
```
