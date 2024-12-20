import React, { LegacyRef, useLayoutEffect, useState } from "react"
import { Image, ImageProps, ImageSourcePropType, ImageURISource, Platform } from "react-native"

type AutoImageProps = ImageProps & {
  maxWidth?: number
  maxHeight?: number

  // can be a local image or a remote image
  // no relative path required
  // example: "/assets/images/logo.png"
  webSource?: string

  // can only be a local image
  // requires relative path and "require" syntax
  // example: require("../../../assets/images/logo.png")
  nativeSource?: ImageSourcePropType

  // for remote images, use the default source prop from the Image component
  // example: source={{ uri: "https://example.com/image.png" }}
}

/**
 * A hook that will return the scaled dimensions of an image based on the
 * provided dimensions' aspect ratio. If no desired dimensions are provided,
 * it will return the original dimensions of the remote image.
 *
 * How is this different from `resizeMode: 'contain'`? Firstly, you can
 * specify only one side's size (not both). Secondly, the image will scale to fit
 * the desired dimensions instead of just being contained within its image-container.
 */
function useAutoImage(
  src: ImageSourcePropType,
  dimensions?: [maxWidth?: number, maxHeight?: number],
): [width: number, height: number] {
  const [[width, height], setRemoteImageDimensions] = useState([0, 0])
  const remoteAspectRatio = width / height
  const [maxWidth, maxHeight] = dimensions ?? []

  useLayoutEffect(() => {
    if (!src) return

    if (typeof src === "object" && "uri" in src) {
      Image.getSize(src.uri as string, (w, h) => setRemoteImageDimensions([w, h]))
    } else {
      Platform.select({
        web: () => {
          Image.getSize(src as string, (w, h) => setRemoteImageDimensions([w, h]))
        },
        default: () => {
          const source = Image.resolveAssetSource(src)
          setRemoteImageDimensions([source.width, source.height])
        },
      })()
    }
  }, [src])

  if (Number.isNaN(remoteAspectRatio)) return [0, 0]

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(maxWidth / width, maxHeight / height)
    return [width * aspectRatio, height * aspectRatio]
  } else if (maxWidth) {
    return [maxWidth, maxWidth / remoteAspectRatio]
  } else if (maxHeight) {
    return [maxHeight * remoteAspectRatio, maxHeight]
  } else {
    return [width, height]
  }
}

/**
 * An Image component that automatically sizes an image.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/AutoImage/}
 */
const AutoImage = React.forwardRef<React.ComponentPropsWithoutRef<typeof Image>, AutoImageProps>(
  ({ maxWidth, maxHeight, webSource, nativeSource, ...props }, ref) => {
    const src = props.source
      ? props.source
      : (Platform.select({
          web: webSource as ImageSourcePropType,
          default: nativeSource,
        }) as ImageURISource)

    const [width, height] = useAutoImage(src, [maxWidth, maxHeight])

    return (
      <Image
        ref={ref as LegacyRef<Image>}
        {...props}
        source={src}
        style={[{ width, height }, props.style]}
      />
    )
  },
)
AutoImage.displayName = "AutoImage"

export { AutoImage, useAutoImage, type AutoImageProps }
