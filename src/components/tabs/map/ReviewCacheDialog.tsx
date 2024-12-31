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
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImagePicker } from "@/components/ui/image-picker"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "@/lib/icons/Star"
import { Upload } from "@/lib/icons/Upload"
import { reviewCacheSchema } from "@/lib/mapSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { RatingSelect } from "./RatingSelect"

type ReviewCacheDialogProps = DialogProps & {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cacheId: string
}
const ReviewCacheDialog = React.forwardRef<DialogRef, ReviewCacheDialogProps>(
  ({ open, setOpen, cacheId, ...props }, ref) => {
    const cacheName = "Cache 1" // TODO: Get cache name from cacheId

    const {
      control: reviewControl,
      handleSubmit: reviewHandleSubmit,
      reset: reviewReset,
      formState: { errors: reviewErrors },
    } = useForm({
      resolver: zodResolver(reviewCacheSchema),
      defaultValues: {
        rating: 0,
        comment: "",
        photo: {
          uri: "",
          mimeType: "",
          width: 0,
          height: 0,
          fileSize: 0,
        },
      },
    })

    return (
      <Dialog
        ref={ref}
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          reviewReset()
        }}
        {...props}
      >
        <DialogTrigger asChild>
          <Button className="flex-row gap-2">
            <Star size={16} strokeWidth={1.25} className="text-primary-foreground" />
            <Text>Review cache</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Review{" "}
              <Text
                className="text-primary"
                style={{ fontSize: 17.5, lineHeight: 24.5, fontWeight: 600 }}
              >
                {cacheName}
              </Text>
            </DialogTitle>
            <DialogDescription>Leave a public review of your experience</DialogDescription>
          </DialogHeader>

          <Form>
            <FormField>
              <Label nativeID="rating">Rating</Label>
              <Controller
                control={reviewControl}
                name="rating"
                render={({ field: { onChange, onBlur, value } }) => (
                  <RatingSelect value={value} setValue={onChange} />
                )}
              />
              <FormFieldError errors={reviewErrors.rating} />
            </FormField>

            <FormField>
              <Label nativeID="comment">Comment</Label>
              <Controller
                control={reviewControl}
                name="comment"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Textarea
                    aria-labelledby="comment"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter comment"
                    className="w-full"
                    inputMode="text"
                    maxLength={200}
                  />
                )}
              />
              <FormFieldError errors={reviewErrors.comment} />
            </FormField>

            <FormField>
              <Controller
                control={reviewControl}
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
              <FormFieldError errors={reviewErrors.photo} />
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
              onPress={reviewHandleSubmit((formData) => {
                // TODO: Save review
                console.log(formData)
                setOpen(false)
                reviewReset()
              })}
            >
              <Upload size={16} strokeWidth={1.25} className="text-primary-foreground" />
              <Text>Publish</Text>
            </FormSubmit>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)
ReviewCacheDialog.displayName = "ReviewCacheDialog"

export { ReviewCacheDialog }
