import { TopNav, TopNavSettingsButton } from "@/components/TopNav"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Ellipsis } from "@/lib/icons/Ellipsis"
import { Plus } from "@/lib/icons/Plus"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SquarePen } from "@/lib/icons/SquarePen"
import { Share2 } from "@/lib/icons/Share2"
import { Trash2 } from "@/lib/icons/Trash2"
import { Href, Link } from "expo-router"
import { dummyUser } from "@/lib/dummyUser"

export default function CachesScreen() {
  return (
    <View className="flex-1 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopNav>
          <TopNavSettingsButton variant="ghost" className="ml-auto" />
        </TopNav>

        <View className="gap-4">
          <ScrollView
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-40 flex-1 pl-6">
                    <Text className="font-semibold text-primary">Lists</Text>
                  </TableHead>
                  <TableHead className="min-w-20 flex-1">
                    <Text className="font-semibold text-primary">Caches</Text>
                  </TableHead>
                  <TableHead className="flex-1"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {dummyUser.lists.map((list, index) => {
                  return (
                    <Link href={`/caches/${list.id}` as Href} asChild key={list.id}>
                      <TableRow className={cn("active:bg-secondary", index % 2 && "bg-muted/40")}>
                        <TableCell className="min-w-40 flex-1 justify-center pl-6">
                          <Text>{list.name}</Text>
                        </TableCell>
                        <TableCell className="min-w-20 flex-1 justify-center">
                          <Text>{list.caches.length}</Text>
                        </TableCell>
                        <TableCell className="ml-auto mr-6 justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" onPress={() => {}}>
                                <Ellipsis size={16} strokeWidth={1.25} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48">
                              <DropdownMenuItem
                                onPress={() => {
                                  // TODO: Edit list
                                }}
                              >
                                <SquarePen size={16} strokeWidth={1.25} />
                                <Text>Edit</Text>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onPress={() => {
                                  // TODO: Share list
                                  // It's only possible to share one image at a time: https://docs.expo.dev/versions/latest/sdk/sharing/#types
                                  // ? Either make lists public and move caches/[id] to caches/[userId]/[listId], and share link to the list
                                  // ? Or don't share lists and just share individual caches in caches/[id] instead
                                }}
                              >
                                <Share2 size={16} strokeWidth={1.25} />
                                <Text>Share</Text>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onPress={() => {
                                  // TODO: Remove list
                                }}
                              >
                                <Trash2 size={16} strokeWidth={1.25} />
                                <Text>Remove</Text>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </Link>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollView>

          <Button
            className="mr-6 flex-row gap-2 self-end"
            onPress={() => {
              // TODO: Create new list
            }}
          >
            <Plus size={16} strokeWidth={1.25} className="text-primary-foreground" />
            <Text>New list</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
