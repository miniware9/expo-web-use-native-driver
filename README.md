# On web, expo-router's "Bundling..." toast and @expo/ui's SegmentedControl animate with `useNativeDriver: true`

Expo SDK 58 (expo-router 58.0.23, @expo/ui 58.0.20, react-native-web 0.21.4),
web (Chrome 151, Linux). Native was not run; it has the native driver these
animations ask for.

`app.json` sets `web.output: "static"`. `app/index.tsx` has a button that mounts
`SegmentedControl` from `@expo/ui/community/segmented-control`.

1. `npm install`, then `npx expo start --web`, and open the page in Chrome with
   the console open.
2. On load, the console shows one warning:

       Animated: `useNativeDriver` is not supported because the native animated module is missing. Falling back to JS-based animation. To resolve this, add `RCTAnimation` module to this app, or remove `useNativeDriver`. Make sure to run `bundle exec pod install` first. Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md

   Its stack runs through `useFadeIn` in `expo-router/build/views/Toast.js`,
   the fade-in of the "Bundling..." toast.
3. Press "Show a SegmentedControl". Nothing more is logged: react-native-web
   prints this warning once per page load.
4. `npx expo export --platform web`, then `npx expo serve`, and open the page
   with the console open. The load is silent, since the toast renders in
   development only.
5. Press "Show a SegmentedControl": the same warning appears, from the
   control's slide animation
   (`@expo/ui/build/community/segmented-control/vendor/SegmentedControl.js`).

Expected: no warning. Neither animation can get a native driver on web.

Actual: one warning per page load, from the toast in development and from the
control in a production export. Its advice (`RCTAnimation`, `pod install`) does
not apply to web.

With the default `web.output` (`"single"`), the development load in step 2 is
silent too, and the warning appears at step 3, from the control.
