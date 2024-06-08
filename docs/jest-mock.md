---
sidebar_position: 55
---

# Jest module mock

If you use Jest for testing, you may need to mock the functionality of the native module. This library ships with a Jest mock that you can add to the `setupFiles` array in your Jest config.

By default, the mock behaves as if the calls were successful and returns mock user data.

```json title="jest.config.js|ts|mjs|cjs|json"
{
  "setupFiles": [
    "./node_modules/@react-native-google-signin/google-signin/jest/build/jest/setup.js"
  ]
}
```
