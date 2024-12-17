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
- [React Native Firebase](https://rnfirebase.io/) (Backend as a service used for authentication purposes)

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

<br/>

## Get Started

1. Install [Android Studio](https://reactnative.dev/docs/set-up-your-environment)
2. Install dependencies: `npm install --force`
3. Post installation: `npm run postinstall`
4. Start app: `npm run start`, `npm run web` or `npm run android`
5. Alternatively, start with cleared cache: `npm run start:clear`

<br/>

## Firebase Authentication Setup for Android

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
4. Enable google signin and email signin. Copy web client id from Google and paste into a .env in root as EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID="id".
- NOTE: If you experience a developer error when using google signin, make sure that the key is up to date with your current build. Redo the generation if unsure.
<br/>

## Firebase Authentication Setup for IOS

Not setup

<br/>
## Debug Tips

1. Install [Android Studio](https://reactnative.dev/docs/set-up-your-environment)
2. Make sure you are using openjdk version 22 or below
3. Delete `.expo`
4. Delete `android`
5. Delete `node_modules`
6. `npm cache clean --force`
7. `npm run install --force`
8. `npm run postinstall`
9. `npm run adb`
10. `npm run android`
11. Test starting the emulator manually: `C:\Users\<user>\AppData\Local\Android\Sdk/emulator/emulator -avd Medium_Phone_API_3`

<br/>

## TODO

- Add database
- Add Github workflow
- Add xplorify app icon and splash screen
