---
sidebar_position: 1
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

## Build the native app

Run the following to generate the native project directories.

```sh
npx expo prebuild --clean
```

Rebuild your app and read the [config guide](./get-config-file)!

```sh
npx expo run:android && npx expo run:ios
```
