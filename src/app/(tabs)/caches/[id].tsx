import { dummyUser } from "@/lib/dummyUser"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { View } from "react-native"
import { TopNav, TopNavBackButton, TopNavRoute } from "@/components/TopNav"
import { useLocalSearchParams } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"
import { CacheImage } from "@/components/tabs/Caches"

// TODO: Link caches to map view

export default function CacheDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>()
  const list = dummyUser.lists.find((list) => list.id === params.id)

  return (
    <View className="flex-1 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopNav>
          <TopNavBackButton />
          <TopNavRoute>{list?.name}</TopNavRoute>
        </TopNav>

        <View className="gap-4 px-6 pt-4">
          {list?.caches.map((cache, index) => {
            return (
              <CacheImage
                key={index}
                source={{ uri: cache.photos[0] }}
                aria-labelledby={cache.name}
                name={cache.name}
                href="/"
                className="max-h-48 flex-1"
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
