---
sidebar_position: 60
---

# Error handling

### `isErrorWithCode(value)`

TypeScript helper to check if the passed parameter is an instance of `Error` which has the `code` property. All errors thrown by this library have the `code` property, which contains a value from [`statusCodes`](#status-codes) or some other string for the less-usual errors.

`isErrorWithCode` can be used to avoid `as` casting when you want to access the `code` property on errors returned by the module.

```ts
import {
  isErrorWithCode,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

try {
  const userInfo = await GoogleSignin.signIn();
  // do something with userInfo
} catch (error) {
  if (isErrorWithCode(error)) {
    // here you can safely read `error.code` and TypeScript will know that it has a value
  } else {
    // this error does not have a `code`, and does not come from the Google Sign in module
  }
}
```

### Status Codes

```ts
import { statusCodes } from '@react-native-google-signin/google-signin';
```

Status codes are useful when determining which kind of error has occurred during the sign-in process. Under the hood, these constants are derived from native GoogleSignIn error codes and are platform-specific. Always compare `error.code` to `statusCodes.*` and do not rely on the raw value of `error.code`.

See [example usage](original#signin).

| Name                          | Description                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SIGN_IN_CANCELLED`           | When user cancels the sign in flow. On the Web, this is also returned while [cooldown period](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown) is active. Detecting the cooldown period itself is not possible on the Web for user privacy reasons. On Android, it can be detected via `ONE_TAP_START_FAILED`.                          |
| `IN_PROGRESS`                 | Trying to invoke another operation (e.g. `signInSilently`) when previous one has not yet finished. If you call e.g. `signInSilently` twice, two calls to `signInSilently` in the native module will be done. The promise from the first call to `signInSilently` will be rejected with this error, and the second will resolve / reject with the result of the native call. |
| `SIGN_IN_REQUIRED`            | Useful for use with `signInSilently()` - no user has signed in yet. This error does not happen with one-tap sign in (instead see `NO_SAVED_CREDENTIAL_FOUND`).                                                                                                                                                                                                              |
| `PLAY_SERVICES_NOT_AVAILABLE` | Play services are not available or outdated. This happens on Android, or on the Web when you're calling the exposed APIs [before the Client library is loaded](setting-up/web).                                                                                                                                                                                             |

### Status codes specific to One-tap sign in

| Name                        | Description                                                                                                                                                                                                                                                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ONE_TAP_START_FAILED`      | Thrown only on Android or Web when the One-tap sign in UI cannot be presented. On Android, this happens during the [cooldown period](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown). You can still call `presentExplicitSignIn` on Android or render `WebGoogleSigninButton` on Web as a fallback. |
| `NO_SAVED_CREDENTIAL_FOUND` | Android and Apple only (Web shows the one-tap UI instead). Thrown when no user signed in to your app yet. To recover from this error, proceed to calling [`createAccount`](one-tap#createaccount).                                                                                                                                       |

See [example usage](one-tap#signin).
