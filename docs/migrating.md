---
sidebar_position: 90
sidebar_label: Migrating
---

# Migrating to new JS API

Version 13 introduced a new JS API, which changes some method response signatures and makes minor changes to error handling (details [here](https://github.com/react-native-google-signin/google-signin/pull/1326)). If you're upgrading from version 12 or earlier, you'll need to make some minor adjustments.

## Universal Sign In

1. Add the [`configure`](one-tap#configure) method to your code. This method is required to be called to configure the module.

2. Change the `signIn`, `createAccount`, `presentExplicitSignIn`, and `requestAuthorization` methods to use the new apis: That means that the data you previously accessed directly on `userInfo` (see below - for example `userInfo.name`) will now be nested in `userInfo.data` (e.g. `userInfo.data.name`). See [`OneTapResponse` type](/docs/api#onetapresponse):

```diff
const signIn = async () => {
  try {
-    const userInfo = await GoogleOneTapSignIn.signIn({
-      webClientId: `autoDetect`, // works only if you use Firebase
-      iosClientId: config.iosClientId, // only needed if you're not using Firebase
-    });
-    setState({ userInfo }); // use e.g. `userInfo.name`
+    const response = await GoogleOneTapSignIn.signIn();
+
+    if (response.type === 'success') {
+      setState({ userInfo: response.data });
+    } else if (response.type === 'noSavedCredentialFound') {
+      // Android and Apple only. No saved credential found, call `createAccount`
+    }

  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
-        case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
-          // Android and Apple only. No saved credential found, call `createAccount`
-          break;
-        case statusCodes.SIGN_IN_CANCELLED:
-          // sign in was cancelled
-          break;
        case statusCodes.ONE_TAP_START_FAILED:
          // Android-only, you probably have hit rate limiting.
          // On Android, you can still call `presentExplicitSignIn` in this case.
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android-only: play services not available or outdated
          // Web: when calling an unimplemented api (requestAuthorization)
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

3. If requesting offline access in `requestAuthorization` on Android, add `enabled: true`:

```diff
await GoogleOneTapSignIn.requestAuthorization({
  offlineAccess: {
+      enabled: true,
  },
});
```

## Original Sign In

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
