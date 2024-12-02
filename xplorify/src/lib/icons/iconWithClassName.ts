import * as React from "react"
import type { LucideIcon } from "lucide-react-native"
import { cssInterop } from "nativewind"

type IconProps = React.ComponentProps<LucideIcon> & {
  className?: string
}

export function iconWithClassName(Icon: LucideIcon): React.FC<IconProps> {
  cssInterop(Icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })

  return (props) => React.createElement(Icon, props)
}
