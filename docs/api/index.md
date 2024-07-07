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

| Name          | Type     | Description                                                                                      |
| ------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `webClientId` | `string` | The web client ID obtained from Google Cloud console. Pass `autoDetect` to detect automatically. |
| `nonce?`      | `string` | Optional. random string used by the ID token to prevent replay attacks.                          |

The following are available for iOS. To obtain extended authorization on Android, call `requestAuthorization`.

| Name                      | Type       | Description                                                                                                                                                            |
| ------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iosClientId?`            | `string`   | The iOS client ID obtained from Google Cloud console. Provide this if you're not using the config file from Firebase. Mutualy exclusive with `googleServicePlistPath`. |
| `googleServicePlistPath?` | `string`   | If you want to specify a different bundle path name for the GoogleService-Info file, e.g. 'GoogleService-Info-Staging'. Mutually exclusive with `iosClientId`.         |
| `scopes?`                 | `string[]` | The Google API scopes to request access to. Default is email and profile.                                                                                              |
| `offlineAccess?`          | `boolean`  | Must be true if you wish to access user APIs on behalf of the user from your own server                                                                                |
| `profileImageSize?`       | `number`   | The desired height (and width) of the profile image. Defaults to 120px                                                                                                 |
| `openIdRealm?`            | `string`   | The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.                                   |

The following are available for the Web. [Read the value descriptions here](https://developers.google.com/identity/gsi/web/reference/js-reference).

| Name                                  | Type                                | Description                                                                                 |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------- |
| `skipPrompt?`                         | `boolean`                           | Do not show the one-tap prompt. Signing in will happen by clicking `WebGoogleSigninButton`. |
| `login_uri?`                          | `string`                            |                                                                                             |
| `native_callback?`                    | `() => void`                        |                                                                                             |
| `cancel_on_tap_outside?`              | `boolean`                           |                                                                                             |
| `prompt_parent_id?`                   | `string`                            |                                                                                             |
| `context?`                            | `"signin"` \| `"signup"` \| `"use"` |                                                                                             |
| `state_cookie_domain?`                | `string`                            |                                                                                             |
| `ux_mode?`                            | `"popup"` \| `"redirect"`           |                                                                                             |
| `allowed_parent_origin?`              | `string` \| `string[]`              |                                                                                             |
| `intermediate_iframe_close_callback?` | `() => void`                        |                                                                                             |
| `itp_support?`                        | `boolean`                           |                                                                                             |
| `log_level?`                          | `"debug"` \| `"info"` \| `"warn"`   |                                                                                             |

---

### OneTapCreateAccountParams

Ƭ **OneTapCreateAccountParams**: `Object` extends [`OneTapSignInParams`](#onetapsigninparams) with:

| Name                          | Type      | Description                                                                                     |
| ----------------------------- | --------- | ----------------------------------------------------------------------------------------------- |
| `accountName?`                | `string`  | iOS only. An account name present on the device that should be used.                            |
| `requestVerifiedPhoneNumber?` | `boolean` | Android only. Whether to request for a verified phone number during sign-ups. False by default. |

---

### RequestAuthorizationParams

Ƭ **RequestAuthorizationParams**: `Object`

#### Type declaration

| Name                         | Type                                                                  | Description                                                                                                                                                                   |
| :--------------------------- | :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scopes`                     | `string`[]                                                            | The Google API scopes to request access to. You can use `["email", "profile"]` as the default value.                                                                          |
| `accountName?`               | `string`                                                              | Specifies an account on the device that should be used.                                                                                                                       |
| `hostedDomain?`              | `string`                                                              | Specifies a hosted domain restriction. By setting this, authorization will be restricted to accounts of the user in the specified domain.                                     |
| `offlineAccess?`             | \{ `forceCodeForRefreshToken?`: `boolean` ; `webClientId`: `string` } | Add this for offline access. The serverAuthCode will be returned in the response.                                                                                             |
| `.forceCodeForRefreshToken?` | `boolean`                                                             | If true, the granted code can be exchanged for an access token and a refresh token. Only use true if your server has suffered some failure and lost the user's refresh token. |
| `.webClientId`               | `string`                                                              | Web client ID from Developer Console.                                                                                                                                         |

---

### AuthorizationResponse

Ƭ **AuthorizationResponse**: `null` \| \{ `accessToken`: `string` ; `grantedScopes`: `string`[] ; `serverAuthCode`: `string` \| `null` }

An object that contains an access token that has access to the `grantedScopes`.
On Android, it contains also the `serverAuthCode` if `offlineAccess` was requested.

`serverAuthCode` is always `null` on iOS. You would get it by calling `createAccount()` with `offlineAccess: true` on iOS.

