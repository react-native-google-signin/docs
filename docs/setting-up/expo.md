---
sidebar_position: 1
description: 'Expo setup guide. Covers config plugin setup and EAS Build configuration for Google Sign-In.'
---

# Expo setup

## Prepare your Expo project

:::note

This package cannot be used in [Expo Go](https://docs.expo.dev/workflow/overview/#expo-go-an-optional-tool-for-learning) because it uses native code. This applies to both the [Original](../original) and [Universal](../one-tap) modules.

However, you can add custom native code to an Expo app by using a [development build](https://docs.expo.dev/workflow/overview/#development-builds). That is the recommended approach for production apps, and is documented in this guide.

:::

## Add config plugin

After installing the npm package, add a config plugin (read more details below) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`. There are 2 config plugins available: for projects with Firebase, and without Firebase.

### Expo without Firebase

If you're _not_ using Firebase, provide the `iosUrlScheme` option to the config plugin.

To obtain `iosUrlScheme`, follow [these instructions](./get-config-file?firebase-or-not=cloud-console#ios).

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

If you are using Firebase Authentication, follow [these instructions](./get-config-file?firebase-or-not=firebase#step-2) to get `google-services.json` file for Android and [these instructions](./get-config-file?firebase-or-not=firebase#ios)) to get `GoogleService-Info.plist` for iOS.

Place them into your project and specify the paths to the files:

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

### Swift Package Manager (beta)

Universal Sign In uses CocoaPods by default. It automatically selects SPM for iOS SDK dependencies when RNFirebase 26+ is autolinked on iOS with Firebase SPM enabled.

SPM requires dynamic frameworks. To select it explicitly:

```json title="app.json | js"
{
  "expo": {
    "plugins": [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps._some_id_here_",
          "iosDependencyManager": "spm"
        }
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "dynamic"
          }
        }
      ]
    ]
  }
}
```

`iosDependencyManager` accepts `"auto"` (default), `"cocoapods"`, or `"spm"`.

Firebase and Google Sign-In must use the same dependency manager. RNFirebase 27+ requires SPM. With RNFirebase 26, set `iosDependencyManager: "cocoapods"` for Google Sign-In and `ios.disableSPM: true` for `@react-native-firebase/app` to use CocoaPods.

Full Expo SwiftPM currently requires upstream packaging fixes. See the [iOS guide](./ios#swift-package-manager-beta) for the full SwiftPM preview for bare React Native apps.

## Build the native app

Run the following to generate the native project directories.

```sh
npx expo prebuild --clean
```

Rebuild your app and read the [config guide](./get-config-file)!

```sh
npx expo run:android && npx expo run:ios
```
