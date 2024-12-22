import { TopNav, TopNavBackButton, TopNavRoute } from "@/components/TopNav"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Platform, View } from "react-native"
import { ThemeSchema, themeSchema } from "./(data)/schemas"
import { Label } from "@/components/ui/label"
import { goBack } from "@/utils/goBack"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
import { Sun } from "@/lib/icons/Sun"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MoonStar } from "@/lib/icons/MoonStar"
import { Button } from "@/components/ui/button"
import { Settings } from "@/lib/icons/Settings"
import { useColorScheme } from "@/lib/useColorScheme"
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar"
import { dummyUser } from "@/lib/dummyUser"

export default function ThemeSettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(themeSchema),
    defaultValues: { theme: dummyUser.theme },
  })

  function onSubmit(formData: ThemeSchema) {
    console.log(formData)
    goBack()
    const colorTheme = formData.theme === "system" ? colorScheme : formData.theme
    setColorScheme(formData.theme)
    setAndroidNavigationBar(colorTheme)
    // TODO: Update user settings
  }

  return (
    <View className="flex-1 gap-8 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav>
        <TopNavBackButton />
        <TopNavRoute>Theme</TopNavRoute>
      </TopNav>

      <Form>
        <FormField className="max-w-full">
          <Label nativeID="theme" className="!pl-[40px]">
            Color theme
          </Label>
          <Controller
            control={control}
            name="theme"
            render={({ field: { onChange, value } }) => (
              <View>
                <RadioGroup value={value} onValueChange={onChange} asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex-row justify-between !px-[40px]"
                    onPress={() => onChange("light")}
                  >
                    <View className="flex-row items-center gap-2">
                      <Sun size={16} strokeWidth={1.25} />
                      <Label
                        nativeID="light"
                        className="font-normal web:cursor-pointer"
                        onPress={() => onChange("light")}
                      >
                        Light
                      </Label>
                    </View>
                    <RadioGroupItem aria-labelledby="light" value="light" />
                  </Button>
                </RadioGroup>

                <RadioGroup value={value} onValueChange={onChange} asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex-row justify-between !px-[40px]"
                    onPress={() => onChange("dark")}
                  >
                    <View className="flex-row items-center gap-2">
                      <MoonStar size={16} strokeWidth={1.25} />
                      <Label
                        nativeID="dark"
                        className="font-normal web:cursor-pointer"
                        onPress={() => onChange("dark")}
                      >
                        Dark
                      </Label>
                    </View>
                    <RadioGroupItem aria-labelledby="dark" value="dark" />
                  </Button>
                </RadioGroup>

                <RadioGroup value={value} onValueChange={onChange} asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex-row justify-between !px-[40px]"
                    onPress={() => onChange("system")}
                  >
                    <View className="flex-row items-center gap-2">
                      <Settings size={16} strokeWidth={1.25} />
                      <Label
                        nativeID="system"
                        className="font-normal web:cursor-pointer"
                        onPress={() => onChange("system")}
                      >
                        System
                      </Label>
                    </View>
                    <RadioGroupItem aria-labelledby="system" value="system" />
                  </Button>
                </RadioGroup>
              </View>
            )}
          />
          <FormFieldError errors={errors.theme} />
        </FormField>

        <FormSubmit onPress={handleSubmit(onSubmit)}>
          <Text>Save changes</Text>
        </FormSubmit>
      </Form>
    </View>
  )
}
