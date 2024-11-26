---
sidebar_position: 3
---

# Android setup guide

:::warning
If you use Expo, follow [this guide](/setting-up/expo.md) instead. This guide applies to vanilla React Native apps only.
:::

### Ensure compatibility

If you're using the sponsor package:

If you're using RN >= 0.73, you're good to go.

But if you're using RN 0.72 or older, you need to specify `compileSdkVersion` 34 in `android/build.gradle` of your project as highlighted below.

## Google project configuration

- Follow [this](./get-config-file) guide to set up your project and get the configuration information which you'll need later.

### Without Firebase Authentication

You don't need to do any more modifications.

### With Firebase Authentication

#### 1. Download the configuration file

- Download the configuration file (`google-services.json`) from Firebase. Then, place it into your project according to [these instructions](https://developers.google.com/android/guides/google-services-plugin#adding_the_json_file).

#### 2. Update gradle files

Update `android/build.gradle` with

```groovy title="android/build.gradle"
buildscript {
    ext {
        buildToolsVersion = "a.b.c"
        minSdkVersion = x
        compileSdkVersion = y
        targetSdkVersion = z
        // highlight-next-line
        googlePlayServicesAuthVersion = "20.7.0" // <--- use this version or newer
    }
// ...
    dependencies {
        // highlight-start
        classpath 'com.google.gms:google-services:4.4.0' // <--- use this version or newer
        // highlight-end
    }
}
```

Update `android/app/build.gradle` with

```groovy title="android/app/build.gradle"
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"
// highlight-next-line
apply plugin: 'com.google.gms.google-services'
```

This ends the setup for Firebase.

## Rebuild the native project

Do not forget to rebuild the native app after the setup is done.

## Choose Dependency versions (optional)

The library depends on `com.google.android.gms:play-services-auth`, as seen in [build.gradle](https://github.com/react-native-community/google-signin/blob/master/android/build.gradle). If needed, you may control their versions by the `ext` closure, as seen in the code snippet above.
