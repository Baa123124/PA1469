import { Theme } from "@/lib/constants"

declare module "@react-navigation/native" {
  export function useTheme(): Theme
}
