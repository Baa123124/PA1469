import * as React from "react"
import { Button, ButtonProps, ButtonRef } from "./button"
import { ImagePickerOptions, launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker"

type ImagePickerProps = ButtonProps & {
  image: string | null
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  imagePickerOptions?: ImagePickerOptions
}

/**
 * @see [Documentation]{@link https://docs.expo.dev/versions/latest/sdk/imagepicker}
 */
const ImagePicker = React.forwardRef<ButtonRef, ImagePickerProps>(
  ({ image, setImage, imagePickerOptions, ...props }, ref) => {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        ...imagePickerOptions,
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    }

    return <Button ref={ref} onPress={pickImage} {...props} />
  },
)
ImagePicker.displayName = "ImagePicker"

export { ImagePicker, type ImagePickerProps }
