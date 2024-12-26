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
import { dummyUser, List } from "@/lib/dummyUser"
import { History } from "@/lib/icons/History"
import { Star } from "@/lib/icons/Star"
import { Heart } from "@/lib/icons/Heart"
import { MapPin } from "@/lib/icons/MapPin"
import { LockKeyhole } from "@/lib/icons/LockKeyhole"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormField, FormFieldError, FormSubmit } from "@/components/Form"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { newListSchema } from "@/lib/cachesSchema"

// TODO: Automatically add visited caches to "History" and reviews to "Reviews", and have them be locked

export default function CachesScreen() {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [newListDialogOpen, setNewListDialogOpen] = useState(false)
  const [selectedList, setSelectedList] = useState<List | null>(null)

  // Set all list table cell widths to the largest width (and head)
  const listCellRefs = useRef<Array<View | null>>([])
  const [listCellWidth, setListCellWidth] = useState<number | null>(null)
  useEffect(() => {
    const widths: number[] = []

    listCellRefs.current.forEach((ref) => {
      if (ref) {
        ref.measure((x, y, width, height, pageX, pageY) => {
          widths.push(width)
          if (widths.length === dummyUser.lists.length) {
            setListCellWidth(Math.max(...widths))
          }
        })
      }
    })
  }, [])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newListSchema),
    defaultValues: {
      name: "",
    },
  })

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
                  <TableHead className="min-w-40 pl-6" style={{ width: listCellWidth || "auto" }}>
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
                        <TableCell
                          ref={(el) => (listCellRefs.current[index] = el)}
                          style={{ width: listCellWidth || "auto" }}
                          className="min-w-40 max-w-64 flex-1 justify-center pl-6"
                        >
                          <View className="flex-row items-center gap-2 pr-8">
                            {list.name === "History" && <History size={16} strokeWidth={1.25} />}
                            {list.name === "Reviews" && <Star size={16} strokeWidth={1.25} />}
                            {list.name === "Favorites" && <Heart size={16} strokeWidth={1.25} />}
                            {list.name === "Future journeys" && (
                              <MapPin size={16} strokeWidth={1.25} />
                            )}
                            <Text numberOfLines={1}>{list.name}</Text>
                          </View>
                        </TableCell>
                        <TableCell className="min-w-20 flex-1 justify-center">
                          <Text>{list.caches.length}</Text>
                        </TableCell>
                        <TableCell className="ml-auto mr-6 justify-center">
                          {list.name === "History" || list.name === "Reviews" ? (
                            <View className="h-10 w-10 items-center justify-center">
                              <LockKeyhole size={16} strokeWidth={1.25} />
                            </View>
                          ) : (
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
                                    setSelectedList(list)
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
                                    setSelectedList(list)
                                    setRemoveDialogOpen(true)
                                  }}
                                >
                                  <Trash2 size={16} strokeWidth={1.25} />
                                  <Text>Remove</Text>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    </Link>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollView>

          <Dialog
            open={newListDialogOpen}
            onOpenChange={(open) => {
              setNewListDialogOpen(open)
              if (!open) {
                reset()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="mr-6 flex-row gap-2 self-end">
                <Plus size={16} strokeWidth={1.25} className="text-primary-foreground" />
                <Text>New list</Text>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New list</DialogTitle>
                <DialogDescription>
                  Create a new list to save and keep track of caches.
                </DialogDescription>
              </DialogHeader>
              <FormField className="pt-2">
                <Label nativeID="name">Name</Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      aria-labelledby="name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter list name"
                      className="w-full"
                      inputMode="text"
                      maxLength={20}
                    />
                  )}
                />
                <FormFieldError errors={errors.name} />
              </FormField>
              <DialogFooter>
                <FormSubmit
                  className="flex-row gap-2"
                  onPress={handleSubmit((formData) => {
                    // TODO: Create new list
                    console.log(formData)
                    setNewListDialogOpen(false)
                  })}
                >
                  <Plus size={16} strokeWidth={1.25} className="text-primary-foreground" />
                  <Text>Create</Text>
                </FormSubmit>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>
      </ScrollView>

      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-between">
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                className="flex-row gap-2 !bg-destructive"
                onPress={() => {
                  // TODO: Delete list
                  console.log(selectedList)
                }}
              >
                <Trash2 size={16} strokeWidth={1.25} className="text-destructive-foreground" />
                <Text>Remove</Text>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  )
}
