import { ViewRef, TextRef } from "@rn-primitives/types"
import * as React from "react"
import { type TextProps, View, type ViewProps } from "react-native"
import { cn } from "@/lib/utils"
import { Button, ButtonProps, ButtonRef } from "./ui/button"
import { Text } from "./ui/text"

const Form = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("items-center justify-center gap-4", className)} {...props} />
))
Form.displayName = "Form"

const FormField = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("w-full max-w-sm gap-1.5", className)} {...props} />
))
FormField.displayName = "FormField"

const FormFieldError = React.forwardRef<TextRef, TextProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn("text-destructive text-sm", className)} {...props} />
))
FormField.displayName = "FormFieldError"

const FormSubmit = React.forwardRef<ButtonRef, ButtonProps>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn("mt-2 w-full max-w-sm", className)} {...props} />
))
FormSubmit.displayName = "FormSubmit"

export { Form, FormField, FormFieldError, FormSubmit }
