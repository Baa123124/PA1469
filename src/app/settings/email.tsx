import { TopNav, TopNavRoute } from "@/components/TopNav"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { ChangeEmailSchema, changeEmailSchema } from "./(data)/schemas"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { goBack } from "@/lib/goBack"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"

export default function CacheRangeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
    },
  })

  function onSubmit(formData: ChangeEmailSchema) {
    console.log(formData)
    // TODO: Send confirmation email
    goBack() // if valid go back to previous screen
    // TODO: Add success toast
  }

  return (
    <View className="flex-1 bg-secondary/30 gap-8" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav>
        <TopNavRoute>Email</TopNavRoute>
      </TopNav>

      <Form>
        <FormField>
          <Label nativeID="newEmail">New email</Label>
          <Controller
            control={control}
            name="newEmail"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                aria-labelledby="newEmail"
                inputMode="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your new email"
                className="w-full"
              />
            )}
          />
          {errors.newEmail && <FormFieldError>{errors.newEmail.message}</FormFieldError>}
        </FormField>

        <FormField>
          <Label nativeID="confirmEmail">Confirm email</Label>
          <Controller
            control={control}
            name="confirmEmail"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                aria-labelledby="confirmEmail"
                inputMode="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm your new email"
                className="w-full"
              />
            )}
          />
          {errors.confirmEmail && <FormFieldError>{errors.confirmEmail.message}</FormFieldError>}
        </FormField>

        <FormSubmit onPress={handleSubmit(onSubmit)}>
          <Text>Send link</Text>
        </FormSubmit>
      </Form>
    </View>
  )
}
