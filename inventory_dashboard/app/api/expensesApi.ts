'use client'
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "./DashboardMetrics"

export const getExpenses = ()=>{
    const CACHE_TIME = 5*60*1000
    const STALE_TIME = 1*60*1000 
 const {data,isLoading,error} = useQuery({
    queryKey:["expenses"],

    queryFn:()=> apiClient.get(`/expenses`),
        enabled:true,
        refetchInterval: CACHE_TIME,
        staleTime: STALE_TIME,
        refetchIntervalInBackground: false,
        refetchOnMount: false, 
        refetchOnReconnect: false, 
        
 })

  return {
    data, error, isLoading,
  }
}