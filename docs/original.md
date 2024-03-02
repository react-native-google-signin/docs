---
sidebar_position: 40
---

# Original Google sign in

This module exposes the [Google Sign-In for Android (legacy)](https://developers.google.com/identity/sign-in/android/start-integrating) and [Google Sign-In for iOS](https://developers.google.com/identity/sign-in/ios/start) SDKs.

:::info
Please note this documentation is for the latest version of the module which is [only available to sponsors ❤️](install). If you're not a sponsor, read the [docs here](https://github.com/react-native-google-signin/google-signin).
:::

```ts
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
```

### `configure`

signature: (`options`: [`ConfigureParams`](api#configureparams)) => `void`

It is mandatory to call this method before attempting to call `signIn()` and `signInSilently()`. This method is sync meaning you can call `signIn` / `signInSilently` right after it. In typical scenarios, `configure` needs to be called only once, after your app starts. In the native layer, this is a synchronous call. All parameters are optional.

Example usage with default options: you'll get user email and basic profile info.

```js
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure();
```

An example with all options enumerated:

```ts
GoogleSignin.configure({
  webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
```

\* [forceCodeForRefreshToken docs](https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder#public-googlesigninoptions.builder-requestserverauthcode-string-serverclientid,-boolean-forcecodeforrefreshtoken)

### `signIn`

signature: (`options`: [`SignInParams`](api#signinparams)) => `Promise`\<[`User`](api#user)\>

Prompts a modal to let the user sign in into your application. Resolved promise returns an [`userInfo` object](api#user). Rejects with error otherwise.

```js
// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Somewhere in your code
_signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    setState({ userInfo, error: undefined });
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // play services not available or outdated
          break;
        default:
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  }
};
```

### `addScopes`

signature: (`options`: [`AddScopesParams`](api#addscopesparams)) => `Promise`\<[`User`](api#user) \| `null`\>

This method resolves with user object or with `null` if no user is currently logged in.

You may not need this call: you can supply required scopes to the `configure` call. However, if you want to gain access to more scopes later, use this call.

Example:

```js
const user = await GoogleSignin.addScopes({
  scopes: ['https://www.googleapis.com/auth/user.gender.read'],
});
```

### `signInSilently`

signature: () => `Promise`\<[`User`](api#user)\>

May be called e.g. after of your main component mounts. This method returns a `Promise` that resolves with the current user and rejects with an error otherwise.

To see how to handle errors read [`signIn()` method](#signin)

```ts
const getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
    } else {
      // some other error
    }
  }
};
```

### `hasPreviousSignIn`

signature: () => `boolean`

This synchronous method may be used to find out whether some user previously signed in.

Note that `hasPreviousSignIn()` can return `true` but `getCurrentUser()` can return `null`, in which case you can call `signInSilently()` to recover the user.
However, it may happen that calling `signInSilently()` rejects with an error (e.g. due to a network issue).

```js
const hasPreviousSignIn = async () => {
  const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
  setState({ hasPreviousSignIn });
};
```

### `getCurrentUser`

signature: () => [`User`](api#user) \| `null`

This is a synchronous method that returns `null` or `userInfo` object of the currently signed-in user.

```js
const getCurrentUser = async () => {
  const currentUser = GoogleSignin.getCurrentUser();
  setState({ currentUser });
};
```

### `clearCachedAccessToken`

signature: (`accessTokenString`: `string`) => `Promise`\<`null`\>

This method only has an effect on Android. You may run into a `401 Unauthorized` error when a token is invalid. Call this method to remove the token from local cache and then call `getTokens()` to get fresh tokens. Calling this method on iOS does nothing and always resolves. This is because on iOS, `getTokens()` always returns valid tokens, refreshing them first if they have expired or are about to expire (see [docs](https://developers.google.com/identity/sign-in/ios/reference/Classes/GIDGoogleUser#-refreshtokensifneededwithcompletion:)).

### `getTokens`

signature: () => `Promise`\<[`GetTokensResponse`](api#gettokensresponse)\>

Resolves with an object containing `{ idToken: string, accessToken: string, }` or rejects with an error. Note that using `accessToken` for identity assertion on your backend server is [discouraged](https://developers.google.com/identity/sign-in/android/migration-guide).

### `signOut`

signature: () => `Promise`\<`null`\>

Signs out the current user.

```js
const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
```

### `revokeAccess`

signature: () => `Promise`\<`null`\>

Removes your application from the user authorized applications. Read more about it [here](https://developers.google.com/identity/sign-in/ios/disconnect#objective-c) and [here](<https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInClient#revokeAccess()>).

```js
const revokeAccess = async () => {
  try {
    await GoogleSignin.revokeAccess();
    // Google Account disconnected from your app.
    // Perform clean-up actions, such as deleting data associated with the disconnected account.
  } catch (error) {
    console.error(error);
  }
};
```

### `hasPlayServices`

signature: (`options`: [`HasPlayServicesParams`](api#hasplayservicesparams)) => `Promise`\<`boolean`\>

Checks if device has Google Play Services installed. Always resolves to true on iOS.

Presence of up-to-date Google Play Services is required to show the sign in modal, but it is _not_ required to perform calls to `configure` and `signInSilently`. Therefore, we recommend to call `hasPlayServices` directly before `signIn`.

```js
try {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // google services are available
} catch (err) {
  console.error('play services are not available');
}
```

`hasPlayServices` accepts one parameter, an object which contains a single key: `showPlayServicesUpdateDialog` (defaults to `true`). When `showPlayServicesUpdateDialog` is set to true the library will prompt the user to take action to solve the issue, as seen in the figure below.

You may also use this call at any time to find out if Google Play Services are available and react to the result as necessary.

![prompt install](/img/prompt-install.png)

## Notes

Calling the methods exposed by this package may involve remote network calls and you should thus take into account that such calls may take a long time to complete (e.g. in case of poor network connection).

**idToken Note**: idToken is not null only if you specify a valid `webClientId`. `webClientId` corresponds to your server clientID on the developers console. It **HAS TO BE** of type **WEB**

Read [iOS documentation](https://developers.google.com/identity/sign-in/ios/backend-auth) and [Android documentation](https://developers.google.com/identity/sign-in/android/backend-auth) for more information

**serverAuthCode Note**: serverAuthCode is not null only if you specify a valid `webClientId` and set `offlineAccess` to true. Once you get the auth code, you can send it to your backend server and exchange the code for an access token. Only with this freshly acquired token can you access user data.

Read [iOS documentation](https://developers.google.com/identity/sign-in/ios/offline-access) and [Android documentation](https://developers.google.com/identity/sign-in/android/offline-access) for more information.

## Additional scopes

The default requested scopes are `email` and `profile`.

If you want to manage other data from your application (for example access user agenda or upload a file to drive) you need to request additional permissions. This can be accomplished by adding the necessary scopes when configuring the GoogleSignin instance.

Please visit https://developers.google.com/identity/protocols/googlescopes or https://developers.google.com/oauthplayground/ for a list of available scopes.
