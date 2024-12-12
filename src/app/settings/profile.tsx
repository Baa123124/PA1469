import { TopNav, TopNavRoute } from "@/components/TopNav"
import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { ProfileSchema, profileSchema } from "./(data)/schemas"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { goBack } from "@/utils/goBack"
import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
import { dummyUser } from "@/lib/dummyUser"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AutoImage } from "@/components/AutoImage"
import { ImagePicker } from "@/components/ui/image-picker"

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
      avatar: dummyUser.avatar,
      banner: dummyUser.banner,
    },
  })

  function onSubmit(formData: ProfileSchema) {
    console.log(formData)
    goBack()
    // TODO: Update user settings
    // TODO: Add success toast
  }

  return (
    <View className="flex-1 bg-secondary/30 gap-8" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav>
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
                inputMode="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your new display name"
                className="w-full"
              />
            )}
          />
          {errors.displayName && <FormFieldError>{errors.displayName.message}</FormFieldError>}
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
                placeholder="Enter your new description"
                className="w-full"
              />
            )}
          />
          {errors.description && <FormFieldError>{errors.description.message}</FormFieldError>}
        </FormField>

        <FormField>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange, value } }) => (
              <FormField>
                <View className="flex-row justify-between items-center">
                  <Label nativeID="avatar">Avatar</Label>
                  <ImagePicker
                    variant="link"
                    className="!px-0 !py-0 !h-[20px]"
                    image={value}
                    setImage={onChange}
                  >
                    <Text>Edit</Text>
                  </ImagePicker>
                </View>
                <ImagePicker
                  variant="ghost"
                  className="!h-[96px] mx-auto !px-0 !py-0"
                  image={value}
                  setImage={onChange}
                >
                  <Avatar alt="profile avatar" className="!w-[96px] !h-[96px] mx-auto">
                    <AvatarImage
                      source={{
                        uri: value,
                      }}
                    />
                    <AvatarFallback>
                      <Text>Avatar</Text>
                    </AvatarFallback>
                  </Avatar>
                </ImagePicker>
              </FormField>
            )}
          />
          {errors.avatar && <FormFieldError>{errors.avatar.message}</FormFieldError>}
        </FormField>

        <FormField>
          <Controller
            control={control}
            name="banner"
            render={({ field: { onChange, value } }) => (
              <FormField>
                <View className="flex-row justify-between items-center">
                  <Label nativeID="banner">Banner</Label>
                  <ImagePicker
                    variant="link"
                    className="!px-0 !py-0 !h-[20px]"
                    image={value}
                    setImage={onChange}
                  >
                    <Text>Edit</Text>
                  </ImagePicker>
                </View>
                <ImagePicker
                  variant="ghost"
                  className="!h-[192px] mx-auto !px-0 !py-0"
                  image={value}
                  setImage={onChange}
                >
                  <AutoImage
                    source={{ uri: value }}
                    aria-labelledby="banner"
                    className="max-w-sm !max-h-[192px]"
                  />
                </ImagePicker>
              </FormField>
            )}
          />
          {errors.banner && <FormFieldError>{errors.banner.message}</FormFieldError>}
        </FormField>

        <FormSubmit onPress={handleSubmit(onSubmit)}>
          <Text>Save changes</Text>
        </FormSubmit>
      </Form>
    </View>
  )
}
