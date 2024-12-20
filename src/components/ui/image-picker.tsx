import * as React from "react"
import { Button, ButtonProps, ButtonRef } from "./button"
import {
  ImagePickerAsset,
  ImagePickerOptions,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker"

type ImagePickerProps = ButtonProps & {
  image: ImagePickerAsset | null
  setImage: React.Dispatch<React.SetStateAction<ImagePickerAsset | null>>
  options?: ImagePickerOptions
}

/**
 * @see [Documentation]{@link https://docs.expo.dev/versions/latest/sdk/imagepicker}
 */
const ImagePicker = React.forwardRef<ButtonRef, ImagePickerProps>(
  ({ image, setImage, options, ...props }, ref) => {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        ...options,
      })

      if (!result.canceled) {
        const asset = result.assets[0]

        if (!asset.fileSize) {
          const img = await fetch(asset.uri)
          const blob = await img.blob()
          asset.fileSize = blob.size
        }

        setImage(asset)
      }
    }

    return <Button ref={ref} onPress={pickImage} {...props} />
  },
)
ImagePicker.displayName = "ImagePicker"

export { ImagePicker, type ImagePickerProps }
