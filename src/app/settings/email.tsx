import { TopNav, TopNavBackButton, TopNavRoute } from "@/components/TopNav"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { ChangeEmailSchema, changeEmailSchema } from "@/lib/settingsSchema"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { goBack } from "@/utils/goBack"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
import { showToast } from "@/components/ui/toast"

export default function EmailSettingsScreen() {
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
    // TODO: Update user settings
    showToast({
      type: "success",
      description: "Email updated successfully",
      position: "bottom",
    })
  }

  return (
    <View className="flex-1 gap-8 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav>
        <TopNavBackButton />
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
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your new email"
                className="w-full"
                inputMode="email"
                keyboardType="email-address"
                autoCorrect={false}
                autoComplete="email"
              />
            )}
          />
          <FormFieldError errors={errors.newEmail} />
        </FormField>

        <FormField>
          <Label nativeID="confirmEmail">Confirm email</Label>
          <Controller
            control={control}
            name="confirmEmail"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                aria-labelledby="confirmEmail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm your new email"
                className="w-full"
                inputMode="email"
                keyboardType="email-address"
                autoCorrect={false}
                autoComplete="email"
              />
            )}
          />
          <FormFieldError errors={errors.confirmEmail} />
        </FormField>

        <FormSubmit onPress={handleSubmit(onSubmit)}>
          <Text>Send link</Text>
        </FormSubmit>
      </Form>
    </View>
  )
}
