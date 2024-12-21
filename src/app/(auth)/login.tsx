import { AutoImage } from "@/components/AutoImage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { Link, router } from "expo-router"
import { View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema, AuthSchema } from "@/lib/authSchemas"
import { useColorScheme } from "@/lib/useColorScheme"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
import { useAuth } from "@/lib/auth/AuthContext"

export default function LoginScreen() {
  const { isDarkColorScheme } = useColorScheme()
  const { loginWithGoogle, loginWithEmailAndPassword } = useAuth()

  const logo = {
    web: isDarkColorScheme
      ? "../../../assets/images/logo-dark.png"
      : "../../../assets/images/logo-light.png",
    native: isDarkColorScheme
      ? require("../../../assets/images/logo-dark.png")
      : require("../../../assets/images/logo-light.png"),
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Only triggers if formData is valid
  function onSubmit(formData: AuthSchema) {
    loginWithEmailAndPassword(formData.email, formData.password).then((user) => {
      if (user) {
        router.replace("/map")
      }
    })
  }

  function handleGoogleSignIn() {
    loginWithGoogle().then((user) => {
      if (user) {
        router.replace("/map")
      }
    })
  }

  return (
    <View className="flex-1 items-center bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <View className="w-full gap-4 pt-28">
        <View className="items-center gap-4 pb-4">
          <AutoImage webSource={logo.web} nativeSource={logo.native} alt="logo" maxHeight={96} />
          <Text className="text-2xl font-bold">Welcome back!</Text>
        </View>

        <View className="mx-auto w-full max-w-sm rounded-md bg-background px-6 py-12 shadow">
          <Form>
            <FormField>
              <Label nativeID="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    aria-labelledby="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                    className="w-full"
                    inputMode="email"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoComplete="email"
                  />
                )}
              />
              <FormFieldError errors={errors.email} />
            </FormField>

            <FormField>
              <View className="flex-row items-center justify-between">
                <Label nativeID="password">Password</Label>
                <Button
                  variant="link"
                  className="!h-[20px] !px-0 !py-0 text-sm font-medium"
                  onPress={() => {
                    // TODO: Add forgot password
                  }}
                >
                  <Text>Forgot password?</Text>
                </Button>
              </View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    aria-labelledby="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password"
                    className="w-full"
                    secureTextEntry
                    autoCorrect={false}
                    maxLength={20}
                  />
                )}
              />
              <FormFieldError errors={errors.password} />
            </FormField>

            <FormSubmit onPress={handleSubmit(onSubmit)}>
              <Text>Log in</Text>
            </FormSubmit>
            <Button
              variant="outline"
              className="flex w-full max-w-sm flex-row items-center justify-center"
              onPress={() => {
                handleGoogleSignIn()
              }}
            >
              <AutoImage
                webSource={"../../../assets/icons/google.png"}
                nativeSource={require("../../../assets/icons/google.png")}
                alt="Google"
                maxHeight={32}
              />
              <Text>Sign in with Google</Text>
            </Button>
          </Form>
        </View>

        <View className="flex-row items-center justify-center">
          <Text className="text-sm text-muted-foreground">Don't have an account?</Text>
          <Link href="/signup" asChild>
            <Button variant="link" className="!px-2 font-medium">
              <Text>Sign up</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  )
}
