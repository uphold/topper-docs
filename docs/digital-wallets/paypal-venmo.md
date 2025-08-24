---
sidebar_position: 3
---

# PayPal and Venmo

PayPal works in **every scenario** with **no extra configuration** required.

## Cross-platform support

### Web

| Browser | Scenario | Venmo |
|:--------:|:--------:|:-----:|
| Chrome (and others) | Desktop | ✅ |
| Chrome (and others) | Desktop - Embed with an iframe | ✅ |
| Chrome (and others) | iOS Mobile | ❌ |
| Chrome (and others) | iOS Mobile - Embed with an iframe | ❌ |
| Safari | Desktop | ✅ |
| Safari | Desktop - Embed with an iframe | ✅ |
| Safari | iOS Mobile | ✅ |
| Safari | iOS Mobile - Embed with an iframe | ✅ |
| Chrome | Android Mobile | ✅ |
| Chrome | Android Mobile - Embed with an iframe | ✅  |
| Other browsers | Android Mobile | ❌ |
| Other browsers | Android Mobile - Embed with an iframe | ❌ |

**Notes:**
When not supported, the payment method will be marked as unavailable on the payment method selection screen.

### Electron

The user is redirected to a new browser tab to continue the payment on Topper.

### Mobile App

| OS | Scenario | Venmo |
|:-------:|:---------:|:----------:|
| Android | WebView | ✅ |
| Android | Embed with an iframe * | ✅ |
| iOS | WebView | ✅ |
| iOS | WebView - embed with an iframe * | ✅ |
| iOS | Safari View Controller | ✅ |
| iOS | Safari View Controller - embed with an iframe * | ✅ |

**Notes:**
On the scenarios marked with *, the user is redirected to a new browser tab to continue the payment on Topper.
