import { Tabs } from "expo-router"
import { Bookmark } from "@/lib/icons/Bookmark"
import { MapPin } from "@/lib/icons/MapPin"
import { User } from "@/lib/icons/User"
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { TabBarButton } from "@/components/TabBarButton"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      backBehavior="history"
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="caches/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton Icon={Bookmark} focused={focused} route={"/caches"} />
          ),
        }}
      />
      <Tabs.Screen
        name="map/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton Icon={MapPin} focused={focused} route={"/map"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton Icon={User} focused={focused} route={"/profile"} />
          ),
        }}
      />
    </Tabs>
  )
}