Is `null` on iOS in case no user is signed in yet.

---

### OneTapUser

Ƭ **OneTapUser**: `Object`

| Name               | Type                                                                                                                                       | Description                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user`             |                                                                                                                                            | The signed-in user object.                                                                                                                                           |
| `user.id`          | `string`                                                                                                                                   | The unique identifier of the user.                                                                                                                                   |
| `user.email`       | `string` \| `null`                                                                                                                         | The email of the user, if available.                                                                                                                                 |
| `user.name`        | `string` \| `null`                                                                                                                         | The full name of the user, if available.                                                                                                                             |
| `user.givenName`   | `string` \| `null`                                                                                                                         | The given name (first name) of the user, if available.                                                                                                               |
| `user.familyName`  | `string` \| `null`                                                                                                                         | The family name (last name) of the user, if available.                                                                                                               |
| `user.photo`       | `string` \| `null`                                                                                                                         | The URL to the user's photo, if available.                                                                                                                           |
| `idToken`          | `string`                                                                                                                                   | The ID token for the user.                                                                                                                                           |
| `credentialOrigin` | `"auto"` \| `"user"` \| `"user_1tap"` \| `"user_2tap"` \| `"btn"` \| `"btn_confirm"` \| `"btn_add_session"` \| `"btn_confirm_add_session"` | The origin of the credential selection. Always 'user' in native apps.                                                                                                |
| `serverAuthCode`   | `string` \| `null`                                                                                                                         | Only present on iOS. Not null only if a valid webClientId and offlineAccess: true was specified in configure(). Call requestAuthorization() to obtain it on Android. |

---

### GoogleOneTapSignIn

• `Const` **GoogleOneTapSignIn**: `Object`

The entry point of the One-tap Sign In API, exposed as `GoogleOneTapSignIn`.

On the Web, the signatures of `signIn`, `presentExplicitSignIn`, and `createAccount` are callback-based. Read more in the guide.

#### Type declaration

| Name                    | Type                                                                                                                                       |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `signIn`                | (`params`: [`OneTapSignInParams`](#onetapsigninparams)) => `Promise`\<[`OneTapUser`](#onetapuser)\>                                        |
| `presentExplicitSignIn` | (`params`: [`OneTapSignInParams`](#onetapsigninparams)) => `Promise`\<[`OneTapUser`](#onetapuser)\>                                        |
| `createAccount`         | (`params`: [`OneTapCreateAccountParams`](#onetapcreateaccountparams)) => `Promise`\<[`OneTapUser`](#onetapuser)\>                          |
| `requestAuthorization`  | (`options`: [`RequestAuthorizationParams`](#requestauthorizationparams)) => `Promise`\<[`AuthorizationResponse`](#authorizationresponse)\> |
| `signOut`               | (`emailOrUniqueId`: `string`) => `Promise`\<`null`\>                                                                                       |

### WebOneTapSignInCallbacks

Ƭ **WebOneTapSignInCallbacks**: `Object`

On the Web, the signatures of `signIn`, `presentExplicitSignIn`, and `createAccount` are not promise-based but callback-based. Read more in the guide.

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

| Name                        | Type       | Description                                                                                                                                                          |
| :-------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `webClientId?`              | `string`   | Web client ID from Developer Console. Required to get the `idToken` on the user object, and for offline access.                                                      |
| `accountName?`              | `string`   | ANDROID ONLY. An account name that should be prioritized.                                                                                                            |
| `forceCodeForRefreshToken?` | `boolean`  | ANDROID ONLY. If true, the granted server auth code can be exchanged for an access token and a refresh token.                                                        |
| `hostedDomain?`             | `string`   | Specifies a hosted domain restriction                                                                                                                                |
| `offlineAccess?`            | `boolean`  | Must be true if you wish to access user APIs on behalf of the user from your own server                                                                              |
| `openIdRealm?`              | `string`   | iOS ONLY The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.                        |
| `profileImageSize?`         | `number`   | iOS ONLY The desired height (and width) of the profile image. Defaults to 120px                                                                                      |
| `scopes?`                   | `string`[] | The Google API scopes to request access to. Default is email and profile.                                                                                            |
| `googleServicePlistPath?`   | `string`   | If you want to specify a different bundle path name for the GoogleService-Info file, e.g. 'GoogleService-Info-Staging'. Mutually exclusive with `iosClientId`        |
| `iosClientId?`              | `string`   | If you want to specify the client ID of type iOS. It is taken from the `GoogleService-Info.plist` file by default. Mutually exclusive with `googleServicePlistPath`. |

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
