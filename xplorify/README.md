# Xplorify

Includes:

- [Ignite boilerplate](https://github.com/infinitered/ignite) (project boilerplate)
- [React Native](https://reactnative.dev/) (dev framework)
- [Expo](https://expo.dev/) (android integration)
- [React Navigation](https://reactnavigation.org/) (navigation library)
- [MobX State Tree](https://mobx-state-tree.js.org/intro/welcome) (state management)
- [TypeScript](https://www.typescriptlang.org/) (types)
- [Tailwindcss](https://tailwindcss.com/) (css)
- [React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/) (shadcn compatible with react native)
- [Shadcn](https://ui.shadcn.com/) (prebuilt components)
- [Lucide](https://lucide.dev/) (icons)
- [Jest](https://jestjs.io/) (unit testing)
- [Maestro](https://maestro.mobile.dev/) (e2e testing)
- [Reactotron](https://github.com/infinitered/reactotron) (react native debug tool)

<br/>

## Development

Project structure:

```
root
├── .maestro
│   └── e2e.yaml
├── assets
│   └── images
├── ignite
├── patches
├── plugins
├── src
│   ├── app
│   ├── components
│   ├── config
│   ├── devtools
│   ├── lib
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

**assets** - Images (icons live in src/lib/icons).

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
3. Run web app: `npm run web` or `npm run android`
4. Post installation: `npm run postinstall`

<br/>

## Debug Tips

1. Install Android Studio: https://reactnative.dev/docs/set-up-your-environment
2. Delete `.expo`
3. Delete `android`
4. Delete `node_modules`
5. `npm cache clean --force`
6. `npm run install --force`
7. `npm run postinstall`
8. `npm run adb`
9. `npm run android`
10. Test starting the emulator manually: `C:\Users<user>\AppData\Local\Android\Sdk/emulator/emulator -avd Medium_Phone_API_3`

<br/>

## TODO

- Add database
- Add Github workflow
