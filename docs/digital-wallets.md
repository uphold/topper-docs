# Digital wallets

**Does Topper support Apple and Google Pay?**

Yes.

**What are the benefits of using Apple and Google Pay?**

These payment options offer a seamless and convenient way for your customers to complete transactions. Generally, users tend to prefer Apple or Google Pay over other payment methods when presented with the choice.

## Cross-platform support

### Web

| Browser | Scenario | Apple Pay | Google Pay |
|:-------:|:--------:|:---------:|:----------:|
| Chrome (and others) | Desktop |    ❌     |     ✅     |
| Chrome (and others) | Mobile |    ❌     |     ✅     |
| Chrome (and others) | Embed with an iframe - Desktop |    ❌     |     ✅     |
| Chrome (and others) | Embed with an iframe - Mobile |    ❌     |     ✅     |
| Safari | Desktop |    ✅     |     ✅     |
| Safari | Mobile |    ✅     |     ✅     |
| Safari | Embed with an iframe - Desktop | ✅ |     ✅     |
| Safari | Embed with an iframe - Mobile | ✅ |     ✅     |

**Notes:**
- Set `allow="payment"` on the `iframe` when Topper is embed.
- If you are using the `sandbox` attribute on the `iframe`, include `allow-top-navigation`. On *Safari - Embed with an iframe scenario* and using Apple Pay, users are redirected on the main window to continue the payment on Topper.

### Electron

|  Apple Pay | Google Pay |
|:----------:|:----------:|
|     ❌      |     ✅     |

**Notes:**
- When using Google Pay, a browser tab will be open to continue the payment on Topper.

### Mobile App

|    OS    | Apple Pay | Google Pay |
|:-------:|:---------:|:----------:|
| Android |     ❌     |     ✅     |
|   iOS   |     ✅     |     ✅     |

**Notes:**
- If you are redirecting to Topper through the user's browser, no extra configuration is necessary.
- When Topper is embed with a `WebView`, ensure setting `is_android_app=1` or `is_ios_app=1` as a query parameter in the URL.

**Example URLs:**
- Android: `https://app.topperpay.com/?bt=XXXX&is_android_app=1`
- iOS: `https://app.topperpay.com/?bt=XXXX&is_ios_app=1`