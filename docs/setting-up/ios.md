---
sidebar_position: 4
---

# iOS setup guide

:::warning
This applies to vanilla React Native apps, not Expo. If you use Expo, please follow [this guide](/setting-up/expo.md).
:::

### 1. Link the native module

- run `pod install` in `ios/` directory to install the module

### 2. Google project configuration

- Follow [this](./get-config-file) guide to get the configuration information which you need for step 3.

### 3. Xcode configuration

- Configure URL types in the `Info` panel (see screenshot)
  - add a URL with scheme set to your `REVERSED_CLIENT_ID` (found inside `GoogleService-Info.plist` or Google Cloud console)
- If you need to support Mac Catalyst, you will need to enable the Keychain Sharing capability on each build target. No keychain groups need to be added.

![link config](/img/urlTypes.png)

### Optional: modify your app to respond to the URL scheme

This is only required if you have multiple listeners for `openURL` - for instance if you have both Google and Facebook OAuth (as seen in the code snippet below).

Because only one `openURL` method can be defined, if you have multiple listeners for `openURL`, you must combine them into a single function in your `AppDelegate.m` like so:

- Open `AppDelegate.m`
- Add an import: `#import <GoogleSignIn/GoogleSignIn.h>`
- Add a method to respond to the URL scheme. This is just an example of a method that you can add at the bottom of your file if you're using both `FBSDKApplicationDelegate` and `RNGoogleSignin` :

```objc
// AppDelegate.m
- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options] || [GIDSignIn.sharedInstance handleURL:url];
}
```
