---
sidebar_position: 11
---

# Single Sign-On

**Does Topper support Apple and Google Single Sign-On?**

Yes.

**What are the benefits of using Single Sign-On?**

Single Sign-On (SSO) is a secure authentication system that reduces the burden of login for the users, by enabling them to sign in with their Apple or Google account.

This creates a better experience for users because they can use their existing credentials to authenticate and don't have to enter credentials and validation codes.

## Cross-platform support

### Web

|       Browser       | Scenario | Apple SSO | Google SSO |
| :-----------------: | :------: | :-------: | :--------: |
| Chrome (and others) | Desktop  |    ✅     |     ✅     |
| Chrome (and others) |  Mobile  |    ✅     |     ✅     |

### Electron

| Apple SSO | Google SSO |
| :-------: | :--------: |
|    ❌     |     ❌     |

### Mobile App

|   OS    |        Scenario        | Apple SSO | Google SSO |
| :-----: | :--------------------: | :-------: | ---------- |
| Android |        Webview         |    ❌     | ❌         |
|   iOS   |        Webview         |    ✅     | ❌         |
| Android | Webview with an iframe |    ❌     | ❌         |
|   iOS   | Webview with an iframe |    ❌     | ❌         |

**Notes:**

- If you are redirecting to Topper through the user's browser, no extra configuration is necessary.
- When Topper is embed with a `WebView`, ensure setting `is_android_webview=1` or `is_ios_webview=1` as a query parameter in the URL.


:::caution Deprecated Parameters
The parameters `is_ios_app` and `is_android_app` are now renamed to `is_ios_webview` and `is_android_webview`.

Legacy parameters are still supported but **deprecated**.

Please migrate to the new parameter names to ensure future compatibility.
:::

**Example URLs:**

- Android: `https://app.topperpay.com/?bt=<bootstrap token>&is_android_webview=1`
- iOS: `https://app.topperpay.com/?bt=<bootstrap token>&is_ios_webview=1`

**Using the [Web SDK](./web-sdk.md):**

- Android: `topper.initialize({ bootstrapToken: <bootstrap token>, { is_android_webview: true } });`
- iOS: `topper.initialize({ bootstrapToken: <bootstrap token>, { is_ios_webview: true } });`
