---
sidebar_position: 1
---

# Expo setup

## Prepare your Expo project

:::info

With Expo SDK 50, minimum iOS version was bumped to 13.4. In case you get an error during pod install step, please consult release notes to determine the right version of this package to install.

:::

:::note

This package cannot be used in ["Expo Go"](https://docs.expo.dev/workflow/overview/#expo-go-an-optional-tool-for-learning) because it requires custom native code.

However, you can add custom native code to Expo by using a [development build](https://docs.expo.dev/workflow/overview/#development-builds). Using development builds is the recommended approach for production apps, and is documented in this guide.

:::

```sh
npx expo install @react-native-google-signin/google-signin
```

## Add config plugin

After installing the npm package, add a config plugin (read more details below) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`. There are 2 config plugins available: for projects with Firebase, and without Firebase.

### Expo without Firebase

If you're _not_ using Firebase, provide the `iosUrlScheme` option to the config plugin.

To obtain `iosUrlScheme`, go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and copy the "iOS URL scheme" from your iOS client in the "OAuth 2.0 Client IDs" section.

```json title="app.json"
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

### Expo and Firebase

If you are using Firebase, [obtain the config file](./get-config-file) and place it into your project. Then specify the path to the file:

```json title="app.json"
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

But if you're using Expo 49 or older, you need to either:

- install version `12.1.0` of the package
- or install version >= `13` AND specify `compileSdkVersion` 34 of your project using [Expo BuildProperties](https://docs.expo.dev/versions/latest/sdk/build-properties/#usage)

## Rebuild the app

Then run the following to generate the native project directories.

```sh
npx expo prebuild --clean
```

Next, rebuild your app and you're good to go!

```sh
npx expo run:android && npx expo run:ios
```
