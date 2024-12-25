# References

## General

- The **boilerplate** project structure and code is from [Ignite](https://github.com/infinitered/ignite).
- All **prebuilt components** in `src/components/ui` are from [React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/).
- All **icons** in `src/lib/icons` are from [Lucide](https://lucide.dev/).
- All the **documentation** used throughout the project is listed at the top of the `README` file.

<br/>

## Specific

- The code in `src/app/(tabs)/_layout.tsx` is a combination of [React Native Reusables](https://github.com/mrzachnugent/react-native-reusables/blob/main/packages/templates/starter-base/app/_layout.tsx) and [Ignite](https://github.com/infinitered/ignite/blob/master/boilerplate/src/app/_layout.tsx).

- The **passwordSchema** in `src/app/lib/authSchema` is adapted from a [GitHub discussion](https://github.com/colinhacks/zod/discussions/3412), published June 30, 2024.

- The **form validation** in `src/app/(auth)/login.tsx` and `src/app/(auth)/signup.tsx` was implemented with insights from this blog post:
  [Building a Robust Form in React Native](https://medium.com/@rutikpanchal121/building-a-robust-form-in-react-native-with-react-hook-form-and-zod-for-validation-7583678970c3) by _Rutikpanchal_, published September 11, 2024.

- The `src/app/(auth)/login.tsx` and `src/app/(auth)/signup.tsx` screens were inspired by [Shadcnblocks](https://www.shadcnblocks.com/blocks?group=login).

- The `src/components/ui/image-picker` was implemented with insights from the [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) documentation.

- The `src/app/settings/index.tsx` screen was inspired by [Account settings for Uscreen](https://dribbble.com/shots/24363948-Account-settings-for-Uscreen) by _Danilo Tanic_ on Dribbble.

- The individual settings screens were inspired by [Snapchat Android](https://play.google.com/store/apps/details?id=com.snapchat.android&hl=en-US).

- The `src/app/profile/[id].tsx` screen was inspired by [Profile Page](https://dribbble.com/shots/23681946-Profile-Page) by _Vishnu Prasad_ on Dribbble.

- The **table** and **dropdown-menu** in `src/app/(tabs)/caches/index` is adapted from the React Native Reusables documentation: [Table](https://rnr-docs.vercel.app/components/table/) and [Dropdown Menu](https://rnr-docs.vercel.app/components/dropdown-menu/).
