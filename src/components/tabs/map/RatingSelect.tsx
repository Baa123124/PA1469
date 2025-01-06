import { Star } from "@/lib/icons/Star"
import { cn } from "@/lib/utils"
import { ViewRef } from "@rn-primitives/types"
import React from "react"
import { View, ViewProps } from "react-native"

type RatingSelectProps = ViewProps & {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}
const RatingSelect = React.forwardRef<ViewRef, RatingSelectProps>(
  ({ className, value, setValue, ...props }, ref) => (
    <View ref={ref} className={cn("flex-row gap-4", className)} {...props}>
      {Array.from({ length: 5 }, (_, index) => {
        if (index + 1 <= value) {
          return (
            <Star
              key={index}
              size={16}
              strokeWidth={1.25}
              className="fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500"
              onPress={() => setValue(index + 1)}
            />
          )
        } else {
          return (
            <Star
              key={index}
              size={16}
              strokeWidth={1.25}
              className=""
              onPress={() => setValue(index + 1)}
            />
          )
        }
      })}
    </View>
  ),
)
RatingSelect.displayName = "RatingSelect"

export { RatingSelect }
