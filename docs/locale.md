---
sidebar_position: 10
---

# Locale

**Which languages are supported by Topper?**

Topper supports English, Brazilian Portuguese and Spanish.

**How to set a specific locale?**

By default, Topper will use the locale set on the user's browser. If that locale is not supported it will default to English.

To set a specific locale, you can set it as query parameter such as: `https://app.topperpay.com/?bt=<bootstrap token>&locale=en`. The supported values are `en`, `en-US`, `pt`, `pt-BR`, `es` and `es-ES`.

When the user authenticates in Topper, the locale will be set accordingly to the user preferences.

**Using the [Web SDK](./web-sdk.md):**

```js
const topper = new TopperWebSdk({ locale: TOPPER_LOCALES.PT });

topper.initialize({ bootstrapToken: <bootstrap token> });
```
