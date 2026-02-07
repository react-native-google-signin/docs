---
sidebar_label: Config doctor
sidebar_position: 75
sidebar_class_name: sponsor-heart
description: 'CLI tool to diagnose Android signing configuration issues and resolve DEVELOPER_ERROR.'
---

# Configuration Doctor

A command-line tool designed to help with Android signing configuration issues and quickly resolve the infamous `DEVELOPER_ERROR`, or potentially [other errors](#when-to-use) too.

## Why

To save time. Developers sometimes waste hours or even days tracking down the [errors](#when-to-use).

This tool gives you the SHA-1 fingerprints that need to be added to your Google project configuration to resolve the error.

## Usage

The tool can extract SHA-1 fingerprints directly from a device/emulator with your app installed, or from an APK file.

Run the command as shown below and follow the instructions.

```bash
# Usage with device/emulator
npx @react-native-google-signin/config-doctor --package-name com.yourapp.name

# Usage with an APK file
npx @react-native-google-signin/config-doctor --apk-path ./app-release.apk
```

### Arguments

- `--package-name` (optional): Your Android app's package name. If provided, the tool extracts the APK from a connected device/emulator.
- `--apk-path` (optional): Path to an APK file.

## When to use

When getting `DEVELOPER_ERROR`, unexpected [`cancelled`](https://issuetracker.google.com/issues/424210681) or even `GetCredentialProviderConfigurationException` during Sign-In. You can run into these errors:

- When setting up Google Sign-In for the first time
- After downloading your app from Play Store
- When switching between debug and release builds

### Example Output

```
✔ Application package name: com.some.app.android

🔍 Found the following SHA-1 certificate fingerprints:

A1:B2:C3:D4:E5:F6:G7:H8:I9:J0:K1:L2:M3:N4:O5:P6:Q7:R8:S9:T0

Next steps:
...
```

## Requirements

- Active license (get access at [universal-sign-in.com](https://universal-sign-in.com))
- Android device/emulator with your app installed, OR a built APK file

## Related Documentation

- [Collecting configuration information](./setting-up/get-config-file.mdx)
