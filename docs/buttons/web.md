# WebGoogleSigninButton

This is the sign-in button that you can use in Web apps. It renders `null` when used in native apps.
It has a slightly different API than the native `GoogleSigninButton` component which is why it exists as a separate component.

:::tip
Please note that Web support is only available to sponsors️. [It takes just a few clicks to get access](/docs/install.mdx#accessing-the-private-package-for-sponsors) ❤️.
:::

The button will _not render_ before the [Google Client API has been loaded](../setting-up/web). You can use the `onError` prop to detect this case.

### How to use this

As the One-tap Guide explains, there are two ways to sign in on the Web: using the One-tap UI or using the Google Sign-In button.

One-tap UI may not always be available: This happens if user has [opted out](https://developers.google.com/identity/gsi/web/guides/features#globally_opt_out) or when they close the dialog several times in a row, entering the [cooldown period](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown).

The Google Sign-In button serves as a fallback. Tapping it will open the regular Google Sign-In dialog.

```tsx
import { WebGoogleSigninButton } from '@react-native-google-signin/google-signin';

<WebGoogleSigninButton />;
```

## Props

All props are optional.

| Name             | Type                                                                  | Description                                                                         |
| ---------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `type?`          | `"standard"` \| `"icon"`                                              | Optional. The type of the sign-in button.                                           |
| `theme?`         | `"outline"` \| `"filled_blue"` \| `"filled_black"`                    | Optional. The theme of the sign-in button.                                          |
| `size?`          | `"large"` \| `"medium"` \| `"small"`                                  | Optional. The size of the sign-in button.                                           |
| `text?`          | `"signin_with"` \| `"signup_with"` \| `"continue_with"` \| `"signin"` | Optional. The text to display on the sign-in button.                                |
| `shape?`         | `"rectangular"` \| `"pill"` \| `"circle"` \| `"square"`               | Optional. The shape of the sign-in button.                                          |
| `width?`         | `number`                                                              | Optional. The width of the sign-in button.                                          |
| `locale?`        | `string`                                                              | Optional. The locale for the sign-in button.                                        |
| `logoAlignment?` | `"left"` \| `"center"`                                                | Optional. The alignment of the logo on the button.                                  |
| `onError?`       | `(error: Error) => void`                                              | Optional. Called when you try to render the button before the Client SDK is loaded. |
