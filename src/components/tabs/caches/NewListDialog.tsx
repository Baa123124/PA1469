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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { newListSchema } from "@/lib/cachesSchema"
import { Plus } from "@/lib/icons/Plus"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"

type NewListDialogProps = DialogProps & {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const NewListDialog = React.forwardRef<DialogRef, NewListDialogProps>(
  ({ open, setOpen, ...props }, ref) => {
    const {
      control: newControl,
      handleSubmit: newHandleSubmit,
      reset: newReset,
      formState: { errors: newErrors },
    } = useForm({
      resolver: zodResolver(newListSchema),
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
          newReset()
        }}
        {...props}
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
                    placeholder="Enter list name"
                    className="w-full"
                    inputMode="text"
                    maxLength={20}
                  />
                )}
              />
              <FormFieldError errors={newErrors.name} />
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
                // TODO: Create new list
                console.log(formData)
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
NewListDialog.displayName = "NewListDialog"

export { NewListDialog }
