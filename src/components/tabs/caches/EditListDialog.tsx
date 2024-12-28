import { FormField, FormFieldError, FormSubmit } from "@/components/Form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogRef,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { editListSchema } from "@/lib/cachesSchema"
import { SquarePen } from "@/lib/icons/SquarePen"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"

type EditListDialogProps = DialogProps & {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const EditListDialog = React.forwardRef<DialogRef, EditListDialogProps>(
  ({ open, setOpen, ...props }, ref) => {
    const {
      control: editControl,
      handleSubmit: editHandleSubmit,
      reset: editReset,
      formState: { errors: editErrors },
    } = useForm({
      resolver: zodResolver(editListSchema),
      defaultValues: {
        name: "",
      },
    })

    return (
      <Dialog
        ref={ref}
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          editReset()
        }}
        {...props}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit list</DialogTitle>
            <DialogDescription>
              Edit the name of your list. (Remove caches from the list page.)
            </DialogDescription>
          </DialogHeader>
          <FormField className="pt-2">
            <Label nativeID="name">Name</Label>
            <Controller
              control={editControl}
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
            <FormFieldError errors={editErrors.name} />
          </FormField>
          <DialogFooter>
            <FormSubmit
              className="flex-row gap-2"
              onPress={editHandleSubmit((formData) => {
                // TODO: Edit list
                console.log(formData)
                setOpen(false)
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
EditListDialog.displayName = "EditListDialog"

export { EditListDialog }
