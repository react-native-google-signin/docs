---
sidebar_position: 60
description: 'Error handling guide. Covers isErrorWithCode helper, error codes (SIGN_IN_CANCELLED, NO_SAVED_CREDENTIAL_FOUND, PLAY_SERVICES_NOT_AVAILABLE, etc.), and best practices.'
---

# Error handling

When catching and handling errors thrown by the library, it's strongly recommended not to immediately present them using the [`Alert` module](https://reactnative.dev/docs/alert). This is because on Android, when transitioning from the Google Sign-In flow to your app, the current [Activity](https://developer.android.com/reference/android/app/Activity) may be `null` which would cause the alert call to be a noop. You can work around this by presenting the alert after a delay, or handling the error differently.

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

Status codes are useful when determining which kind of error has occurred during the sign-in process. Under the hood, these constants are derived from native error codes and are platform-specific. Always compare `error.code` to `statusCodes.*` and do not rely on the raw value of `error.code`.

See [example usage](one-tap#signin).

| Name                          | Description                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IN_PROGRESS`                 | Trying to invoke another operation (e.g. `signInSilently`) when previous one has not yet finished. If you call e.g. `signInSilently` twice, two calls to `signInSilently` in the native module are done. The promise from the first call to `signInSilently` will be rejected with this error, and the second will resolve / reject with the result of the native call. |
| `PLAY_SERVICES_NOT_AVAILABLE` | Play services are not available or outdated. This happens on Android, or on the web when you're calling the exposed APIs [before the Client library is loaded](setting-up/web).                                                                                                                                                                                         |
| `NULL_PRESENTER`              | Happens in the unlikely situation when the `Activity` (on Android) or `UIViewController` (on iOS) for presenting the sign in UI isn't available.                                                                                                                                                                                                                        |

See [example usage](one-tap#signin).
