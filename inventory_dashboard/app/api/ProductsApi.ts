'use client'
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { apiClient } from "./DashboardMetrics"

export interface Product {
    productId: string,
    name:string,
    price:number,
    rating?:number,
    stockQuantity: number
    productImage?:string

}
interface ProductResponse {
    products: Product[];
    totalPages: number;
    currentPage: number;
}
export const queryKeys = {
    Products : ['getproducts'] as const,
    Users: ["userKey"] as const
}
export const getProducts = (limit:number,page:number)=>{
    const CACHE_TIME = 5*60*1000
    const STALE_TIME = 1*60*1000 
 const {data,isLoading,error} = useQuery({
    queryKey:[...queryKeys.Products, page],

    queryFn:()=> apiClient.get(`/products?limit=${limit}&page=${page}`),
        enabled:true,
        refetchInterval: CACHE_TIME,
        staleTime: STALE_TIME,
        refetchIntervalInBackground: false,
        refetchOnMount: false, 
        refetchOnReconnect: false, 
        
 })
 return {
    products: data?.data.products,
    currentpage:data?.data.currentpage,
    totalPage:data?.data?.totalpage,
    isLoading,
    error
  }
}
interface GetAllProductsParams {
    limit: number;
    page: number;
}
export const getAllProducts = (limit:number,page:number)=>{
    const CACHE_TIME = 5*60*1000
    const STALE_TIME = 1*60*1000 
    // const limit = 10
    // const page =1
 const {data,isLoading,error} = useQuery({
      // Include page in queryKey so React Query knows to refetch when page changes
      queryKey: [...queryKeys.Products, page],

    queryFn:()=> apiClient.get(`/products?limit=${limit}&page=${page}`),
        enabled:true,
        refetchInterval: CACHE_TIME,
        staleTime: STALE_TIME,
        refetchIntervalInBackground: false,
        refetchOnMount: false, 
        refetchOnReconnect: false, 
        
 })
 return {
    products: data?.data.products,
    currentpage:data?.data.currentpage,
    totalPage:data?.data?.totalpage,
    isLoading,
    error
  }
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async(data: { name: string; price: number; stockQuantity: number }) => {
        const response = await apiClient.post('/products/createProduct', data);
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['getproducts'] });
        queryClient.setQueryData(['createproduct'], data);
      },
      onError: (error: AxiosError) => {
        console.error('Error in product creation:', error.response?.data || error.message);
      }
    });
  
    return {
      isLoading: mutation.isPending,
      error: mutation.error,
      mutate: mutation.mutate,
    };
  };
export const deleteProduct = ()=>{
    const queryClient = useQueryClient()
   return  useMutation({
        mutationFn:async(productId: string)=>{
            const response = await apiClient.delete(`/products/deleteProduct/${productId}`)
            return response.data
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey: queryKeys.Products})
        },
        onError:(error:AxiosError)=>{
            console.error('Error in job assignment:', error.response?.data || error.message);
          }
    })
    
}