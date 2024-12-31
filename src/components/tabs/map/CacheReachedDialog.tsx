import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogRef,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Text } from "@/components/ui/text"
import { showToast } from "@/components/ui/toast"
import { Bookmark } from "@/lib/icons/Bookmark"
import { Flame } from "@/lib/icons/Flame"
import { MapPin } from "@/lib/icons/MapPin"
import { Share2 } from "@/lib/icons/Share2"
import { Star } from "@/lib/icons/Star"
import * as React from "react"
import { View } from "react-native"
import Share from "react-native-share"

// TODO: Remove temporary trigger button

type CacheReachedDialogProps = DialogProps & {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>
  setReviewOpen: React.Dispatch<React.SetStateAction<boolean>>
  cacheId: string
  streak: number
}
const CacheReachedDialog = React.forwardRef<DialogRef, CacheReachedDialogProps>(
  ({ open, setOpen, setSaveOpen, setReviewOpen, cacheId, streak, ...props }, ref) => {
    const cacheName = "Cache 1" // TODO: Get cache name from cacheId

    return (
      <Dialog
        ref={ref}
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
        }}
        {...props}
      >
        <DialogTrigger asChild>
          <Button className="flex-row gap-2">
            <MapPin size={16} strokeWidth={1.25} className="text-primary-foreground" />
            <Text>Cache reached</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="max-w-[250px]">
              Congratulations, you reached{" "}
              <Text
                className="text-primary"
                style={{ fontSize: 17.5, lineHeight: 24.5, fontWeight: 600 }}
              >
                {cacheName}
              </Text>
            </DialogTitle>
            <DialogDescription>Leave a review or save it for future adventures.</DialogDescription>
          </DialogHeader>

          <View className="gap-4">
            <View className="flex-row items-center gap-1">
              <Flame
                size={16}
                strokeWidth={1.25}
                className="text-orange-400 dark:text-orange-500"
              />
              <Text className="font-medium text-muted-foreground">{streak} Streak</Text>
            </View>

            <View className="flex-row flex-wrap gap-2">
              <Button
                variant="outline"
                className="flex-row gap-2"
                onPress={() => setSaveOpen(true)}
              >
                <Bookmark size={16} strokeWidth={1.25} />
                <Text>Save</Text>
              </Button>
              <Button
                variant="outline"
                className="flex-row gap-2"
                onPress={async () => {
                  try {
                    await Share.open({
                      title: cacheName,
                      message: "Check out this cache on Xplorify: ",
                      url: "xplorify://map?cacheId=" + cacheId,
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
              </Button>
              <Button
                variant="outline"
                className="flex-row gap-2"
                onPress={() => setReviewOpen(true)}
              >
                <Star size={16} strokeWidth={1.25} />
                <Text>Review</Text>
              </Button>
            </View>
          </View>

          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>Close</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)
CacheReachedDialog.displayName = "CacheReachedDialog"

export { CacheReachedDialog }
