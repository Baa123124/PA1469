import { TopNav, TopNavRoute } from "@/components/TopNav"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { cacheRange } from "./(data)/schemas"
import { Label } from "@/components/ui/label"
import { goBack } from "@/utils/goBack"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
import { dummyUser } from "@/lib/dummyUser"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"

// ! I have spent too much time trying to implement a slider, so I'm using a select instead
// Slider is not yet fully supported by RNR, missing gesture handling
// Expo recommends @react-native-community/slider, however it is not very customizable
// I tried some 3rd party sliders, but couldn't get them to work

export default function CacheRangeSettingsScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cacheRange),
    defaultValues: {
      minRange: dummyUser.minCacheRange.toString(),
      maxRange: dummyUser.maxCacheRange.toString(),
    },
  })

  const options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  }

  function onSubmit(formData: { minRange: string; maxRange: string }) {
    console.log(formData)
    goBack()
    // TODO: Update user settings
    // TODO: Add success toast
  }

  return (
    <View className="flex-1 gap-8 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav>
        <TopNavRoute>Cache range</TopNavRoute>
      </TopNav>

      <Form>
        <FormField>
          <Label nativeID="minRange">Min range (km)</Label>
          <Controller
            control={control}
            name="minRange"
            render={({ field: { onChange, value } }) => (
              <Select
                aria-labelledby="minRange"
                defaultValue={{
                  value: dummyUser.minCacheRange.toString(),
                  label: dummyUser.minCacheRange.toString(),
                }}
                value={{
                  value: value,
                  label: value,
                }}
                onValueChange={(option) => onChange(option?.value)}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue
                    className="native:text-lg text-sm text-foreground"
                    placeholder="Select range"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-[250px]">
                  <ScrollView>
                    <SelectGroup>
                      {options.map((option, index) => (
                        <SelectItem key={index} label={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            )}
          />
          <FormFieldError errors={errors.minRange} />
        </FormField>

        <FormField>
          <Label nativeID="maxRange">Max range (km)</Label>
          <Controller
            control={control}
            name="maxRange"
            render={({ field: { onChange, value } }) => (
              <Select
                aria-labelledby="maxRange"
                defaultValue={{
                  value: dummyUser.maxCacheRange.toString(),
                  label: dummyUser.maxCacheRange.toString(),
                }}
                value={{
                  value: value,
                  label: value,
                }}
                onValueChange={(option) => onChange(option?.value)}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue
                    className="native:text-lg text-sm text-foreground"
                    placeholder="Select range"
                  />
                </SelectTrigger>
                <SelectContent className="w-[250px]">
                  <ScrollView>
                    <SelectGroup>
                      {options.slice(1).map((option, index) => {
                        return (
                          <SelectItem key={index} label={option} value={option}>
                            {option}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            )}
          />
          <FormFieldError errors={errors.maxRange} />
        </FormField>

        <FormSubmit onPress={handleSubmit(onSubmit)}>
          <Text>Save changes</Text>
        </FormSubmit>
      </Form>
    </View>
  )
}
