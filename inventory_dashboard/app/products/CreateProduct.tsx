import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppSelector } from '../store/reduxStore';
import { useCreateProduct } from '../apis/ProductsApi';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Zod schema for product validation
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be 0 or more'),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be a non-negative integer'),
});

function CreateProduct() {
  const isDarkMode = useAppSelector((state: any) => state.global?.isDarkMode);
  const { isLoading, error, mutate } = useCreateProduct();
  const [isDialogOpen, setDialogOpen] = useState(false);
  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string; price: number; stockQuantity: number }>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: { name: string; price: number; stockQuantity: number }) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Product created successfully 🎉');
        reset(), 
        setDialogOpen(false);
      },
      onError: (error) => {
        toast.error(`Error creating product: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-purple-400 hover:bg-purple-500 text-white"
          onClick={() => setDialogOpen(true)}
        >
          Create new Product
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'} sm:max-w-[425px]`}>
        <DialogHeader>
          <DialogTitle className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
            Create Product
          </DialogTitle>
          <DialogDescription className={`${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
            Fill in the details for the new product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label 
              htmlFor="name" 
              className={`${isDarkMode ? 'text-slate-200' : 'text-slate-700'} text-right`}
            >
              Name
            </label>
            <div className="col-span-3">
              <Input
                id="name"
                {...register('name')}
                className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-purple-400 dark:focus:ring-purple-400"
              />
              {errors.name?.message && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
            </div>
          </div>
          
          {/* Price Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label 
              htmlFor="price" 
              className={`${isDarkMode ? 'text-slate-200' : 'text-slate-700'} text-right`}
            >
              Price
            </label>
            <div className="col-span-3">
              <Input
                id="price"
                type="number"
                {...register('price', { valueAsNumber: true })}
                className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-purple-400 dark:focus:ring-purple-400"
                style={{
                  MozAppearance: 'textfield', // Firefox
                  WebkitAppearance: 'none',   // Chrome, Safari, Edge, Opera
                }}
              />
              {errors.price && <p className="text-red-500 text-sm">{String(errors.price.message)}</p>}
            </div>
          </div>

          {/* Stock Quantity Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label 
              htmlFor="stockQuantity" 
              className={`${isDarkMode ? 'text-slate-200' : 'text-slate-700'} text-right`}
            >
              Stock Quantity
            </label>
            <div className="col-span-3">
              <Input
                id="stockQuantity"
                type="number"
                {...register('stockQuantity', { valueAsNumber: true })}
                className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-purple-400 dark:focus:ring-purple-400"
                style={{
                  MozAppearance: 'textfield', // Firefox
                  WebkitAppearance: 'none',   // Chrome, Safari, Edge, Opera
                }}
             />
              {errors.stockQuantity && <p className="text-red-500 text-sm">{String(errors.stockQuantity.message)}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-purple-400 hover:bg-purple-500 text-white flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                // <>
                //   <Loader2 className="animate-spin h-4 w-4" />
                //   Submitting...
                // </>
                <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
               Creating...
              </span>
              ) : (
                'Create Product'
              )}
            </Button>
          </DialogFooter>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm">Error: {error.message}</p>}
      </DialogContent>
    </Dialog>
  );
}

export default CreateProduct;
