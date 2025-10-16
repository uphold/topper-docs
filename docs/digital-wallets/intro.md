---
sidebar_position: 1
---

# Intro

**What are the digital wallets supported by Topper?**

Topper currently supports Apple Pay, Google Pay, PayPal and Venmo on `crypto_onramp` flow only.

**What are the benefits of using digital wallets as payment options?**

These payment options offer a seamless and convenient way for your customers to complete transactions. Generally, users tend to prefer these over other payment methods when presented with the choice.

### Mobile integration:

- If you are redirecting to Topper through the user's browser, no extra configuration is necessary.
- When Topper is embed with a `WebView`, ensure setting `is_android_webview=1` or `is_ios_webview=1` as a query parameter in the URL.
- When Topper is opened using a `Safari View Controller`, ensure setting `is_safari_view_controller=1` as a query parameter in the URL.
  
:::caution Deprecated Parameters
The parameters `is_ios_app` and `is_android_app` are now renamed to `is_ios_webview` and `is_android_webview`.

Legacy parameters are still supported but **deprecated**.

Please migrate to the new parameter names to ensure future compatibility.
:::

**Example URLs:**
- Android: `https://app.topperpay.com/?bt=<bootstrap token>&is_android_webview=1`
- iOS: `https://app.topperpay.com/?bt=<bootstrap token>&is_ios_webview=1`
- Safari View Controller: `https://app.topperpay.com/?bt=<bootstrap token>&is_safari_view_controller=1`

**Using the [Web SDK](../web-sdk.md):**

- Android: `topper.initialize({ bootstrapToken: <bootstrap token>, { is_android_webview: true } });`
- iOS: `topper.initialize({ bootstrapToken: <bootstrap token>, { is_ios_webview: true } });`
- Safari View Controller: `topper.initialize({ bootstrapToken: <bootstrap token>, { is_safari_view_controller: true } });`
