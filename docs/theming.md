---
sidebar_position: 10
---

# Theming

Topper supports both `light` and `dark` themes.

The default is the dark theme, but you can easily switch by adding `&theme=light` to the URL, such as `https://app.topperpay.com/?bt=<bootstrap token>&theme=light`.

**Using the [Web SDK](./web-sdk.md):**

```js
const topper = new TopperWebSdk({ theme: TOPPER_THEMES.LIGHT });

topper.initialize({ bootstrapToken: <bootstrap token> });
```
