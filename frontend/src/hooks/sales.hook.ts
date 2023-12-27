import useSWR from "swr";
import { getAllStores, getSales, salesUrl, storesUrl } from "../services/sales.service";

const useGetAllStores = () => {
  const { data, isLoading, error } = useSWR(storesUrl, getAllStores);
  return { stores: data, isLoading, error };
};

const useGetSales = (id: number) => {
  const { data, error, isLoading } = useSWR(`${salesUrl}/${id}`, getSales);

  return { sales: data, isLoading, error };
};


export { useGetAllStores, useGetSales };
