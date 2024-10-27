---
sidebar_position: 1
---

# Expo setup

## Prepare your Expo project

:::info

With Expo SDK 50, minimum iOS version was bumped to 13.4. In case you get an error during pod install step, please see [release notes](https://github.com/react-native-google-signin/google-signin/releases/tag/v11.0.0) to determine the right version of this package to install.

:::

:::note

This package cannot be used in [Expo Go](https://docs.expo.dev/workflow/overview/#expo-go-an-optional-tool-for-learning) because it requires custom native code.

However, you can add custom native code to an Expo app by using a [development build](https://docs.expo.dev/workflow/overview/#development-builds). Using a development build is the recommended approach for production apps, and is documented in this guide.

:::

```sh
npx expo install @react-native-google-signin/google-signin
```

## Add config plugin

After installing the npm package, add a config plugin (read more details below) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`. There are 2 config plugins available: for projects with Firebase, and without Firebase.

### Expo without Firebase

If you're _not_ using Firebase, provide the `iosUrlScheme` option to the config plugin.

To obtain `iosUrlScheme`, go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=_) and copy the "iOS URL scheme" from your iOS client in the "OAuth 2.0 Client IDs" section.

```json title="app.json|js"
{
  "expo": {
    "plugins": [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps._some_id_here_"
        }
      ]
    ]
  }
}
```

### Expo and Firebase Authentication

If you are using Firebase Authentication, [obtain the 2 Firebase config files](./get-config-file) and place them into your project. Then specify the path to the files:

```json title="app.json|js"
{
  "expo": {
    "plugins": ["@react-native-google-signin/google-signin"],
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

## Ensure compatibility

If you're using the sponsor package:

If you're using Expo SDK >= 50, you're good to go.

But if you're using Expo 49 or older, you need to specify `compileSdkVersion` 34 of your project using [Expo BuildProperties](https://docs.expo.dev/versions/latest/sdk/build-properties/#usage).

## Rebuild the app

Then run the following to generate the native project directories.

```sh
npx expo prebuild --clean
```

Next, rebuild your app and you're good to go!

```sh
npx expo run:android && npx expo run:ios
```
