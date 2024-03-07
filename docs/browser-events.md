---
sidebar_position: 6
---

# Browser events

You can receive updates on the user's session after initializing Topper like:

```js
// Generate a bootstrap token.
const bootstrapToken = await generateBootstrapToken();

// Open Topper using the bootstrap token.
const topper = new TopperWebSdk();

topper.initialize({ bootstrapToken });

// Listen to a single event.
topper.on(TOPPER_EVENTS.ORDER_PLACED, ({ data }) => {});

// Listen to all events.
topper.on(TOPPER_EVENTS.ALL, ({ data, name }) => {});
```
