import { AutoImage } from "@/components/AutoImage"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Text } from "@/components/ui/text"
import { dummyCache, dummyUser } from "@/lib/dummyUser"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { View } from "react-native"
import { format } from "date-fns/format"
import { CalendarRange } from "@/lib/icons/CalendarRange"
import { MapPin } from "@/lib/icons/MapPin"
import { Star } from "@/lib/icons/Star"
import { Flame } from "@/lib/icons/Flame"
import { TopNav, TopNavBackButton, TopNavSettingsButton } from "@/components/TopNav"
import { useLocalSearchParams } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"
import { CacheGroup, CacheImage, Caches } from "@/components/tabs/profile/Caches"
import { useAuth } from "@/lib/auth/AuthContext"

// TODO: Link caches to map view

export default function ProfileScreen() {
  const params = useLocalSearchParams<{ id: string; back?: "true" }>()
  const { user } = useAuth()
  const creationTime = user?.metadata.creationTime ?? ""

  return (
    <View className="flex-1 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <ScrollView>
        <View className="relative !h-[240px]">
          <AutoImage
            source={dummyUser.banner}
            aria-labelledby="banner"
            className="!max-h-[192px] max-w-full"
          />

          <TopNav className="absolute justify-between">
            {params.back === "true" ? <TopNavBackButton variant="outline" /> : null}
            <TopNavSettingsButton variant="outline" className="ml-auto" />
          </TopNav>

          <Avatar alt="profile avatar" className="absolute bottom-0 left-6 !h-[96px] !w-[96px]">
            <AvatarImage source={{ uri: user?.photoURL ?? dummyUser.avatar.uri }} />
            <AvatarFallback>
              <Text>Avatar</Text>
            </AvatarFallback>
          </Avatar>
        </View>

        <View className="gap-8 px-6 pt-4">
          <View className="gap-4">
            <View className="gap-1">
              <Text className="text-2xl font-bold">{user?.displayName}</Text>
              <View className="flex-row items-center gap-1">
                <CalendarRange
                  size={16}
                  strokeWidth={1.25}
                  className="text-sm text-muted-foreground"
                />
                <Text className="gap-2 text-sm text-muted-foreground">
                  Joined {format(creationTime, "MMM yyyy")}
                </Text>
              </View>
            </View>

            <Text>{dummyUser.description}</Text>

            <View className="flex-row flex-wrap items-center gap-4">
              <View className="flex-row items-center gap-1">
                <MapPin size={16} strokeWidth={1.15} className="text-primary" />
                <Text className="gap-2 text-sm font-medium text-muted-foreground">
                  {dummyUser.cachesVisited} Caches
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Star
                  size={16}
                  strokeWidth={1.25}
                  className="text-yellow-400 dark:text-yellow-500"
                />
                <Text className="gap-2 text-sm font-medium text-muted-foreground">
                  {dummyUser.reviewsGiven} Reviews
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Flame
                  size={16}
                  strokeWidth={1.25}
                  className="text-orange-400 dark:text-orange-500"
                />
                <Text className="gap-2 text-sm font-medium text-muted-foreground">
                  {dummyUser.streak} Streak
                </Text>
              </View>
            </View>
          </View>

          <Caches>
            <CacheGroup name="Recently visited">
              {dummyCache.photos.map((photo, index) => {
                return (
                  <CacheImage
                    key={index}
                    source={photo}
                    aria-labelledby={dummyCache.name}
                    name={dummyCache.name}
                    href="/"
                  />
                )
              })}
            </CacheGroup>
            <CacheGroup name="Favorites">
              {dummyCache.photos.map((photo, index) => {
                return (
                  <CacheImage
                    key={index}
                    source={photo}
                    aria-labelledby={dummyCache.name}
                    name={dummyCache.name}
                    href="/"
                  />
                )
              })}
            </CacheGroup>
            <CacheGroup name="Recently reviewed">
              {dummyCache.photos.map((photo, index) => {
                return (
                  <CacheImage
                    key={index}
                    source={photo}
                    aria-labelledby={dummyCache.name}
                    name={dummyCache.name}
                    href="/"
                  />
                )
              })}
            </CacheGroup>
          </Caches>
        </View>
      </ScrollView>
    </View>
  )
}
