'use client'
import React, { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Star, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { deleteProduct, getProducts } from '../api/ProductsApi'
import { ProductType } from '../dashboard/types'
import { setIsSidebarcollapsed } from '../state'
import DeleteProductButton from './DeletePop'
import { Input } from '@/components/ui/input'
import {  Toaster } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox'
import { Pagination } from '@/components/ui/pagination'
import { PaginationComp } from '../pagination/pagination'
export interface ProductTableProps {
  isEditable?: boolean
}

const InventoryTable: React.FC<ProductTableProps> = ({ isEditable = false }) => {
  const [page, setPage] = useState(1)
  const { products, isLoading, error, totalPage } = getProducts(15,page)
  const handlePageChange = (page: number) => {
    console.log("Changing to page:", page);  // Debug log
    setPage(page);
  }

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const deleteProductMutation = deleteProduct()
  const handleProductSelect = (productId: string) => {
   
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }
  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId)
    setSelectedProducts((prev)=> prev.filter(id => id !== productId))
}
  const renderStarRating = (rating?: number) => {
    if (!rating) return null
    return (
      <div className="flex items-center text-yellow-500">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            className={`w-4 h-4 ${index < Math.round(rating) ? 'fill-current' : ''}`} 
          />
        ))}
      </div>
    )
  }

  const renderStockStatus = (quantity: number) => {
    if (quantity > 50000) 
      return <Badge variant="default" className="bg-green-500">High Stock</Badge>
    if (quantity > 10000) 
      return <Badge variant="default" className="bg-yellow-500 ">Medium Stock</Badge>
    return <Badge variant="destructive">Low Stock</Badge>
  }

  
    if (isLoading) {
    
      return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden text-sm md:text-base">
          <Table className="md:px-5 px-0">
            <TableHeader>
              <TableRow>
                {isEditable && <TableHead>Select</TableHead>}
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Stock Quantity</TableHead>
                <TableHead>Status</TableHead>
                {isEditable && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(15)].map((_, index) => (
                <TableRow key={`Loading${index}`} className='py-3 px-3'>
                  {isEditable && (
                    <TableCell>
                      <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </TableCell>
                  {isEditable && (
                    <TableCell>
                      <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
  }
  if (error) return <div>Error loading products</div>
  
  // Add this check
  if (!products || products.length === 0) return <div>No products found</div>

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden text-sm md:text-base ">
       <Toaster />
      <Table className='md:px-5 px-0'>
        <TableHeader>
          <TableRow>
            {isEditable && <TableHead>Select</TableHead>}
            <TableHead className=''>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className='hidden md:block'>Rating</TableHead>
            <TableHead className='md:block hidden'>Stock Quantity</TableHead>
            <TableHead>Status</TableHead>
            {isEditable && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product:ProductType) => (
            <TableRow key={product.productId}>
              {isEditable && (
                <TableCell>
                  <Checkbox id="terms"
                    // checked={selectedProducts.includes(product.productId)}
                    onChange={() => handleProductSelect(product.productId)}
                    className="form-checkbox w-6 h-6"
                  />
                </TableCell>
              )}
              <TableCell className='md:block hidden'>{product.productId}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${Number(product.price).toFixed(2)}</TableCell>
              <TableCell className='md:block hidden'>{renderStarRating(product.rating)}</TableCell>
              <TableCell className='md:block hidden'>{product.stockQuantity}</TableCell>
              <TableCell>{renderStockStatus(product.stockQuantity)}</TableCell>
              {isEditable && (
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <td>
              <DeleteProductButton
                productId={product.productId}
                productName={product.name}
                onDelete={handleDeleteProduct}
              />
            </td>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="mt-4">
      <PaginationComp   totalpage={totalPage || 1}
          currentpage={page}
          onPageChange={handlePageChange}/>
      </div>
    </div>
  )
}

export default InventoryTable