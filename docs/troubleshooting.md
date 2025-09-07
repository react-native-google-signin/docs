---
sidebar_label: Troubleshooting
sidebar_position: 70
---

# FAQ / Troubleshooting

## Android

### Login does not work when downloading from the Play Store.

See [`DEVELOPER_ERROR` paragraph](#developer_error).

### `DEVELOPER_ERROR` or `code: 10` or `Developer console is not set up correctly` error message {#developer_error}

This is always (! _absolutely always_ !) a configuration mismatch between your app and the server-side setup (in Firebase or Google Cloud console).

Firstly, if you are using Firebase Auth, verify Google is enabled as a Sign-in method in Firebase Console (Build -> Authentication -> Sign-in method).

Then: if you have the APK that gives this error, we recommend to run the [Configuration Doctor](./config-doctor.md) and follow its instructions:

```bash
npx @react-native-google-signin/config-doctor
```

Otherwise, we recommend:

- Follow the [setup guide](/docs/setting-up/get-config-file) and perform its steps once again, very carefully.
- If you're passing `webClientId` in the configuration object to `GoogleSignin.configure()`, make sure it's correct and that it is of type web (NOT Android!). You can get your `webClientId` from [Google Developer Console](https://console.developers.google.com/apis/credentials). It is listed under "OAuth 2.0 client IDs".
- [Search the issue tracker](https://github.com/react-native-google-signin/google-signin/issues?q=is%3Aissue+DEVELOPER+ERROR+is%3Aclosed) for old reports of the error.

### Login does not work when using Internal App Sharing.

If you get a `DEVELOPER_ERROR` when using Internal App Sharing, it is because Google resigns your application with its own key.

See [`DEVELOPER_ERROR` paragraph](#developer_error).

### "A non-recoverable sign in failure occurred"

See [this comment](https://github.com/react-native-community/google-signin/issues/659#issuecomment-513555464). Or [this SO question](https://stackoverflow.com/questions/53816227/google-signin-sdk-is-failing-by-throwing-error-a-non-recoverable-sign-in-failur).

### Changing `play-services-auth` version

See ["Choose Dependency versions"](setting-up/android.md#choose-dependency-versions-optional) above.

### Package name !== application id

When adding a new oauth client, google asks you to add your package name. In some cases your package name is not equal to your application id. Check if your package name in the `AndroidManifest.xml` is the same as your application/bundle id. Find your application id in the play console or `android/app/build.gradle`. The format looks like `com.yourapp.id`.

## iOS

### On iOS the app crashes when tapping Sign In button

Along with "Your app is missing support for the following URL schemes" error in console.

Your `Url Schemes` configuration is incorrect.

If you use Expo, verify that the [config plugin](setting-up/expo#add-config-plugin) is configured correctly.

In vanilla React Native projects, add URL type [like this](https://react-native-google-signin.github.io/docs/setting-up/ios#xcode-configuration).
