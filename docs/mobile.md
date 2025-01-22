---
sidebar_position: 14
---

# Mobile

When integrating Topper with a mobile app you can either open Topper on a **user's browser** (where no extra configuration is required), or embed it in a **WebView**.

When embedding on a **WebView**, please ensure the following steps have been completed:

- Set the correct parameters referenced on [Single Sign-On](./single-sign-on.md#mobile-app) and [Digital Wallets](./digital-wallets.md#mobile-app).
- Configure the **WebView** to support [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/).
- Configure camera and audio app permissions to support [Veriff](https://www.veriff.com/).

## Cloudflare Turnstile

We use **Cloudflare Turnstile** to confirm users are real and to block unwanted bots without slowing down the experience. Please be sure to follow these [Webview configurations](https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/#webview-configurations), [update the allowed origins](https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/#update-allowed-origins) to include `challenges.cloudflare.com, about:blank, about:srcdoc`, and enable `https` and `http` connections.

If you use the `react-native-webview` package, update your **WebView** `originWhitelist` to `originWhitelist={['https://*', 'http://*', 'about:blank', 'about:srcdoc']}`.

If you use Flutter, Turnstile is [compatible and tested](https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/#use-flutter-with-turnstile) with Flutter’s **WebView** implementation.
