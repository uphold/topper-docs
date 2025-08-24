---
sidebar_position: 2
---

# Apple and Google Pay

## Cross-platform support

### Web

| Browser | Scenario | Apple Pay | Google Pay |
|:-------:|:--------:|:---------:|:----------:|
| Chrome (and others) | Desktop | ❌ | ✅ |
| Chrome (and others) | Mobile | ❌ | ✅ |
| Chrome (and others) | Embed with an iframe - Desktop | ❌ | ✅ |
| Chrome (and others) | Embed with an iframe - Mobile | ❌ | ✅ |
| Safari | Desktop | ✅ | ✅ |
| Safari | Mobile | ✅ | ✅ |
| Safari | Embed with an iframe - Desktop | ✅ | ✅ |
| Safari | Embed with an iframe - Mobile | ✅ | ✅ |

**Notes:**
- Set `allow="payment"` on the `iframe` when Topper is embed.
- If you are using the `sandbox` attribute on the `iframe`, include `allow-top-navigation`. On *Safari - Embed with an iframe scenario* and using Apple Pay, users are redirected on the main window to continue the payment on Topper.

### Electron

| Apple Pay | Google Pay |
|:----------:|:----------:|
| ❌ | ✅ |

**Notes:**
- When using Google Pay, a browser tab will be open to continue the payment on Topper.

### Mobile App

| OS | Apple Pay | Google Pay |
|:-------:|:---------:|:----------:|
| Android | ❌ | ✅ |
| iOS | ✅ | ✅ |
