import { ViewRef, TextRef } from "@rn-primitives/types"
import * as React from "react"
import { type TextProps, View, type ViewProps } from "react-native"
import { cn } from "@/lib/utils"
import { Button, ButtonProps, ButtonRef } from "./ui/button"
import { Text } from "./ui/text"
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

/**
 * A container component for a form.
 *
 * @child FormField
 * @param {ViewProps} props - Props passed to a `View` component.
 */
const Form = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("items-center justify-center gap-4", className)} {...props} />
))
Form.displayName = "Form"

/**
 * A container component for a single form field.
 *
 * @parent Form
 * @child Label
 * @child [Controller](https://www.react-hook-form.com/api/usecontroller/controller/)
 * @child FormFieldError
 * @param {ViewProps} props - Props passed to a `View` component.
 */
const FormField = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("w-full max-w-sm gap-2 pb-2", className)} {...props} />
))
FormField.displayName = "FormField"

type FormFieldErrorProps = TextProps & {
  errors: Merge<FieldError, FieldErrorsImpl<any>> | FieldError | undefined
}
/**
 * A component to display form field error messages.
 *
 * @parent FormField
 * @see [Documentation](https://www.react-hook-form.com/get-started/#Handleerrors)
 * @param {FormFieldErrorProps} errors - The formState.errors object returned by the `useForm` hook.
 * @param {TextProps} props - Props passed to a `Text` component.
 * @returns {JSX.Element|null} Returns `null` if there are no errors.
 */
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

/**
 * A button component for form submission.
 *
 * @see [Documentation](https://react-hook-form.com/docs/useform/handlesubmit)
 * @param {ButtonProps} props - Props passed to a `Button` component.
 */
const FormSubmit = React.forwardRef<ButtonRef, ButtonProps>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn("w-full max-w-sm", className)} {...props} />
))
FormSubmit.displayName = "FormSubmit"

export { Form, FormField, FormFieldError, FormSubmit }
export type { FormFieldErrorProps }
