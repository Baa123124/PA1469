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
import { Plus } from "@/lib/icons/Plus"
import { Upload } from "@/lib/icons/Upload"
import { newCacheSchema } from "@/lib/mapSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { format } from "date-fns/format"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { LatLng } from "react-native-maps"

// ? Possibly add tags

type NewCacheDialogProps = DialogProps & {
  newCacheCoord: LatLng
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: FirebaseAuthTypes.User | null
}
const NewCacheDialog = React.forwardRef<DialogRef, NewCacheDialogProps>(
  ({ newCacheCoord, open, setOpen, user, ...props }, ref) => {
    const {
      control: newControl,
      handleSubmit: newHandleSubmit,
      reset: newReset,
      formState: { errors: newErrors },
    } = useForm({
      resolver: zodResolver(newCacheSchema),
      defaultValues: {
        creatorId: user?.uid,
        name: "",
        description: "",
        photo: {
          uri: "",
          mimeType: "",
          width: 0,
          height: 0,
          fileSize: 0,
        },
        rating: 1,
        reviews: [],
      },
    })

    return (
      <Dialog
        ref={ref}
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          newReset()
        }}
        {...props}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New cache</DialogTitle>
            <DialogDescription>
              Create a new public cache for others to find on the map
            </DialogDescription>
          </DialogHeader>

          <Form>
            <FormField>
              <Label nativeID="name">Name</Label>
              <Controller
                control={newControl}
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
              <FormFieldError errors={newErrors.name} />
            </FormField>

            <FormField>
              <Label nativeID="description">Description</Label>
              <Controller
                control={newControl}
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
              <FormFieldError errors={newErrors.description} />
            </FormField>

            <FormField>
              <Controller
                control={newControl}
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
              <FormFieldError errors={newErrors.photo} />
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
              onPress={newHandleSubmit((formData) => {
                const finalData = {
                  coordinates: newCacheCoord,
                  data: formData,
                };
                console.log('Final Form Data:', finalData)
                setOpen(false)
                newReset()
              })}
            >
              <Plus size={16} strokeWidth={1.25} className="text-primary-foreground" />
              <Text>Create</Text>
            </FormSubmit>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)
NewCacheDialog.displayName = "NewCacheDialog"

export { NewCacheDialog }
