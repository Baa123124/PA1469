import * as React from "react"
import { View } from "react-native"
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from "react-native-reanimated"
import { Info } from "@/lib/icons/Info"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Text } from "@/components/ui/text"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAuth } from "@/lib/auth/AuthContext"

const ANONYMOUS_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg"

export default function MapScreen() {
  const [progress, setProgress] = React.useState(78)
  const {user, logout} = useAuth()

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100))
  }

  return (
    <View className="flex-1 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <ThemeToggle />

      <View className="flex-1 justify-center items-center gap-5 p-6">
        <Card className="w-full max-w-sm p-6 rounded-2xl">
          <CardHeader className="items-center">
            <Avatar alt="Rick Sanchez's Avatar" className="w-24 h-24">
              <AvatarImage source={{ uri: user?.photoURL ? user.photoURL : ANONYMOUS_AVATAR_URI }} />
              <AvatarFallback>
                <Text>RS</Text>
              </AvatarFallback>
            </Avatar>
            <View className="p-3" />
            <CardTitle className="pb-2 text-center">{user?.displayName}</CardTitle>
            <View className="flex-row">
              <CardDescription className="text-base font-semibold">{user?.email}</CardDescription>
            </View>
          </CardHeader>

          <CardContent>
            <View className="flex-row justify-around gap-3">
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Dimension</Text>
                <Text className="text-xl font-semibold">C-137</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Age</Text>
                <Text className="text-xl font-semibold">70</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Species</Text>
                <Text className="text-xl font-semibold">Human</Text>
              </View>
            </View>
          </CardContent>

          <CardFooter className="flex-col gap-3 pb-0">
            <View className="flex-row items-center overflow-hidden">
              <Text className="text-sm text-muted-foreground">Productivity:</Text>
              <LayoutAnimationConfig skipEntering>
                <Animated.View
                  key={progress}
                  entering={FadeInUp}
                  exiting={FadeOutDown}
                  className="w-11 items-center"
                >
                  <Text className="text-sm font-bold text-sky-600">{progress}%</Text>
                </Animated.View>
              </LayoutAnimationConfig>
            </View>
            <Progress value={progress} className="h-2" indicatorClassName="bg-sky-600" />
            <View />
            <View className="flex flex-row gap-2">
              <Button
                variant="outline"
                className="shadow shadow-foreground/5"
                onPress={updateProgressValue}
              >
                <Text>Update</Text>
              </Button>
              <Button
                variant="outline"
                className="shadow shadow-foreground/5"
                onPress={logout}
              >
                <Text>Logout</Text>
              </Button>
            </View>
          </CardFooter>
        </Card>
      </View>
    </View>
  )
}
