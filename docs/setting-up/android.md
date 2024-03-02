---
sidebar_position: 3
---

# Android setup guide

:::warning
This applies to vanilla React Native apps, not Expo. If you use Expo, please follow [this guide](/setting-up/expo.md).
:::

### Ensure compatibility

If you're using the sponsor package:

If you're using RN >= 0.73, you're good to go.

But if you're using RN 0.72 or older, you need to either:

- install version `12.1.0` of the package
- or install version >= `13` AND specify `compileSdkVersion` 34 in `android/build.gradle` of your project as highlighted below

## 1. Google project configuration

- Follow [this](./get-config-file) guide to set up your project and get the configuration information which you'll need later.

### Without Firebase

You don't need to do any more modifications.

### With Firebase

#### 1. Download the configuration file

- Download the configuration file (`google-services.json`) from Firebase into your project according to [this guide](https://developers.google.com/android/guides/google-services-plugin#adding_the_json_file).

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

## Choose Dependency versions (optional)

The library depends on `com.google.android.gms:play-services-auth`, as seen in [build.gradle](https://github.com/react-native-community/google-signin/blob/master/android/build.gradle). If needed, you may control their versions by the `ext` closure, as seen in the code snippet above.

## Running on simulator or device

Make sure you have an emulator / device with Google Play Services installed.
