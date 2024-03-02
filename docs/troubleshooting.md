---
sidebar_label: Troubleshooting
sidebar_position: 70
---

# FAQ / Troubleshooting

#### I'm getting an error, and I'm not able to fix it

Configuring google sign in can sometimes be tricky. If you're hitting a wall, you can get in touch with the maintainer ([@vonovak](https://github.com/vonovak)) via his [personal site](https://react-native-training.eu/). Please note that this is a paid service.

## Android

[See troubleshooting for non-firebase users below](#troubleshooting-for-non-firebase-users)

### "A non-recoverable sign in failure occurred"

See [this comment](https://github.com/react-native-community/google-signin/issues/659#issuecomment-513555464). Or [this SO question](https://stackoverflow.com/questions/53816227/google-signin-sdk-is-failing-by-throwing-error-a-non-recoverable-sign-in-failur).

### Login does not work when downloading from the Play Store.

Check if "Google Play App Signing" is enabled for your app.
If it is enabled, you will need to add the "App signing certificate" `SHA-1` to your firebase console.

You can find it at: App -> Release (in left sidebar) -> Setup -> App integrity. Under the App signing key certificate, copy `SHA-1 certificate fingerprint` into firebase console for the Android app.

If you are not using firebase, and your app is enabled for "Google Play App Signing":
Go to "https://console.developers.google.com/" -> click "Credential" in the right panel -> Find "Client ID" for type "Android" under "OAuth 2.0 Client IDs" section -> Edit -> replace "SHA-1 certificate fingerprint" with the one from App -> Release (in left sidebar) -> Setup -> App integrity -> App signing key certificate.

### `DEVELOPER_ERROR` or `code: 10` or `Developer console is not set up correctly` error message

This is _always_ a configuration mismatch. Make sure that your SHA certificate fingerprint and package name you entered in Firebase are correct. If you are in development, make sure your development signing fingerprint is added as well.

To get the SHA1:

1. From your project root, `cd android && ./gradlew signingReport`.
2. Scroll to the top of output, see the fingerprints. Debug fingerprint is used in dev, release fingerprint is used in production.

To add the SHA1:

1. Sign in to Firebase and open your project.
2. Click the Settings icon and select Project settings.
3. In the "Your apps" card, select the package name of the app you need to add SHA1 to.
4. Click "Add fingerprint".

![Firebase, add Android keystore's SHA1 to your project](/img/android-fingerprint-firebase.png)

Then re-download the `google-services.json` file, put it into your project (usually, the path is `android/app/google-services.json`) and rebuild your project.

You may need to add your SHA certificate fingerprint to your Firebase config. Find your SHA1 fingerprint by following the instructions at [stackoverflow](https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate/33479550#33479550). Then, go to https://console.firebase.google.com/, select your app, and add the SHA1 value under Project Settings (gear icon in the upper left) -> Your Apps -> SHA certificate fingerprints

If you're passing `webClientId` in configuration object to `GoogleSignin.configure()` make sure it's correct and that it is of type web (NOT Android!). You can get your `webClientId` from [Google Developer Console](https://console.developers.google.com/apis/credentials). They're listed under "OAuth 2.0 client IDs".

If you're running your app in debug mode and not using `webClientId` or you're sure it's correct the problem might be signature (SHA-1 or SHA-256) mismatch. You need to add the following to `android/app/build.gradle`:

```diff
signingConfigs {
+    debug {
+        storeFile file(MYAPP_RELEASE_STORE_FILE)
+        storePassword MYAPP_RELEASE_STORE_PASSWORD
+        keyAlias MYAPP_RELEASE_KEY_ALIAS
+        keyPassword MYAPP_RELEASE_KEY_PASSWORD
+    }
    release {
        ...
    }
 }
```

### Login does not work when using Internal App Sharing.

If you get a DEVELOPER_ERROR when using Internal App Sharing, it is because Google resigns your application with its own key. In the Google Play Console go to Development Tools-> Internal App Sharing->App Certificate and there is another SHA-1 fingerprint to add to firebase.

This is separate from the release app signing certificate explained below.

Also see [here](https://stackoverflow.com/questions/57780620/how-to-get-android-internal-app-sharing-key-sha1-to-enable-google-apis).

### Changing Google Play Services version

See ["Choose Dependency versions"](setting-up/android.md#choose-dependency-versions-optional) above.

### `Missing api_key/current_key object`

open `android/app/google-services.json` and replace `"api_key":[]` with `"api_key":[{ "current_key": "" }]`

### Error code `12501`

This is a permission error. Make sure the `certificate_hash` in `android/app/google-services.json` matches your certificate.

To get your sha1-hash

```
keytool -exportcert -keystore ~/.android/debug.keystore -list -v
```

Also make sure the application id matches the one you enter on the cloud console.

### Troubleshooting for non-firebase users

If you are not using firebase you can ignore all docs related to google services. You don't need a `google-services.json` or any `build.gradle` changes from these docs. Simply follow the instructions from [the official docs](https://developers.google.com/identity/sign-in/android/start-integrating). However, be aware of following common issues which can lead to a `DEVELOPER ERROR` or an `A non-recoverable sign in failure occurred` error.

#### Try different SHA1 keys

Depending on your config you may need to add multiple SHA1 keys. Go to your android folder and run `./gradlew signingReport`. You should see different SHA1 keys for debug and release. Add them to the [google developer console](https://console.developers.google.com/apis/credentials) under the oauth section. Select Android as client type. You may also need your SHA1 key from the [play console](https://play.google.com). Find it in the app signature area and add it as well.

#### Package name !== application id

When adding a new oauth client, google asks you to add your package name. In some cases your package name is not equal to your application id. Check if your package name in the `AndroidManifest.xml` is the same as your application/bundle id. Find your application id in the play console or `android/app/build.gradle`. The format looks like `com.yourapp.id`.

## iOS

### On iOS the app crashes when tapping Sign In button

You're most likely missing `Url Schemes` configuration. How to do it: ![configure URL schemes](/img/add-url-scheme-ios.png)
