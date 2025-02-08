---
sidebar_position: 1
---

# Expo setup

## Prepare your Expo project

:::note

This package cannot be used in [Expo Go](https://docs.expo.dev/workflow/overview/#expo-go-an-optional-tool-for-learning) because it requires custom native code. This applies to both the [Original](../original) and [Universal](../one-tap) (one-tap) sign in methods.

However, you can add custom native code to an Expo app by using a [development build](https://docs.expo.dev/workflow/overview/#development-builds). Using a development build is the recommended approach for production apps, and is documented in this guide.

:::

:::info

With Expo SDK 50, minimum iOS version was bumped to 13.4. In case you get an error during pod install step, see [these release notes](https://github.com/react-native-google-signin/google-signin/releases/tag/v11.0.0) to determine the right version of this package to install.

:::

## Add config plugin

After installing the npm package, add a config plugin (read more details below) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`. There are 2 config plugins available: for projects with Firebase, and without Firebase.

### Expo without Firebase

If you're _not_ using Firebase, provide the `iosUrlScheme` option to the config plugin.

To obtain `iosUrlScheme`, follow [the guide](./get-config-file#ios).

```json title="app.json | js"
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

If you are using Firebase Authentication, obtain the 2 Firebase config files (`google-services.json` for Android and `GoogleService-Info.plist` for iOS) according to the [guide](./get-config-file?firebase-or-not=firebase) and place them into your project. Then specify the paths to the files:

```json title="app.json | js"
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

## Rebuild the app

Then run the following to generate the native project directories. Run this command every time you add or update any dependency with native code.

```sh
npx expo prebuild --clean
```

Next, rebuild your app and you're good to go!

```sh
npx expo run:android && npx expo run:ios
```
