import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { dummyUser } from "@/lib/dummyUser"
import { ArrowUpDown } from "@/lib/icons/ArrowUpDown"
import { Bell } from "@/lib/icons/Bell"
import { Compass } from "@/lib/icons/Compass"
import { LockKeyhole } from "@/lib/icons/LockKeyhole"
import { LogOut } from "@/lib/icons/LogOut"
import { Mail } from "@/lib/icons/Mail"
import { Palette } from "@/lib/icons/Palette"
import { SquarePen } from "@/lib/icons/SquarePen"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useState } from "react"
import { View } from "react-native"
import { TopNav, TopNavBackButton } from "@/components/TopNav"
import { Settings, SettingsGroup, SettingsField } from "./(components)/Settings"
import { Link } from "expo-router"
import { useAuth } from "@/lib/auth/AuthContext"
// TODO: Change dummyUser to actual user

export default function SettingsScreen() {
  const { user, logout } = useAuth()
  const [discoveryMode, setDiscoveryMode] = useState(dummyUser.discoveryMode)
  const [notifications, setNotifications] = useState(dummyUser.notifications)

  return (
    <View className="flex-1 gap-8 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav className="justify-between">
        <TopNavBackButton />
        <Button onPress={logout} variant="ghost" className="ml-auto flex-row items-center gap-2">
          <LogOut size={16} className="text-destructive" strokeWidth={1.25} />
          <Text className="!text-destructive">Log out</Text>
        </Button>
      </TopNav>

      <View className="items-center justify-center gap-4">
        <Avatar alt="profile avatar" className="h-24 w-24">
          <AvatarImage source={{ uri: user?.photoURL ?? dummyUser.avatar.uri }} />
          <AvatarFallback>
            <Text>Avatar</Text>
          </AvatarFallback>
        </Avatar>
        <View className="items-center">
          <Text className="text-2xl font-bold">{user?.displayName}</Text>
          <Text className="text-sm text-muted-foreground">{user?.email}</Text>
        </View>
        <Link href="/settings/profile" asChild>
          <Button className="flex-row gap-2">
            <SquarePen size={16} strokeWidth={1.25} className="text-primary-foreground" />
            <Text>Edit profile</Text>
          </Button>
        </Link>
      </View>

      <Settings>
        <SettingsGroup name="Map">
          <SettingsField
            icon={ArrowUpDown}
            name="Cache range"
            type="link"
            value={`${dummyUser.minCacheRange} km - ${dummyUser.maxCacheRange} km`}
            href="/settings/cache-range"
          />
          <SettingsField
            icon={Compass}
            name="Discovery mode"
            type="switch"
            checked={discoveryMode}
            onCheckedChange={(checked) => {
              setDiscoveryMode(checked)
              // TODO: Update user settings
            }}
          />
        </SettingsGroup>

        <SettingsGroup name="Preferences">
          <SettingsField
            icon={Bell}
            name="Notifications"
            type="switch"
            checked={notifications}
            onCheckedChange={(checked) => {
              setNotifications(checked)
              // TODO: Update user settings
              // ? Could potentially have a separate page to toggle individual notifications
            }}
          />
          <SettingsField
            icon={Palette}
            name="Theme"
            type="link"
            value={dummyUser.theme.charAt(0).toUpperCase() + dummyUser.theme.slice(1)}
            href="/settings/theme"
          />
        </SettingsGroup>

        <SettingsGroup name="Account">
          <SettingsField
            icon={Mail}
            name="Email"
            type="link"
            value={user?.email as string | undefined}
            href="/settings/email"
          />
          <SettingsField
            icon={LockKeyhole}
            name="Password"
            type="link"
            value=""
            href="/settings/password"
          />
        </SettingsGroup>
      </Settings>
    </View>
  )
}
