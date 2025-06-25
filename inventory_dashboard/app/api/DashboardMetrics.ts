'use client'
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import axios, { AxiosError } from "axios"
export const BaseURL  = process.env.NEXT_PUBLIC_API_URL 
export const apiClient = axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    // timeout: 10000,
})
export const useDashboardMetrics =()=>{

const CACHE_TIME = 5*60*1000
const STALE_TIME = 1*60*1000 
const {data, isLoading, error} = useQuery({
    queryKey:['dashboardMetrics'],
    queryFn:()=> apiClient.get("/dashboard"),
    refetchInterval: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchIntervalInBackground: false,
    refetchOnMount: false, 
    refetchOnReconnect: false
})
    return {
        data, error
    }
}