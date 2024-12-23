import { Href, Tabs } from "expo-router"
import { Bookmark } from "@/lib/icons/Bookmark"
import { MapPin } from "@/lib/icons/MapPin"
import { User } from "@/lib/icons/User"
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { TabBarButton } from "../../components/tabs/TabBarButton"
import ProtectedScreen from "@/lib/auth/ProtectedScreen"
import { useAuth } from "@/lib/auth/AuthContext"

export default function TabLayout() {
  const { user } = useAuth()

  return (
    <ProtectedScreen>
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
              <TabBarButton icon={User} focused={focused} href={`/profile/${user?.uid}` as Href} />
            ),
          }}
        />
      </Tabs>
    </ProtectedScreen>
  )
}
