---
sidebar_position: 50
---

# Testing

## Setting up the mock

If you want to write JS-level tests that depend on Google Sign In, you need to mock the functionality of the native module - this is because the native code cannot run in Node.js environment.

This library ships with a Jest mock that you can add to the `setupFiles` array in your Jest config.

By default, the mock behaves as if the calls were successful and returns mock user data.

```json title="jest.config.js|ts|mjs|cjs|json"
{
  "setupFiles": [
    "./node_modules/@react-native-google-signin/google-signin/jest/build/jest/setup.js"
  ]
}
```

## Writing tests

You can use [`@testing-library/react-native`](https://callstack.github.io/react-native-testing-library/) to write tests for React components that use React Native Google Sign In. Minimal example (make sure to [set up the mock](#setting-up-the-mock) first):

```jsx title="App.test.js"
import {
  GoogleOneTapSignIn,
  OneTapResponse,
} from '@react-native-google-signin/google-signin';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button, Text } from 'react-native';
import { useState } from 'react';

function GoogleSignInComponent() {
  const [userInfo, setUserInfo] = useState<OneTapResponse | undefined>();

  return (
    <>
      <Button
        title="Sign in with Google"
        onPress={async () => {
          GoogleOneTapSignIn.configure({
            webClientId: 'autoDetect',
          });
          const userInfo = await GoogleOneTapSignIn.signIn();
          setUserInfo(userInfo);
        }}
      />
      {userInfo && <Text>{userInfo.data?.user.name}</Text>}
    </>
  );
}

it('GoogleSignInComponent should display user name after signing in', async () => {
  // Render the component
  render(<GoogleSignInComponent />);

  const expectedUserName = 'mockFullName';
  // Verify user name is not displayed initially
  expect(screen.queryByText(expectedUserName)).toBeNull();

  // Find and press the sign-in button
  const signInButton = screen.getByText('Sign in with Google');
  fireEvent.press(signInButton);

  // verify the user name is displayed
  const userName = await screen.findByText(expectedUserName);
  expect(userName).toBeTruthy();
});
```
