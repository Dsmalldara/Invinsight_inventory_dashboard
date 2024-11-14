'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts, Product } from '../apis/ProductsApi';
import { PaginationComp } from '../pagination/pagination';
import { current } from 'tailwindcss/colors';
import CreateProduct from './CreateProduct';
import { Toaster } from 'sonner';

const ProductGrid = () => {
    const [currentPage, setCurrentPage] = useState<number>(2)
  const { products, isLoading, error, currentpage, totalPage } = getAllProducts(10, currentPage);
  // Array of background colors for variety
  const bgColors = [
    // 'bg-blue-500',
    // 'bg-green-500',
    'bg-purple-100',
    'bg-purple-200',
    'bg-purple-300',
    'bg-purple-400',
    'bg-purple-500',
    // 'bg-pink-500',
    // 'bg-indigo-500',
    // 'bg-yellow-500',
    // 'bg-red-500',
    // 'bg-teal-500',
    // 'bg-orange-500',
    // 'bg-cyan-500'
  ];

 
  const handlePageChange = (page: number) => {
    console.log("Changing to page:", page);  // Debug log
    setCurrentPage(page);
  }

  console.log("Current page in grid:", currentPage);
  const getRandomColor = () => {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  };

  const skuArray = [
    "SKU-1001-A",
    "SKU-1002-B",
    "SKU-1003-C",
    "SKU-1004-D",
    "SKU-1005-E",
    "SKU-2001-A",
    "SKU-2002-B",
    "SKU-3001-C",
    "SKU-4001-D",
    "SKU-5001-E",
  ];

  const getRandomSKU = () => {
    return skuArray[Math.floor(Math.random() * skuArray.length)];
  };

  // Create a placeholder image with the first letter of product name
  const ProductImage = ({ name }: { name: string }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const bgColor = React.useMemo(() => getRandomColor(), []);
    
    return (
      <div className={`aspect-square w-full flex items-center justify-center rounded-lg ${bgColor}`}>
        <span className="text-6xl font-bold text-white">
          {firstLetter}
        </span>
      </div>
    );
  };

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-600 mx-auto my-auto">
        Failed to load products. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {[...Array(10)].map((_, index) => (
          <Card 
            key={`skeleton-${index}`} 
            className="w-full overflow-hidden relative"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
              <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
  
            <CardHeader className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </CardHeader>
  
            <CardContent>
              <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </CardContent>
  
            <CardFooter>
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
  
    <div>
       <Toaster />
       <span className='flex justify-center my-6'>
       <CreateProduct/>
       </span>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products?.map((product: Product) => (
        <Card key={product.productId} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold truncate">
              {product.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              SKU: {getRandomSKU()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="aspect-square w-full relative mb-4">
              <ProductImage name={product.name} />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                Stock: <span className="font-medium">{product.stockQuantity}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-lg font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                product.stockQuantity > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  <div className='mt-6'>
  <PaginationComp 
          totalpage={totalPage || 1}
          currentpage={currentPage}
          onPageChange={handlePageChange}
        />
  </div>
    </div>
  );
};

export default ProductGrid;

