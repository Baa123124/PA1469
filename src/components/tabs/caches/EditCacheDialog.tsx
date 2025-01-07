import { AutoImage } from "@/components/AutoImage"
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
} from "@/components/ui/dialog"
import { ImagePicker } from "@/components/ui/image-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { Textarea } from "@/components/ui/textarea"
import { editCacheSchema } from "@/lib/cachesSchema"
import { dummyCache } from "@/lib/dummyUser"
import { SquarePen } from "@/lib/icons/SquarePen"
import { Upload } from "@/lib/icons/Upload"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"

type EditCacheDialogProps = DialogProps & {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cacheId: string
}
const EditCacheDialog = React.forwardRef<DialogRef, EditCacheDialogProps>(
  ({ open, setOpen, cacheId, ...props }, ref) => {
    // TODO: Get cache from cacheId
    const cache = dummyCache

    const {
      control: editCacheControl,
      handleSubmit: editCacheHandleSubmit,
      reset: editCacheReset,
      formState: { errors: editCacheErrors },
    } = useForm({
      resolver: zodResolver(editCacheSchema),
      defaultValues: {
        name: cache.data.name,
        description: cache.data.description,
        photo: {
          // TODO: Change this
          uri: cache.data.photos[0],
          mimeType: "image/jpeg",
          width: 0,
          height: 0,
          fileSize: 1,
        },
        // tags: []
      },
    })

    return (
      <Dialog
        ref={ref}
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          editCacheReset()
        }}
        {...props}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit list</DialogTitle>
            <DialogDescription>Edit cache details.</DialogDescription>
          </DialogHeader>

          <Form>
            <FormField>
              <Label nativeID="name">Name</Label>
              <Controller
                control={editCacheControl}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    aria-labelledby="name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter cache name"
                    className="w-full"
                    inputMode="text"
                    maxLength={20}
                  />
                )}
              />
              <FormFieldError errors={editCacheErrors.name} />
            </FormField>

            <FormField>
              <Label nativeID="description">Description</Label>
              <Controller
                control={editCacheControl}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Textarea
                    aria-labelledby="description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter description"
                    className="w-full"
                    inputMode="text"
                    maxLength={200}
                  />
                )}
              />
              <FormFieldError errors={editCacheErrors.description} />
            </FormField>

            <FormField>
              <Controller
                control={editCacheControl}
                name="photo"
                render={({ field: { onChange, value } }) => {
                  if (value.fileSize > 0) {
                    return (
                      <FormField className="!max-w-[332px]">
                        <View className="flex-row items-center justify-between">
                          <Label nativeID="photo">Photo</Label>
                          <ImagePicker
                            variant="link"
                            className="!h-[20px] !px-0 !py-0"
                            image={value}
                            setImage={onChange}
                          >
                            <Text>Edit</Text>
                          </ImagePicker>
                        </View>
                        <ImagePicker
                          variant="ghost"
                          className="mx-auto !h-[192px] !px-0 !py-0"
                          image={value}
                          setImage={onChange}
                        >
                          <AutoImage
                            source={value}
                            aria-labelledby="photo"
                            className="!max-h-[192px] max-w-full"
                          />
                        </ImagePicker>
                      </FormField>
                    )
                  } else {
                    return (
                      <View className="gap-2">
                        <Label nativeID="photo">Photo</Label>
                        <ImagePicker
                          variant="outline"
                          className="flex-row gap-2"
                          image={value}
                          setImage={onChange}
                        >
                          <Upload size={16} strokeWidth={1.25} />
                          <Text>Upload photo</Text>
                        </ImagePicker>
                      </View>
                    )
                  }
                }}
              />
              <FormFieldError errors={editCacheErrors.photo} />
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
              onPress={editCacheHandleSubmit((formData) => {
                // TODO: Edit cache
                console.log(formData)
                setOpen(false)
                editCacheReset()
              })}
            >
              <SquarePen size={16} strokeWidth={1.25} className="text-primary-foreground" />
              <Text>Edit</Text>
            </FormSubmit>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)
EditCacheDialog.displayName = "EditCacheDialog"

export { EditCacheDialog }
