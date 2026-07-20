---
sidebar_position: 43
description: 'Migration guides: from Original to Universal Sign In module, and from the legacy JS API to the new API.'
---

# Migration guides

There are 2 migrations described here: from Original to Universal Sign In and from the old JS API to the new JS API.

## Migrating from Original to Universal Sign In

For authentication, prefer [`authenticate`](one-tap#authenticate). It checks prerequisites, tries to restore a saved credential, starts account creation if needed, and falls back to explicit sign-in when the user still needs to pick or add an account. It returns `user`, `error`, or `isCancelled`. The table also lists advanced method mappings for apps that need to control each step themselves:

| Original Method           | Universal (OneTap) Method                    | Notes                                                                                                                                                                                                                                            |
| ------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `configure`               | `configure`                                  | Same functionality.                                                                                                                                                                                                                              |
| `signInSilently`/`signIn` | `authenticate`                               | Recommended for the complete authentication flow.                                                                                                                                                                                                |
| `signInSilently`          | `signIn`                                     | Advanced method. Universal's `signIn` attempts sign in without user interaction.                                                                                                                                                                 |
| `signIn`                  | `createAccount`/`presentExplicitSignIn`      | Advanced methods for apps that need to control the interactive steps directly.                                                                                                                                                                   |
| `addScopes`               | `requestAuthorization`                       | Similar functionality, different parameters. On Android, you can call `requestAuthorization` without being signed in!                                                                                                                            |
| `hasPlayServices`         | `checkPlayServices`                          | Same functionality, different name.                                                                                                                                                                                                              |
| `getCurrentUser`          | Use `authenticate` response                  | Manage the current user state yourself, or through libraries like [Firebase Auth](https://rnfirebase.io/auth/usage#listening-to-authentication-state) or [Supabase Auth](https://supabase.com/docs/reference/javascript/auth-onauthstatechange). |
| `getTokens`               | Use `authenticate` or `requestAuthorization` | Tokens are included in the response object.                                                                                                                                                                                                      |
| `signOut`                 | `signOut`                                    |                                                                                                                                                                                                                                                  |
| `revokeAccess`            | `revokeAccess`                               | Universal requires email/id parameter on web.                                                                                                                                                                                                    |
| `hasPreviousSignIn`       | Usually not needed                           | Use `authenticate` to authenticate. If you specifically need to know whether a saved credential exists, call the advanced `signIn` method and check for `noSavedCredentialFound`.                                                                |
| `clearCachedAccessToken`  | `clearCachedAccessToken`                     | Same functionality.                                                                                                                                                                                                                              |

---

## Migrating to the new JS API

Version 13 introduced a new JS API, which changes some method response signatures and makes minor changes to error handling (details [here](https://github.com/react-native-google-signin/google-signin/pull/1326)). If you're upgrading from version 12 or earlier, you'll need to make some minor adjustments.

### Universal Sign In

1. Add the [`configure`](one-tap#configure) method to your code. This method is required to be called to configure the module.

2. Prefer `authenticate` for authentication. It returns `user`, `error`, or `isCancelled`:

```diff
const signIn = async () => {
-  const userInfo = await GoogleOneTapSignIn.signIn({
-    webClientId: `autoDetect`, // works only if you use Firebase
-    iosClientId: config.iosClientId, // only needed if you're not using Firebase
-  });
-  setState({ userInfo }); // use e.g. `userInfo.name`
+  const { user, error, isCancelled } = await GoogleOneTapSignIn.authenticate();
+
+  if (user) {
+    setState({ userInfo: user });
+  } else if (isCancelled) {
+    // sign in was cancelled
+  } else if (error) {
+    switch (error.code) {
+      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
+        // Android-only: play services not available or outdated
+        // Web: the Google Client Library is not loaded yet
+        break;
+      default:
+      // something else happened
+    }
+  }
};
```

3. If requesting offline access in `requestAuthorization` on Android, add `enabled: true`:

```diff
await GoogleOneTapSignIn.requestAuthorization({
  offlineAccess: {
+      enabled: true,
  },
});
```

### Original Sign In

1. Follow step 2. from above for `signIn`, `addScopes` and `signInSilently` methods.
2. remove `SIGN_IN_REQUIRED` mentions. This case is now handled with [`NoSavedCredentialFound`](api#nosavedcredentialfound) object:

```diff
const getCurrentUserInfo = async () => {
  try {
    const response = await GoogleSignin.signInSilently();
+    if (isSuccessResponse(response)) {
+        setState({ userInfo: response.data })
+    } else if (isNoSavedCredentialFoundResponse(response)) {
+        // user has not signed in yet
+    }
-    setState({ userInfo: response });
  } catch (error) {
-    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
-      // user has not signed in yet
-    } else {
-      // some other error
-    }
  }
};
```
