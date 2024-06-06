# GoogleSigninButton

This is the sign in button that you can use in iOS and Android apps. It renders `null` when used on the Web.
On macOS, a simplified version of the button is rendered because the native SDK does not offer a button component for macOS.

The reason why you might want to use this native button is that it's localized out of the box, so the label will be translated to the currently active language automatically (if your localization is set up correctly - doing that is out of scope for this guide).

You may _not_ want to use it because it's not very visually appealing - but you are free to design your own button.

![signin button](/img/signin-button.png)

```tsx
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

<GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={() => {
    // initiate sign in
  }}
  disabled={isInProgress}
/>;
```

## Props

### `size`

Possible values:

- `Size.Icon`: display only Google icon. Recommended size of 48 x 48.
- `Size.Standard`: icon with 'Sign in'. Recommended size of 230 x 48.
- `Size.Wide`: icon with 'Sign in with Google'. Recommended size of 312 x 48.

Default: `GoogleSigninButton.Size.Standard`. Given the `size` prop you pass, we'll automatically apply the recommended size, but you can override it by passing the style prop as in `style={{ width, height }}`.

### `color`

Possible values:

- `Color.Dark`: apply a blue background
- `Color.Light`: apply a light gray background

### `disabled`

Boolean. If true, all interactions for the button are disabled.

### `onPress`

Handler to be called when the user taps the button

### [Inherited `View` props...](https://facebook.github.io/react-native/docs/view#props)
