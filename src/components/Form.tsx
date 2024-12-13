import { ViewRef, TextRef } from "@rn-primitives/types"
import * as React from "react"
import { type TextProps, View, type ViewProps } from "react-native"
import { cn } from "@/lib/utils"
import { Button, ButtonProps, ButtonRef } from "./ui/button"
import { Text } from "./ui/text"
import { FieldError, FieldErrors, FieldErrorsImpl, Merge } from "react-hook-form"

const Form = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("items-center justify-center gap-4", className)} {...props} />
))
Form.displayName = "Form"

const FormField = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("w-full max-w-sm gap-1.5 pb-2", className)} {...props} />
))
FormField.displayName = "FormField"

type FormFieldErrorProps = TextProps & {
  errors: Merge<FieldError, FieldErrorsImpl<any>> | FieldError | undefined
}
const FormFieldError = React.forwardRef<TextRef, FormFieldErrorProps>(
  ({ className, errors, ...props }, ref) => {
    if (!errors) {
      return null
    }

    if (errors.message) {
      return (
        <Text ref={ref} className={cn("text-sm text-destructive", className)} {...props}>
          {errors.message as string}
        </Text>
      )
    }

    return Object.entries(errors).map(([key, value]) => {
      const errorMessage = typeof value?.message === "string" ? value.message : null
      if (errorMessage) {
        return (
          <Text
            ref={ref}
            className={cn("text-sm text-destructive", className)}
            {...props}
            key={key}
          >
            {errorMessage}
          </Text>
        )
      }
      return null
    })
  },
)
FormField.displayName = "FormFieldError"

const FormSubmit = React.forwardRef<ButtonRef, ButtonProps>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn("w-full max-w-sm", className)} {...props} />
))
FormSubmit.displayName = "FormSubmit"

export { Form, FormField, FormFieldError, FormSubmit }
export type { FormFieldErrorProps }
