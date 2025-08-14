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

Without using the [Web SDK](./web-sdk.md) you can listen to events like:

```js
window.addEventListener('message', handleMessageFn);
```

or on React Native using `react-native-webview`: 

```js
<WebView onMessage={handleMessageFn} />
```

Event names and payloads are exposed through `event.data` in a web browser and `event.nativeEvent.data` in React Native.

See the full list of events [here](https://github.com/uphold/topper-web-sdk/blob/master/src/enums/events.ts).