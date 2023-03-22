---
sidebar_position: 5
---

# Events

If the Topper browser session is opened using JavaScript — for example by using `window.open()` — then you can receive updates on the user's session by using the [`postMessage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

```js
// Generate a bootstrap token.
const bootstrapToken = await generateBootstrapToken();

// Open a Topper window using the bootstrap token.
const topperWindow = window.open(`https://app.topperpay.com/?bt=${bootstrapToken}`);

// Add event listeners
topperWindow.addEventListener('message', (event) => {
  // Ignore messages that didn't originate from Topper.
  if (event.origin !== 'https://app.topperpay.com') {
    return;
  }

  // Log the message data.
  console.log(event.data);
});
```

:::note
Browser events have not yet been implemented, but will be available soon. We will release a JavaScript SDK to make it easier to open a Topper browser session and listen to events.
:::
