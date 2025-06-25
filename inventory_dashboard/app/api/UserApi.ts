'use client'
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./ProductsApi"
import { apiClient } from "./DashboardMetrics"


export const getUsers = (limit:number,page:number)=>{
    const CACHE_TIME = 5*60*1000
    const STALE_TIME = 1*60*1000
    const {data, isLoading, error} = useQuery({
        queryKey:[...queryKeys.Users, page],
        queryFn:()=> apiClient.get(`/users?limit=${limit}&page=${page}`),
        enabled:true,
        refetchInterval: CACHE_TIME,
        staleTime: STALE_TIME,
        refetchIntervalInBackground: false,
        refetchOnMount: false, 
        refetchOnReconnect: false,

    })
    return {
        users:data?.data?.users,
        totalUsers:data?.data?.totalUsers,
        limit:data?.data?.limit,
        totalPage:data?.data?.totalPage,
        isLoading,
        error
    }
}