import { Href, Tabs } from "expo-router"
import { Bookmark } from "@/lib/icons/Bookmark"
import { MapPin } from "@/lib/icons/MapPin"
import { User } from "@/lib/icons/User"
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { TabBarButton } from "./(components)/TabBarButton"
import { dummyUser } from "@/lib/dummyUser"

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
            <TabBarButton icon={Bookmark} focused={focused} href={"/caches"} />
          ),
        }}
      />
      <Tabs.Screen
        name="map/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton icon={MapPin} focused={focused} href={"/map"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton icon={User} focused={focused} href={`/profile/${dummyUser.id}` as Href} />
          ),
        }}
      />
    </Tabs>
  )
}
