---
id: 'index'
title: 'Module API'
sidebar_label: 'Reference'
custom_edit_url: null
displayed_sidebar: apiSidebar
---

## Constants

### statusCodes

Read more about the status codes [here](errors).

• `Const` **statusCodes**: `Readonly`\<\{ `IN_PROGRESS`: `string` ; `NO_SAVED_CREDENTIAL_FOUND`: `string` ; `ONE_TAP_START_FAILED`: `string` ; `PLAY_SERVICES_NOT_AVAILABLE`: `string` ; `SIGN_IN_CANCELLED`: `string` ; `SIGN_IN_REQUIRED`: `string` }\>

## Functions

### isErrorWithCode

▸ **isErrorWithCode**(`error`): error is NativeModuleError

TypeScript helper to check if an object has the `code` property.
This is used to avoid `as` casting when you access the `code` property on errors returned by the module.

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `error` | `any` |

#### Returns

error is NativeModuleError

## One-tap sign in module

### OneTapSignInParams

Ƭ **OneTapSignInParams**: `Object`

| Name                          | Type      | Description                                                                                                                                                                                                                           |
| ----------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `webClientId`                 | `string`  | The web client ID obtained from Google Cloud console.                                                                                                                                                                                 |
| `iosClientId?`                | `string`  | The iOS client ID obtained from Google Cloud console. Provide this if you're not using the config file from Firebase.                                                                                                                 |
| `nonce?`                      | `string`  | Optional. random string used by the ID token to prevent replay attacks.                                                                                                                                                               |
| `autoSignIn?`                 | `boolean` | Optional. If true, enables auto sign-in.                                                                                                                                                                                              |
| `filterByAuthorizedAccounts?` | `boolean` | Optional. [Filters by authorized accounts](<https://developers.google.com/android/reference/com/google/android/gms/auth/api/identity/BeginSignInRequest.GoogleIdTokenRequestOptions.Builder#setFilterByAuthorizedAccounts(boolean)>). |

The following are available on the Web. [Read the value descriptions here](https://developers.google.com/identity/gsi/web/reference/js-reference).

| Name                                  | Type                                | Description |
| ------------------------------------- | ----------------------------------- | ----------- |
| `login_uri?`                          | `string`                            |             |
| `native_callback?`                    | `() => void`                        |             |
| `cancel_on_tap_outside?`              | `boolean`                           |             |
| `prompt_parent_id?`                   | `string`                            |             |
| `context?`                            | `"signin"` \| `"signup"` \| `"use"` |             |
| `state_cookie_domain?`                | `string`                            |             |
| `ux_mode?`                            | `"popup"` \| `"redirect"`           |             |
| `allowed_parent_origin?`              | `string` \| `string[]`              |             |
| `intermediate_iframe_close_callback?` | `() => void`                        |             |
| `itp_support?`                        | `boolean`                           |             |
| `log_level?`                          | `"debug"` \| `"info"` \| `"warn"`   |             |

---

### OneTapUser

Ƭ **OneTapUser**: `Object`

| Name               | Type                                                                                                                                       | Description                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `user`             |                                                                                                                                            | The signed-in user object.                                            |
| `user.id`          | `string`                                                                                                                                   | The unique identifier of the user.                                    |
| `user.email`       | `string` \| `null`                                                                                                                         | The email of the user, if available.                                  |
| `user.name`        | `string` \| `null`                                                                                                                         | The full name of the user, if available.                              |
| `user.givenName`   | `string` \| `null`                                                                                                                         | The given name (first name) of the user, if available.                |
| `user.familyName`  | `string` \| `null`                                                                                                                         | The family name (last name) of the user, if available.                |
| `user.photo`       | `string` \| `null`                                                                                                                         | The URL to the user's photo, if available.                            |
| `idToken`          | `string`                                                                                                                                   | The ID token for the user.                                            |
| `credentialOrigin` | `"auto"` \| `"user"` \| `"user_1tap"` \| `"user_2tap"` \| `"btn"` \| `"btn_confirm"` \| `"btn_add_session"` \| `"btn_confirm_add_session"` | The origin of the credential selection. Always 'user' in native apps. |

---

### GoogleOneTapSignIn

• `Const` **GoogleOneTapSignIn**: `Object`

The entry point of the One-tap Sign In API, exposed as `GoogleOneTapSignIn`. On Android, this module uses the [Android Credential Manager](https://developers.google.com/identity/android-credential-manager) under the hood.

On the web, don't call `signIn` / `createAccount` and use the `WebGoogleOneTapSignIn.signIn` instead. The `signOut` method is available on all platforms.

#### Type declaration

| Name            | Type                                                                                                |
| :-------------- | :-------------------------------------------------------------------------------------------------- |
| `createAccount` | (`params`: [`OneTapSignInParams`](#onetapsigninparams)) => `Promise`\<[`OneTapUser`](#onetapuser)\> |
| `signIn`        | (`params`: [`OneTapSignInParams`](#onetapsigninparams)) => `Promise`\<[`OneTapUser`](#onetapuser)\> |
| `signOut`       | (`emailOrUniqueId`: `string`) => `Promise`\<`null`\>                                                |

---

## Web One-tap sign in module

This is a wrapper for the [Sign In with Google for Web](https://developers.google.com/identity/gsi/web), supporting both the [One-tap](https://developers.google.com/identity/gsi/web/guides/offerings#one_tap) flow and the [Google Sign-In button](https://developers.google.com/identity/gsi/web/guides/offerings#sign_in_with_google_button).

### WebGoogleOneTapSignIn

• `Const` **WebGoogleOneTapSignIn**: `Object`

On the web, call `WebGoogleOneTapSignIn.signIn` on page load or other window events, not as a response to a user interaction.

That sets up a listener for authentication events and calls the appropriate callbacks.

On other platforms, it calls the `onError` callback with a `SIGN_IN_CANCELLED` error.

#### Type declaration

| Name     | Type                                                                                                                                    |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `signIn` | (`params`: [`OneTapSignInParams`](#onetapsigninparams), `callbacks`: [`WebOneTapSignInCallbacks`](#webonetapsignincallbacks)) => `void` |

### WebOneTapSignInCallbacks

Ƭ **WebOneTapSignInCallbacks**: `Object`

#### Type declaration

| Name              | Type                                                                       | Description                                                                                                                                                                                                                                                                                                  |
| :---------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `momentListener?` | `MomentListener`                                                           | A callback function that is called when important events take place. See [reference](https://developers.google.com/identity/gsi/web/reference/js-reference#PromptMomentNotification).                                                                                                                        |
| `onError`         | (`error`: `NativeModuleError`) => `void` \| `Promise`\<`void`\>            | Called when the user cancels the sign-in flow, or when an error occurs. You can use the `code` property of the error to determine the reason for the error. The reported errors on the web are in the same format as the errors reported on the native platforms, so you can reuse your error handling code. |
| `onSuccess`       | (`userInfo`: [`OneTapUser`](#onetapuser)) => `void` \| `Promise`\<`void`\> | Called when the user successfully signs in, either using the One-tap flow or the button flow.                                                                                                                                                                                                                |

---

## Original Google sign in

### AddScopesParams

Ƭ **AddScopesParams**: `Object`

#### Type declaration

| Name     | Type       | Description                                                               |
| :------- | :--------- | :------------------------------------------------------------------------ |
| `scopes` | `string`[] | The Google API scopes to request access to. Default is email and profile. |

---

### ConfigureParams

Ƭ **ConfigureParams**: `Object`

#### Type declaration

| Name                        | Type       | Description                                                                                                                                             |
| :-------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `webClientId?`              | `string`   | Web client ID from Developer Console. Required to get the `idToken` on the user object, and for offline access.                                         |
| `accountName?`              | `string`   | ANDROID ONLY. An account name that should be prioritized.                                                                                               |
| `forceCodeForRefreshToken?` | `boolean`  | ANDROID ONLY. If true, the granted server auth code can be exchanged for an access token and a refresh token.                                           |
| `hostedDomain?`             | `string`   | Specifies a hosted domain restriction                                                                                                                   |
| `offlineAccess?`            | `boolean`  | Must be true if you wish to access user APIs on behalf of the user from your own server                                                                 |
| `openIdRealm?`              | `string`   | iOS ONLY The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.           |
| `profileImageSize?`         | `number`   | iOS ONLY The desired height (and width) of the profile image. Defaults to 120px                                                                         |
| `scopes?`                   | `string`[] | The Google API scopes to request access to. Default is email and profile.                                                                               |
| `googleServicePlistPath?`   | `string`   | If you want to specify a different bundle path name for the GoogleService-Info, e.g. 'GoogleService-Info-Staging'. Mutualy exclusive with `iosClientId` |
| `iosClientId?`              | `string`   | If you want to specify the client ID of type iOS. Mutualy exclusive with `googleServicePlistPath`.                                                      |

---

### GetTokensResponse

Ƭ **GetTokensResponse**: `Object`

#### Type declaration

| Name          | Type     |
| :------------ | :------- |
| `accessToken` | `string` |
| `idToken`     | `string` |

---

### HasPlayServicesParams

Ƭ **HasPlayServicesParams**: `Object`

#### Type declaration

| Name                           | Type      | Description                                                                                                                |
| :----------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------- |
| `showPlayServicesUpdateDialog` | `boolean` | Optional. Whether to show a dialog that promps the user to install Google Play Services, if they don't have them installed |

---

### SignInParams

Ƭ **SignInParams**: `Object`

#### Type declaration

| Name         | Type     | Description                                                                                                                                                                                                                             |
| :----------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loginHint?` | `string` | iOS only. The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd) |

---

### User

Ƭ **User**: `Object`

#### Type declaration

| Name              | Type                                                                                                                                                                    | Description                                                                                |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `idToken`         | `string` \| `null`                                                                                                                                                      | JWT (JSON Web Token) that serves as a secure credential for your user's identity.          |
| `scopes`          | `string`[]                                                                                                                                                              | -                                                                                          |
| `serverAuthCode`  | `string` \| `null`                                                                                                                                                      | Not null only if a valid webClientId and offlineAccess: true was specified in configure(). |
| `user`            | \{ `email`: `string` ; `familyName`: `string` \| `null` ; `givenName`: `string` \| `null` ; `id`: `string` ; `name`: `string` \| `null` ; `photo`: `string` \| `null` } | -                                                                                          |
| `user.email`      | `string`                                                                                                                                                                | -                                                                                          |
| `user.familyName` | `string` \| `null`                                                                                                                                                      | -                                                                                          |
| `user.givenName`  | `string` \| `null`                                                                                                                                                      | -                                                                                          |
| `user.id`         | `string`                                                                                                                                                                | -                                                                                          |
| `user.name`       | `string` \| `null`                                                                                                                                                      | -                                                                                          |
| `user.photo`      | `string` \| `null`                                                                                                                                                      | -                                                                                          |

---

### GoogleSignin

• `Const` **GoogleSignin**: `Object`

The entry point of the Google Sign In API, exposed as `GoogleSignin`.

#### Type declaration

| Name                     | Type                                                                                         |
| :----------------------- | :------------------------------------------------------------------------------------------- |
| `addScopes`              | (`options`: [`AddScopesParams`](#addscopesparams)) => `Promise`\<[`User`](#user) \| `null`\> |
| `clearCachedAccessToken` | (`tokenString`: `string`) => `Promise`\<`null`\>                                             |
| `configure`              | (`options`: [`ConfigureParams`](#configureparams)) => `void`                                 |
| `getCurrentUser`         | () => [`User`](#user) \| `null`                                                              |
| `getTokens`              | () => `Promise`\<[`GetTokensResponse`](#gettokensresponse)\>                                 |
| `hasPlayServices`        | (`options`: [`HasPlayServicesParams`](#hasplayservicesparams)) => `Promise`\<`boolean`\>     |
| `hasPreviousSignIn`      | () => `boolean`                                                                              |
| `revokeAccess`           | () => `Promise`\<`null`\>                                                                    |
| `signIn`                 | (`options`: [`SignInParams`](#signinparams)) => `Promise`\<[`User`](#user)\>                 |
| `signInSilently`         | () => `Promise`\<[`User`](#user)\>                                                           |
| `signOut`                | () => `Promise`\<`null`\>                                                                    |

## React Components

• **GoogleSigninButton**: `Object`

### GoogleSigninButtonProps

Ƭ **GoogleSigninButtonProps**: `Object`

#### Type declaration

Also inherits [ViewProps](https://reactnative.dev/docs/view#props).

| Name        | Type                  |
| :---------- | :-------------------- |
| `color?`    | `"dark"` \| `"light"` |
| `disabled?` | `boolean`             |
| `onPress?`  | () => `void`          |
| `size?`     | `number`              |

---

### WebGoogleSignInButtonProps

Ƭ **WebGoogleSignInButtonProps**: `Object`

| Name             | Type                                                                  | Description                                          |
| ---------------- | --------------------------------------------------------------------- | ---------------------------------------------------- |
| `type?`          | `"standard"` \| `"icon"`                                              | Optional. The type of the sign-in button.            |
| `theme?`         | `"outline"` \| `"filled_blue"` \| `"filled_black"`                    | Optional. The theme of the sign-in button.           |
| `size?`          | `"large"` \| `"medium"` \| `"small"`                                  | Optional. The size of the sign-in button.            |
| `text?`          | `"signin_with"` \| `"signup_with"` \| `"continue_with"` \| `"signin"` | Optional. The text to display on the sign-in button. |
| `shape?`         | `"rectangular"` \| `"pill"` \| `"circle"` \| `"square"`               | Optional. The shape of the sign-in button.           |
| `width?`         | `number`                                                              | Optional. The width of the sign-in button.           |
| `locale?`        | `string`                                                              | Optional. The locale for the sign-in button.         |
| `logoAlignment?` | `"left"` \| `"center"`                                                | Optional. The alignment of the logo on the button.   |

---

### GoogleSigninButton

▸ **GoogleSigninButton**(`props`): `Element`

#### Parameters

| Name    | Type                                                  |
| :------ | :---------------------------------------------------- |
| `props` | [`GoogleSigninButtonProps`](#googlesigninbuttonprops) |

#### Returns

`Element`

---

### WebGoogleSigninButton

▸ **WebGoogleSigninButton**(`props`): `Element`

#### Parameters

| Name    | Type                                                        |
| :------ | :---------------------------------------------------------- |
| `props` | [`WebGoogleSignInButtonProps`](#webgooglesigninbuttonprops) |

#### Returns

`Element`
