"use client";
import React, { useMemo, useState } from "react";
import { getExpenses } from "../api/expensesApi";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classNames, cn } from "@/lib/utils";
import { Pie, ResponsiveContainer } from "recharts";
import { PieChart } from "lucide-react";
import { ExpensesPieChart } from "./ExpensesPieChart";
import Loader from "@/lib/Loader";

export   type AggregatedDataItem = {
    name:string,
    color?:string,
    amount:number
   }
function Expenses() {

   type AggregatedData = {
    [category:string]:AggregatedDataItem
   }
  const { data, isLoading, error } = getExpenses();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectCategory, setSelectCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const expenses = useMemo(() => data?.data ?? [], [data]);
  const parseDate = (dateString:string)=> {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]
  }
  const aggregatedData = useMemo(() => {
    const filter = expenses.filter((data:any) => {
      const matchesCategory = selectCategory == "All" || data.category == selectCategory;
      const dataDate = parseDate(data.date);
      const matchesDate = !startDate || !endDate || (dataDate >= startDate && dataDate <= endDate);
      return matchesDate && matchesCategory;
    }).reduce((acc:AggregatedData, data:any) => {
        const amount = parseInt(data.amount)
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` };
        }
        acc[data.category].amount += amount;
        return acc;
    }, {});
    return Object.values(filter) as AggregatedDataItem[];
  },[expenses,selectCategory,startDate,endDate]);
  console.log(aggregatedData)
  if (error) return <div className="text-red-500">Error loading expenses</div>;
 // For full screen
if (!data) {
  return <Loader />;
}

// For inline/smaller container
if (!data) {
  return <Loader fullScreen={false} />;
}
  return (
    <div className="mb-5">
  <header className="text-center items-center underline font-bold text-xl my-2">Expenses</header>
  <p className="text-sm text-gray-500 text-center my-3 ">
    A visual representation of expenses over time.
  </p>
  
  {/* Filters */}
  <div className="flex flex-col  justify-between gap-4 items-center">
    <div className="w-full  bg-white shadow rounded-lg p-6 mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Filter by Categories and Date
      </h3>
      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700 my-4 text-center">
          Category
        </Label>
        <div className="mx-auto flex items-center justify-center">
        {/* <Select 
          defaultValue={selectCategory} 
          onValueChange={(value: string) => setSelectCategory(value)}
        >
          <SelectTrigger 
            className={cn(
              'w-full sm:w-[180px]',
              'bg-white text-gray-900 border border-gray-300 shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
              'dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
            )}
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent 
            className={cn(
              'bg-white border border-gray-300 shadow-sm',
              'dark:bg-gray-800 dark:border-gray-600'
            )}
          >
            <SelectGroup>
           
              <SelectItem 
                value="Office"
                className={cn(
                  'px-4 py-2 text-sm text-gray-900 hover:bg-gray-100',
                  'dark:text-gray-200 dark:hover:bg-gray-700'
                )}
              >
                Office
              </SelectItem>
              <SelectItem 
                value="Professional"
                className={cn(
                  'px-4 py-2 text-sm text-gray-900 hover:bg-gray-100',
                  'dark:text-gray-200 dark:hover:bg-gray-700'
                )}
              >
                Professional
              </SelectItem>
              <SelectItem 
                value="Salaries"
                className={cn(
                  'px-4 py-2 text-sm text-gray-900 hover:bg-gray-100',
                  'dark:text-gray-200 dark:hover:bg-gray-700'
                )}
              >
                Salaries
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <div className="mt-4">
                <label htmlFor="start-date" className={classNames.label}>
                   Start Date 
                </label>
                <input type="date" id="start-date" name="start-date" className={classNames.selectInput} defaultValue="All" onChange={(e)=>setStartDate(e.target.value)} />
        </div>
        {/* <div className="mt-4">
        <label htmlFor="end-date" className={classNames.label}>
                   End Date 
                </label>
                <input type="date" id="end-date" name="end-date" className={classNames.selectInput} defaultValue="All" onChange={(e)=>setEndDate(e.target.value)} />
        </div> */}
        </div>
      </div>
    </div>

            {/* Chart */}
            <ExpensesPieChart aggregatedData={aggregatedData} />
  </div>
</div>
  );
}

export default Expenses;
