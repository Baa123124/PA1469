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
import { AuthSchema, authSchema } from "./schema"
import { useColorScheme } from "@/lib/useColorScheme"
import { useEffect } from "react"
import { useAuth } from "@/lib/auth/authContext"

export default function LoginScreen() {
  const { isDarkColorScheme } = useColorScheme()
  const auth = useAuth();
  // TODO: change this to actual auth session
  const authSession = false

  // TODO: Add logo-dark image
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

  useEffect(() => {
    if (authSession) {
      router.replace("/map")
    }
  }, [])

  // Only triggers if formData is valid
  function onSubmit(formData: AuthSchema) {
    console.log(formData)
    // TODO: Add authentication
    //router.replace("/map")
  }

  function handleGoogleSignIn() { 
    auth.loginWithGoogle().then((user) => {
      if (user) {
        router.replace("/map")
      }
    })
  }

  return (
    <View className="flex-1 bg-secondary/30 items-center" style={useSafeAreaInsetsStyle(["top"])}>
      <View className="gap-4 w-full pt-32">
        <View className="items-center pb-2">
          <AutoImage
            webSource={logo.web}
            nativeSource={logo.native}
            alt="logo"
            maxHeight={96}
            className="mb-4"
          />
          <Text className="text-2xl font-bold">Welcome back!</Text>
        </View>

        <View className="mx-auto w-full max-w-sm rounded-md bg-background px-6 py-12 shadow">
          <View className="grid gap-4">
            <View className="grid w-full max-w-sm gap-1.5">
              <Label nativeID="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    aria-labelledby="email"
                    inputMode="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                    className="w-full"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-destructive text-sm">{errors.email.message}</Text>
              )}
            </View>
            <View>
              <View className="grid w-full max-w-sm gap-1.5">
                <View className="flex-row items-center justify-between">
                  <Label nativeID="password">Password</Label>
                  <Button
                    variant="link"
                    className="font-medium text-sm !px-0 !py-0 !h-[20px]"
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
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter your password"
                      className="w-full"
                    />
                  )}
                />
                {errors.password && (
                  <Text className="text-destructive text-sm">{errors.password.message}</Text>
                )}
              </View>
            </View>

            <Button onPress={handleSubmit(onSubmit)} className="mt-2 w-full">
              <Text>Log in</Text>
            </Button>
            <Button
              variant="outline"
              className="w-full flex flex-row items-center justify-center"
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
              <Text>Sign up with Google</Text>
            </Button>
          </View>
        </View>

        <View className="flex-row items-center justify-center">
          <Text className="text-muted-foreground text-sm">Don't have an account?</Text>
          <Link href="/signup" asChild>
            <Button variant="link" className="font-medium !px-2">
              <Text>Sign up</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  )
}
