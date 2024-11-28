import { Tabs } from "expo-router"
import { Bookmark } from "@/lib/icons/Bookmark"
import { MapPin } from "@/lib/icons/MapPin"
import { User } from "@/lib/icons/User"
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { View } from "react-native"

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <Tabs.Screen
          name="caches/index"
          options={{
            href: "/caches",
            tabBarIcon: () => (
              <View className="flex-col items-center">
                <Bookmark size={24} className="w-6 h-6 text-foreground" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="map/index"
          options={{
            href: "/map",
            tabBarIcon: () => (
              <View className="flex-col items-center">
                <MapPin size={24} className="w-6 h-6 text-foreground" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            href: "/profile",
            tabBarIcon: () => (
              <View className="flex-col items-center">
                <User size={24} className="w-6 h-6 text-foreground" />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  )
}
