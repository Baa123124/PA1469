import { TopNav, TopNavBackButton, TopNavRoute } from "@/components/TopNav"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { ProfileSchema, profileSchema } from "@/lib/settingsSchema"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { goBack } from "@/utils/goBack"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
import { dummyAvatarRaw, dummyBannerRaw, dummyUser } from "@/lib/dummyUser"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AutoImage } from "@/components/AutoImage"
import { ImagePicker } from "@/components/ui/image-picker"
import { showToast } from "@/components/ui/toast"

// TODO: Change dummyUser to actual user

export default function ProfileSettingsScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: dummyUser.displayName,
      description: dummyUser.description,
      avatar: dummyAvatarRaw,
      banner: dummyBannerRaw,
    },
  })

  function onSubmit(formData: ProfileSchema) {
    console.log(formData)
    goBack()
    // TODO: Update user settings
    showToast({
      type: "success",
      description: "Profile updated successfully",
      position: "bottom",
    })
  }

  return (
    <View className="flex-1 gap-8 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav>
        <TopNavBackButton />
        <TopNavRoute>Profile</TopNavRoute>
      </TopNav>

      <Form>
        <FormField>
          <Label nativeID="displayName">Display name</Label>
          <Controller
            control={control}
            name="displayName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                aria-labelledby="displayName"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter display name"
                className="w-full"
                inputMode="text"
                maxLength={20}
              />
            )}
          />
          <FormFieldError errors={errors.displayName} />
        </FormField>

        <FormField>
          <Label nativeID="description">Description</Label>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                aria-labelledby="description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter description"
                className="w-full"
                inputMode="text"
                maxLength={200}
              />
            )}
          />
          <FormFieldError errors={errors.description} />
        </FormField>

        <FormField>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange, value } }) => (
              <FormField>
                <View className="flex-row items-center justify-between">
                  <Label nativeID="avatar">Avatar</Label>
                  <ImagePicker
                    variant="link"
                    className="!h-[20px] !px-0 !py-0"
                    image={value}
                    setImage={onChange}
                  >
                    <Text>Edit</Text>
                  </ImagePicker>
                </View>
                <ImagePicker
                  variant="ghost"
                  className="mx-auto !h-[96px] !px-0 !py-0"
                  image={value}
                  setImage={onChange}
                  options={{
                    allowsEditing: true,
                    aspect: [1, 1],
                  }}
                >
                  <Avatar alt="profile avatar" className="mx-auto !h-[96px] !w-[96px]">
                    <AvatarImage source={value} />
                    <AvatarFallback>
                      <Text>Avatar</Text>
                    </AvatarFallback>
                  </Avatar>
                </ImagePicker>
              </FormField>
            )}
          />
          <FormFieldError errors={errors.avatar} />
        </FormField>

        <FormField>
          <Controller
            control={control}
            name="banner"
            render={({ field: { onChange, value } }) => (
              <FormField>
                <View className="flex-row items-center justify-between">
                  <Label nativeID="banner">Banner</Label>
                  <ImagePicker
                    variant="link"
                    className="!h-[20px] !px-0 !py-0"
                    image={value}
                    setImage={onChange}
                  >
                    <Text>Edit</Text>
                  </ImagePicker>
                </View>
                <ImagePicker
                  variant="ghost"
                  className="mx-auto !h-[192px] !px-0 !py-0"
                  image={value}
                  setImage={onChange}
                  options={{
                    allowsEditing: true,
                    aspect: [2, 1],
                  }}
                >
                  <AutoImage
                    source={value}
                    aria-labelledby="banner"
                    className="!max-h-[192px] max-w-sm"
                  />
                </ImagePicker>
              </FormField>
            )}
          />
          <FormFieldError errors={errors.banner} />
        </FormField>

        <FormSubmit onPress={handleSubmit(onSubmit)}>
          <Text>Save changes</Text>
        </FormSubmit>
      </Form>
    </View>
  )
}
