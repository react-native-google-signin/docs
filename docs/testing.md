---
sidebar_position: 50
---

# Testing

## Setting up a mock

If you use Jest for testing, you may need to mock the functionality of the native module - this is because the native code cannot run in Node environment.

This library ships with a Jest mock that you can add to the `setupFiles` array in your Jest config.

By default, the mock behaves as if the calls were successful and returns mock user data.

```json title="jest.config.js|ts|mjs|cjs|json"
{
  "setupFiles": [
    "./node_modules/@react-native-google-signin/google-signin/jest/build/jest/setup.js"
  ]
}
```

[//]: # '### Writing tests'
[//]: #
[//]: # 'You can use [`@testing-library/react-native`](https://callstack.github.io/react-native-testing-library/) to write tests for React components that use React Native Google Sign In.'
