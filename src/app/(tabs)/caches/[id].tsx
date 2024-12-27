import { dummyUser } from "@/lib/dummyUser"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { View } from "react-native"
import { TopNav, TopNavBackButton, TopNavRoute } from "@/components/TopNav"
import { Link, useLocalSearchParams } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"
import { CacheImage } from "@/components/tabs/Caches"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "@/lib/icons/Ellipsis"
import { Text } from "@/components/ui/text"
import { Share2 } from "@/lib/icons/Share2"
import { Trash2 } from "@/lib/icons/Trash2"
import { MapPin } from "@/lib/icons/MapPin"
import { showToast } from "@/components/ui/toast"
import Share from "react-native-share"

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
              >
                <DropdownMenu className="absolute right-2 top-2">
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" onPress={() => {}}>
                      <Ellipsis size={16} strokeWidth={1.25} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <Link href="/" asChild>
                      <DropdownMenuItem>
                        <MapPin size={16} strokeWidth={1.25} />
                        <Text>Visit cache</Text>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onPress={async () => {
                        // ? Possibly use android "App Links" instead of deep links to link to play store if app isn't installed
                        // Firebase dynamic links are being deprecated: https://firebase.google.com/support/dynamic-links-faq?hl=en&authuser=0
                        try {
                          await Share.open({
                            title: cache.name,
                            message: "Check out this cache on Xplorify: ",
                            url: "xplorify://map?cacheId=" + cache.id,
                          })
                        } catch (error) {
                          showToast({
                            type: "error",
                            description: "Failed to share cache. Please try again",
                            position: "bottom",
                          })
                        }
                      }}
                    >
                      <Share2 size={16} strokeWidth={1.25} />
                      <Text>Share</Text>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onPress={() => {
                        // TODO: Remove cache from list
                        console.log(cache.id)
                      }}
                    >
                      <Trash2 size={16} strokeWidth={1.25} />
                      <Text>Remove</Text>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CacheImage>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
