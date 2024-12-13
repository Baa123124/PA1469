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
import { AuthSchema, authSchema } from "@/lib/authSchemas"
import { useColorScheme } from "@/lib/useColorScheme"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
// import { Separator } from "@/components/ui/separator"
// import { ArrowRight } from "@/lib/icons/ArrowRight"

export default function SignupScreen() {
  const { isDarkColorScheme } = useColorScheme()

  // TODO: Add logo-dark image
  const logo = {
    web: isDarkColorScheme
      ? "../../../assets/images/logo-light.png"
      : "../../../assets/images/logo-light.png",
    native: isDarkColorScheme
      ? require("../../../assets/images/logo-light.png")
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
    console.log(formData)
    // TODO: Add authentication
    //router.replace("/map")
  }

  return (
    <View className="flex-1 items-center bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <View className="w-full gap-4 pt-28">
        <View className="items-center gap-4 pb-4">
          <AutoImage webSource={logo.web} nativeSource={logo.native} alt="logo" maxHeight={96} />
          <Text className="text-2xl font-bold">Create an account</Text>
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
                    inputMode="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                    className="w-full"
                  />
                )}
              />
              <FormFieldError errors={errors.email} />
            </FormField>

            <FormField>
              <Label nativeID="password">Password</Label>
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
              <FormFieldError errors={errors.password} />
            </FormField>

            <FormSubmit onPress={handleSubmit(onSubmit)}>
              <Text>Get started</Text>
            </FormSubmit>
            <Button
              variant="outline"
              className="flex w-full max-w-sm flex-row items-center justify-center"
              onPress={() => {
                // TODO: Add Google authentication
                router.replace("/map")
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
          </Form>
        </View>

        <View>
          <View className="flex-row items-center justify-center">
            <Text className="text-sm text-muted-foreground">Already have an account?</Text>
            <Link href="/login" asChild>
              <Button variant="link" className="!px-2 font-medium">
                <Text>Log in</Text>
              </Button>
            </Link>
          </View>
          {/* // TODO: Possibly add guest access */}
          {/* <View className="flex-row items-center justify-center gap-4">
            <Separator className="my-4 w-16" />
            <Text className="text-muted-foreground text-sm">OR</Text>
            <Separator className="my-4 w-16" />
          </View>
          <Link href="/map" asChild>
            <Button
              variant="link"
              className="font-medium !px-2 flex flex-row items-center justify-center gap-1"
            >
              <Text>Continue as guest</Text>
              <ArrowRight className="text-foreground" size={16} strokeWidth={1.25} />
            </Button>
          </Link> */}
        </View>
      </View>
    </View>
  )
}
