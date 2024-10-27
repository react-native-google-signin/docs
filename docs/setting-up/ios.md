---
sidebar_position: 4
---

# iOS setup guide

:::warning
If you use Expo, please follow [this guide](/setting-up/expo.md) instead. This guide applies to vanilla React Native apps only.
:::

### Link the native module

- run `pod install` in `ios/` directory to install the module

### Google project configuration

- Follow [this](./get-config-file) guide to get the configuration information which you need for the next steps.

### Firebase Authentication

If you're using Firebase Authentication, download the `GoogleService-Info.plist` file and place it into your Xcode project.

### Xcode configuration

- Configure URL types in the `Info` panel (see screenshot)
  - add your "iOS URL scheme" (also known as `reversed client id`), which can be found in [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=_) under your iOS client ID.
- If you need to support Mac Catalyst, you will need to enable the Keychain Sharing capability on each build target. No keychain groups need to be added.

![link config](/img/urlTypes.png)

## Rebuild the native project

Do not forget to rebuild the native app after the setup is done.

### Optional: modify your app to respond to the URL scheme

This is only required if you have multiple listeners for `openURL` - for instance if you have both Google and Facebook OAuth (as seen in the code snippet below).

Because only one `openURL` method can be defined, if you have multiple listeners for `openURL`, you must combine them into a single function in your `AppDelegate.m` like so:

- Open `AppDelegate.m`
- Add an import: `#import <GoogleSignIn/GoogleSignIn.h>`
- Add a method to respond to the URL scheme. This is just an example of a method that you can add at the bottom of your file if you're using both `FBSDKApplicationDelegate` and `GIDSignIn` :

```objc
// AppDelegate.m
- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options] || [GIDSignIn.sharedInstance handleURL:url];
}
```
