import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogProps,
  AlertDialogRef,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { List } from "@/lib/dummyUser"
import { Trash2 } from "@/lib/icons/Trash2"
import * as React from "react"

type RemoveListDialogProps = AlertDialogProps & {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedList: List | null
}
const RemoveListDialog = React.forwardRef<AlertDialogRef, RemoveListDialogProps>(
  ({ open, setOpen, selectedList, ...props }, ref) => (
    <AlertDialog ref={ref} open={open} onOpenChange={setOpen} {...props}>
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
  ),
)
RemoveListDialog.displayName = "RemoveListDialog"

export { RemoveListDialog }
