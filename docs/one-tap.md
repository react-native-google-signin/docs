---
sidebar_position: 30
sidebar_class_name: sponsor-heart
---

# One-tap Google sign in

This is the easiest and recommended way to implement Google Sign In. It is a one-tap sign in flow that requires very little user interaction, thus increasing conversions. It is available on Android, iOS and Web (with a little extra work [described below](#web-support)).

On Android, it is built on top of the [Credential Manager](https://developers.google.com/identity/android-credential-manager).

On the Web, it covers both the [One-tap](https://developers.google.com/identity/gsi/web/guides/offerings#one_tap) flow and the [Google Sign-In button](https://developers.google.com/identity/gsi/web/guides/offerings#sign_in_with_google_button).

On iOS, the provided API is a wrapper of the [iOS Google Sign In SDK](https://developers.google.com/identity/sign-in/ios/start-integrating).

:::tip
Please note this functionality is only available to sponsors️. [It takes just a few clicks to get access](install#accessing-the-private-package-for-sponsors) ❤️.
:::

Note that on iOS and Android, you can combine the one-tap methods with those one from the [Original Google Sign In](original). To do that, use the One-tap sign in to sign in the user. Then call `signInSilently()` and then (for example) `getCurrentUser()` to get the current user's information.

```ts
import {
  GoogleOneTapSignIn,
  statusCodes,
  type OneTapUser,
} from '@react-native-google-signin/google-signin';
```

### `signIn`

signature: (`params`: [`OneTapSignInParams`](api#onetapsigninparams)) => `Promise`\<[`OneTapUser`](api#onetapuser)\>

Attempts to sign in user automatically as explained [here](<https://developers.google.com/android/reference/com/google/android/gms/auth/api/identity/BeginSignInRequest.Builder#setAutoSelectEnabled(boolean)>). On the web, this call rejects - please [read below](#web-support) for web support.

Returns a `Promise` that resolves with an object containing the user data or rejects in case of error. If there is no user that previously signed in, the promise will reject with [`NO_SAVED_CREDENTIAL_FOUND`](http://localhost:3000/docs/errors#one-tap-specific-errors) error. In that case, you can call [`createAccount`](one-tap#createaccount) to start a flow to create a new account.

```ts
import {
  GoogleOneTapSignIn,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Somewhere in your code
signIn = async () => {
  try {
    const userInfo = await GoogleOneTapSignIn.signIn({
      webClientId: config.webClientId,
      iosClientId: config.iosClientId, // only needed if you're not using Firebase config file
      nonce: 'your_nonce',
    });
    setState({ userInfo });
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
          // no saved credential found, try creating an account
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          break;
        case statusCodes.ONE_TAP_START_FAILED:
          // Android and Web only, you probably have hit rate limiting. You can still call the original Google Sign In API in this case.
          break;
        default:
        // something else happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  }
};
```

### `createAccount`

signature: (`params`: [`OneTapSignInParams`](api#onetapsigninparams)) => `Promise`\<[`OneTapUser`](api#onetapuser)\>

Starts a flow to create a user account. It offers a list of user accounts to choose from (When multiple Google accounts are logged in on the device). Also, it can be used if `signIn` rejects with `NO_SAVED_CREDENTIAL_FOUND` error, as shown in the code snippet above.

Returns a `Promise` that resolves with an object containing the user data or rejects in case of error. On the web, this call rejects - please [read below](#web-support) for web support.

```ts
await GoogleOneTapSignIn.createAccount({
  webClientId: config.webClientId,
  nonce: 'your_nonce',
});
```

### `signOut`

signature: (`emailOrUniqueId`: `string`) => `Promise`\<`null`\>

Signs out the current user. On the web, you need to provide the `id` or email of the user. On Android and iOS, this parameter does not have any effect.

Returns a Promise that resolves with `null` or rejects in case of error.

```ts
await GoogleOneTapSignIn.signOut(user.id);
```

## Web support

Providing a unified API for the web is a bit more complex than it may seem. This is because the web experience is quite different from the mobile one, and so are the underlying apis.

The `WebGoogleOneTapSignIn.signIn` function exists to handle the web-specific logic. Its interface is as close as possible to the native one, allowing to reuse the logic for both success and error handling across all platforms.

To implement web support, follow these steps:

1. Call `WebGoogleOneTapSignIn.signIn` upon page load. This will attempt to present the One-tap UI. It also sets up a listener for authentication events and calls the `onSuccess` callback when the user signs in (either with One-tap flow or the Sign-In button).

:::warning
You should display the One Tap UI on page load or other window events, instead of it being displayed by a user action (e.g. a button press). Otherwise, you may get a broken UX. Users may not see any UI after a user action, due to [globally opt-out](https://developers.google.com/identity/gsi/web/guides/features#globally_opt_out), [cool-down](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown), or no Google session.
:::

```ts
useEffect(() => {
  if (Platform.OS === 'web') {
    WebGoogleOneTapSignIn.signIn(
      {
        webClientId: config.webClientId,
      },
      {
        onError: (error: NativeModuleError) => {
          // this might be cancellation, one-tap rate limiting, or other errors
        },
        onSuccess: (userInfo: OneTapUser) => {
          // user has signed in, do something with the user info
        },
        momentListener: (moment) => {
          // optional
        },
      },
    );
  }
}, []);
```

Optionally, you can provide a `momentListener` callback function. The callback is called when important events take place. [See reference.](https://developers.google.com/identity/gsi/web/reference/js-reference#PromptMomentNotification)

2. Render the [`WebGoogleSigninButton`](buttons/web.md) component

One-tap UI may not always be available: This happens if user has [opted out](https://developers.google.com/identity/gsi/web/guides/features#globally_opt_out) or when they cancel the dialog several times in a row, entering the [cooldown period](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown).

`WebGoogleSigninButton` serves as a fallback. Tapping it will open the regular Google Sign-In dialog. When user signs in, the `onSuccess` callback will be called.

:::info
The reason the `WebGoogleOneTapSignIn.signIn` api is callback-based rather than promise-based is that it's possible to get into an "error" state (when one-tap is not available) and then get a successful sign in from the button flow. Because of how the Google Sign In for Web SDK is done, modeling this with a promise-based api is not possible.
:::
