import { Form, FormField, FormFieldError, FormSubmit } from "@/components/Form"
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
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { saveCacheSchema } from "@/lib/mapSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { Bookmark } from "@/lib/icons/Bookmark"
import { Heart } from "@/lib/icons/Heart"
import { Checkbox } from "@/components/ui/checkbox"
import { List } from "@/lib/dummyUser"
import { MapPin } from "@/lib/icons/MapPin"

type SaveCacheDialogProps = DialogProps & {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cacheId: string
  lists: List[]
}
const SaveCacheDialog = React.forwardRef<DialogRef, SaveCacheDialogProps>(
  ({ open, setOpen, cacheId, lists, ...props }, ref) => {
    const cacheName = "Cache 1" // TODO: Get cache name from cacheId

    const {
      control: saveControl,
      handleSubmit: saveHandleSubmit,
      reset: saveReset,
      formState: { errors: saveErrors },
    } = useForm({
      resolver: zodResolver(saveCacheSchema),
      defaultValues: {
        lists: {} as { [key: string]: boolean },
      },
    })

    return (
      <Dialog
        ref={ref}
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          saveReset()
        }}
        {...props}
      >
        <DialogTrigger asChild>
          <Button className="flex-row gap-2">
            <Bookmark size={16} strokeWidth={1.25} className="text-primary-foreground" />
            <Text>Save cache</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Save{" "}
              <Text
                className="text-primary"
                style={{ fontSize: 17.5, lineHeight: 24.5, fontWeight: 600 }}
              >
                {cacheName}
              </Text>
            </DialogTitle>
            <DialogDescription>Save the cache for easier access</DialogDescription>
          </DialogHeader>

          <Form>
            <FormField className="max-w-full">
              <Label nativeID="lists">Lists</Label>
              {lists
                .filter((list) => list.name !== "History" && list.name !== "Reviews")
                .map((list, index) => (
                  <Controller
                    key={index}
                    control={saveControl}
                    name={`lists.${list.id}`}
                    render={({ field: { onChange, value } }) => (
                      <Button
                        variant="ghost"
                        className="w-full flex-row justify-between"
                        onPress={() => onChange(!value)}
                      >
                        <View className="flex-row items-center gap-2">
                          {list.name === "Favorites" && <Heart size={16} strokeWidth={1.25} />}
                          {list.name === "Future journeys" && (
                            <MapPin size={16} strokeWidth={1.25} />
                          )}
                          <Label
                            nativeID={list.id}
                            className="font-normal web:cursor-pointer"
                            onPress={() => onChange(!value)}
                          >
                            {list.name}
                          </Label>
                        </View>
                        <Checkbox
                          checked={value}
                          onCheckedChange={onChange}
                          aria-labelledby={list.id}
                          asChild
                        ></Checkbox>
                      </Button>
                    )}
                  />
                ))}
              <FormFieldError errors={saveErrors.lists} />
            </FormField>
          </Form>

          <DialogFooter className="flex-row justify-between">
            <DialogClose asChild>
              <Button variant="outline">
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <FormSubmit
              className="w-auto flex-row gap-2"
              onPress={saveHandleSubmit((formData) => {
                // TODO: Save cache to selected list
                console.log(formData)
                setOpen(false)
                saveReset()
              })}
            >
              <Bookmark size={16} strokeWidth={1.25} className="text-primary-foreground" />
              <Text>Save</Text>
            </FormSubmit>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)
SaveCacheDialog.displayName = "SaveCacheDialog"

export { SaveCacheDialog }
