---
sidebar_position: 9
---

# Locale

**What are the languages supported by Topper?**

Topper supports English and Brazilian Portuguese.

**How to set a specific locale?**

Without any param passed, the widget will try to infer the user locale from the browser and if the browser locale is not supported it will default to English.

You can override that behavior by adding `&locale=en` to the URL and force a specific locale from the supported ones, such as `https://app.topperpay.com/?bt=<bootstrap token>&locale=pt`. The supported values are `en` and `pt`.

After the user authenticates within Topper, the locale will be set accordingly with the user preferences.

**Using the [Web SDK](./web-sdk.md):**

```js
const topper = new TopperWebSdk({ locale: TOPPER_LOCALES.PT });

topper.initialize({ bootstrapToken: <bootstrap token> });
```
