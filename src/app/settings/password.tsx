import { TopNav, TopNavBackButton, TopNavRoute } from "@/components/TopNav"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { ChangePasswordSchema, changePasswordSchema } from "./(data)/schemas"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { goBack } from "@/utils/goBack"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"

export default function PasswordSettingsScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(formData: ChangePasswordSchema) {
    console.log(formData)
    // TODO: Send confirmation email
    goBack() // if valid go back to previous screen
    // TODO: Update user settings
    // TODO: Add success toast
  }

  return (
    <View className="flex-1 gap-8 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav>
        <TopNavBackButton />
        <TopNavRoute>Password</TopNavRoute>
      </TopNav>

      <Form>
        <FormField>
          <Label nativeID="currentPassword">Current password</Label>
          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                aria-labelledby="currentPassword"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your current password"
                className="w-full"
                secureTextEntry
                autoCorrect={false}
                maxLength={20}
              />
            )}
          />
          <FormFieldError errors={errors.currentPassword} />
        </FormField>

        <FormField>
          <Label nativeID="newPassword">New password</Label>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                aria-labelledby="newPassword"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your new password"
                className="w-full"
                secureTextEntry
                autoCorrect={false}
                maxLength={20}
              />
            )}
          />
          <FormFieldError errors={errors.newPassword} />
        </FormField>

        <FormField>
          <Label nativeID="confirmPassword">Confirm password</Label>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                aria-labelledby="confirmPassword"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm your new password"
                className="w-full"
                secureTextEntry
                autoCorrect={false}
                maxLength={20}
              />
            )}
          />
          <FormFieldError errors={errors.confirmPassword} />
        </FormField>

        <FormSubmit onPress={handleSubmit(onSubmit)}>
          <Text>Send link</Text>
        </FormSubmit>
      </Form>
    </View>
  )
}
