import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from 'sonner';
import { deleteProduct } from '../apis/ProductsApi';

interface DeleteProductButtonProps {
  productId: string;
  productName?: string;
  onDelete: (id: string) => void;
}

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
    productId,
    productName = "this product",
  }) => {
    const deleteProductMutation = deleteProduct()
    const [isOpen, setIsOpen] = React.useState(false)
    const handleDelete = async () => {
        try {
          await deleteProductMutation.mutateAsync(productId)
          toast.success("Product Deleted", {
            description: `${productName} has been successfully deleted.`
          })
          setIsOpen(false)
        } catch (error) {
          toast.error("Delete Failed", {
            description: `Failed to delete ${productName}. Please try again.`
          })
        }
      }
    
      return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild className='bg-white'>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete <span className="text-red-500">{productName} </span> { }
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col md:flex-row justify-between items-center gap-4">
  <div className="flex w-full md:w-auto gap-4">
    <AlertDialogCancel className="flex-1">
      Cancel
    </AlertDialogCancel>
    <AlertDialogAction
      onClick={handleDelete}
      className="flex-1 md:mt-0 mt-[-0.3rem] bg-red-600 text-destructive-foreground hover:bg-destructive/90"
      disabled={deleteProductMutation.isPending}
    >
      {deleteProductMutation.isPending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Deleting...
        </span>
      ) : (
        "Delete"
      )}
    </AlertDialogAction>
  </div>
</AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductButton;