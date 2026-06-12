# Anchor — Android app (Capacitor)

This folder wraps the Anchor web app (`../index.html`, the same file deployed via GitHub Pages)
as a native Android app using [Capacitor](https://capacitorjs.com/).

`../index.html` is the single source of truth. Nothing in `mobile/` should be edited directly
except `capacitor.config.json`, `package.json`, and native project files under `android/`.

## What's included

- `capacitor.config.json` — app ID `com.anchor.recoverycompanion`, app name `Anchor`, web dir `www`.
  **Change the app ID** to one you control before publishing to the Play Store (it cannot be
  changed after the first release).
- `sync-web.js` — copies `../index.html` into `www/index.html` so Capacitor can bundle it.
- `android/` — the generated native Android (Gradle) project.
- Plugins installed: `@capacitor/app`, `@capacitor/local-notifications`, `capacitor-native-biometric`.
  These power the in-app re-lock on backgrounding, real daily reminder notifications, and
  Face ID / Fingerprint unlock — all guarded in `index.html` so they're no-ops on the web build.

## Setup (first time)

```bash
cd mobile
npm install
npm run sync          # copies ../index.html -> mobile/www/index.html
npx cap sync android   # copies www/ into the native project + updates plugins
```

## Building / running

You'll need [Android Studio](https://developer.android.com/studio) with the Android SDK installed.

```bash
cd mobile
npm run android        # syncs web assets + opens the project in Android Studio
```

From Android Studio, run the app on an emulator or a connected device as usual.

If you only changed `../index.html` and want to refresh the native project without opening
Android Studio:

```bash
cd mobile
npm run cap:sync
```

## Notes

- `www/` is generated (gitignored) — always edit `../index.html`, then re-run `npm run sync`.
- This scaffold covers Android only. An iOS build (`npx cap add ios`) requires Xcode on macOS
  and is not set up here.
- Home screen widgets (streak count) are not part of this scaffold — they require native
  WidgetKit (iOS) / Glance (Android) code beyond what Capacitor provides.
- `npx cap doctor` can be used to sanity-check the native project configuration.
