# References

## General

- The **boilerplate** project structure and code is from [Ignite](https://github.com/infinitered/ignite).
- All **prebuilt components** in `src/components/ui` are from [React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/).
- All **icons** in `src/lib/icons` are from [Lucide](https://lucide.dev/).

<br/>

## Specific

- The code in `src/app/(tabs)/_layout.tsx` is a combination of [React Native Reusables](https://github.com/mrzachnugent/react-native-reusables/blob/main/packages/templates/starter-base/app/_layout.tsx) and [Ignite](https://github.com/infinitered/ignite/blob/master/boilerplate/src/app/_layout.tsx).

- The **passwordSchema** in `src/app/(auth)/schema.ts` is adapted from a [GitHub discussion](https://github.com/colinhacks/zod/discussions/3412), published June 30, 2024.

- The **form validation** in `src/app/(auth)/login.tsx` and `src/app/(auth)/signup.tsx` was implemented with insights from this blog post:
  [Building a Robust Form in React Native](https://medium.com/@rutikpanchal121/building-a-robust-form-in-react-native-with-react-hook-form-and-zod-for-validation-7583678970c3) by **Rutikpanchal**, published September 11, 2024.

- The `src/app/(auth)/login.tsx` and `src/app/(auth)/signup.tsx` screens were inspired by [Shadcnblocks](https://www.shadcnblocks.com/blocks?group=login)