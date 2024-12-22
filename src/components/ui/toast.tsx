import { TextStyle, ViewStyle } from "react-native"
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfig,
  ToastProps,
} from "react-native-toast-message"
import { Button, ButtonProps, ButtonRef } from "@/components/ui/button"
import React from "react"
import { X } from "@/lib/icons/X"
import { DarkTheme, LightTheme } from "@/lib/constants"

const CloseButton = React.forwardRef<ButtonRef, ButtonProps>(({ ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    onPress={() => Toast.hide()}
    style={{ position: "absolute", top: 8, right: 8 }}
    {...props}
  >
    <X size={16} strokeWidth={1.25} />
  </Button>
))
CloseButton.displayName = "CloseButton"

function toastConfig(theme: LightTheme | DarkTheme): ToastConfig {
  const { colors } = theme

  const styles = {
    base: {
      backgroundColor: colors.background,
      borderLeftWidth: 0,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 6,
      width: "90%",
      maxWidth: 420,
      height: undefined,
      padding: 16,
    } as ViewStyle,
    container: {
      paddingHorizontal: 0,
    },
    title: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 600,
      color: colors.foreground,
    } as TextStyle,
    description: (props: BaseToastProps) =>
      Object.assign(
        {},
        {
          fontSize: 14,
          lineHeight: 20,
          color: props.text1 === undefined ? colors.foreground : colors.mutedForeground,
        },
      ),
  }

  return {
    default: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={styles.base}
        contentContainerStyle={styles.container}
        text1Style={styles.title}
        text2Style={styles.description(props)}
        renderTrailingIcon={() => <CloseButton />}
      />
    ),
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={Object.assign({}, styles.base, {
          borderLeftWidth: 5,
          borderColor: colors.primary,
        })}
        contentContainerStyle={styles.container}
        text1Style={styles.title}
        text2Style={styles.description(props)}
        renderTrailingIcon={() => <CloseButton />}
      />
    ),
    error: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={Object.assign({}, styles.base, {
          borderLeftWidth: 5,
          borderColor: colors.destructive,
        })}
        contentContainerStyle={styles.container}
        text1Style={styles.title}
        text2Style={styles.description(props)}
        renderTrailingIcon={() => <CloseButton />}
      />
    ),
  }
}

export { toastConfig }

type ShowToastProps = ToastProps & {
  type?: "default" | "success" | "error"
  title?: string
  description: string
  duration?: number // ms
  position?: "top" | "bottom"
}

const showToast = ({
  type = "default",
  title,
  description,
  duration = 5000,
  position = "top",
  ...props
}: ShowToastProps) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
    visibilityTime: duration,
    position,
    ...props,
  })
}

export { showToast }
