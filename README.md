# Xplorify

Includes:

- [Ignite boilerplate](https://github.com/infinitered/ignite) (project boilerplate)
- [React Native](https://reactnative.dev/) (dev framework)
- [Expo](https://expo.dev/) (android integration)
- [React Navigation](https://reactnavigation.org/) (navigation library)
- [React Hook Form](https://react-hook-form.com/) (forms)
- [Zod](https://zod.dev/) (schema validation)
- [MobX State Tree](https://mobx-state-tree.js.org/intro/welcome) (state management)
- [TypeScript](https://www.typescriptlang.org/) (types)
- [Tailwindcss](https://tailwindcss.com/) (css)
- [React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/) (shadcn compatible with react native)
- [Shadcn](https://ui.shadcn.com/) (prebuilt components)
- [Lucide](https://lucide.dev/) (icons)
- [Jest](https://jestjs.io/) (unit testing)
- [Maestro](https://maestro.mobile.dev/) (e2e testing)
- [Reactotron](https://github.com/infinitered/reactotron) (react native debug tool)
- [React Native Firebase](https://rnfirebase.io/) (backend as a service used for authentication purposes)
- [Pocketbase](https://pocketbase.io/) (database)

> See references in [NOTICE.md](https://github.com/Baa123124/PA1469/blob/master/NOTICE.md)

<br/>

## Development

Project structure:

```
root
├── .maestro
│   └── e2e.yaml
├── assets
│   ├── icons (png)
│   └── images
├── ignite
├── patches
├── plugins
├── src
│   ├── app
│   ├── components
│   │   └── ui (rnr/shadcn)
│   ├── config
│   ├── devtools
│   ├── lib
│   │   └── icons (lucide)
│   ├── models
│   ├── services
│   └── utils
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   └── setup.ts
├── types
│   └── global.d.ts
├── README.md
├── .env
└── package.json
```

<br/>

### `root` Directory

**.maestro** - Maestro e2e tests.

**android** - Native Android / Android Studio project files for manual workflows.

**assets** - Images and png icons (lucide icons live in `src/lib/icons`).

**ignite** - All things ignite, including [generator templates](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/ignite.md).

**patches** - Fixes an issue with react-native-drawer-layout (`npm run patch`).

**plugins** - Any custom Expo Config Plugins to be applied during the prebuild process when generating the native code for the project.

**test** - Jest configs and mocks.

**types** - Shared or global types that are used across multiple modules and not tied to a specific feature.

<br/>

### `src` Directory

**app** -
This is were all the screens/routes and \_layouts live.

**components** -
This is where your reusable components live which help you build your screens.

**components/ui** -
This is where RNR (Shadcn) components are stored.

**config** -
This contains configuration for your app that might vary depending if you're running in development or production.

**devtools** -
This is where setup and configuration of devtools like Reactotron occurs.

**lib** -
This is for RNR (Shadcn) components utils.

**lib/icons** -
This is where Lucide icons live.

**models** -
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**services** -
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**utils** -
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

<br/>

### Utils

- Set system **dark mode** on android: `adb shell "cmd uimode night yes"`
- Set sytem **light mode** on android: `adb shell "cmd uimode night no"`
- Simulate a deep link on android: `adb shell am start -W -a android.intent.action.VIEW -d "xplorify://map" com.xplorify`

<br/>

## Get Started

1. Install [Android Studio](https://reactnative.dev/docs/set-up-your-environment)
2. Install dependencies: `npm install --force`
3. Post installation: `npm run postinstall`
4. Start app: `npm run start`, `npm run web` or `npm run android`
5. Alternatively, start with cleared cache: `npm run start:clear`

<br/>

### Firebase Authentication Setup for Android

1. Go to the [Firebase Console](https://console.firebase.google.com/) and **create a new Firebase project**.
2. Register an Android app with the following:
   - **Android package name**: `com.xplorify`
   - **App nickname**: `Xplorify`
   - Generate a **Debug signing certificate SHA-1**:
     ```bash
     cd android
     gradlew signingReport
     ```
     Copy the <Strong>first</strong> SHA-1 key and paste it into Firebase.
3. Download the google-services.json and place it into the root of this project.
4. Enable google signin and email signin.
5. Copy client id from your google-services.json -> client -> oauth_client -> {
   "client_id": "copy",
   "client_type": 3
   }
   paste into a .env in root as EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID="id".
6. `npx expo prebuild --clean`
7. Start the app with `npm run android`

- NOTE: If you experience a developer error when using google signin, make sure that the key is up to date with your current build.

<br/>

### Pocketbase setup

<Strong>Prerequisites</strong>

1. **Docker Installed**

   - Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for macOS/Windows.
   - On Linux, follow [Docker’s installation guide](https://docs.docker.com/engine/install/).

2. **Docker Compose Installed**
   - Docker Desktop includes Docker Compose.
   - For Linux, install Docker Compose [here](https://docs.docker.com/compose/install/).

<Strong>Running the PocketBase Image</Strong>

Force new build and run in detached mode (really only used if changes has been made to the image)

```bash
docker-compose up -d --build
```

or if you want to run normally in detached mode

```bash
docker-compose up -d
```

The build script sets up a superuser with the following credentials: `admin@xplorify.com` with pass `xplorify123`. You can change this in the dashboard as you'd like. All data is persisted between restarts.

<br/>

### Build apk

1. `npx expo prebuild` or `npm run prebuild:clean` + add Google Maps API key in `.android/app/src/main/AndroidManifest.xml`
2. `npm run android:prod` (release/prod) or `npm run android` (debug/dev)
3. This will open the emulator and the app automatically
4. You can find the apk in `android/app/build/outputs/apk/release` or `android/app/build/outputs/apk/debug`
5. To test manually, drag and drop the apk onto the emulator

<br/>

### Debug Tips

1. Install [Android Studio](https://reactnative.dev/docs/set-up-your-environment)
2. Delete `.expo`
3. Delete `android`
4. Delete `node_modules`
5. `npm cache clean --force`
6. `npm install --force`
7. `npm run postinstall`
8. `npm run adb`
9. `npm run android`
10. Test starting the emulator manually: `C:\Users\<user>\AppData\Local\Android\Sdk/emulator/emulator -avd Medium_Phone_API_3`
