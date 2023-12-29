import useSWR from "swr";
import {
  getAllStores,
  getSales,
  salesUrl,
  similaryUrl,
  storesUrl,
  getSimilary,
  salesStoreUrl,
  getSalesByStoreName,
  totalSalesUrl,
  averageProfitabilityUrl,
  averageSalesPerDayUrl,
  rubroConMayorVolumenVentasUrl,
  getTotalSales,
  getAverageProfitability,
  getAverageSalesPerDay,
  getRubroConMayorVolumenVentas,
} from "../services/sales.service";

const useGetAllStores = () => {
  const { data, isLoading, error } = useSWR(storesUrl, getAllStores);
  return { stores: data, isLoading, error };
};

const useGetTotalSales = (id: number) => {
  const { data, error, isLoading } = useSWR(`${totalSalesUrl}/${id}`, getTotalSales);
  return { total: data, isLoading, error };
};

const useGetAverageProfitability = (id: number) => {
  const { data, error, isLoading } = useSWR(
    `${averageProfitabilityUrl}/${id}`,
    getAverageProfitability
  );
  return { profitability: data, isLoading, error };
};

const useGetAverageSalesPerDay = (id: number) => {
  const { data, error, isLoading } = useSWR(
    `${averageSalesPerDayUrl}/${id}`,
    getAverageSalesPerDay
  );
  return { average: data, isLoading, error };
};

const useGetRubroMasVendido = (id: number) => {
  const { data, error, isLoading } = useSWR(
    `${rubroConMayorVolumenVentasUrl}/${id}`,
    getRubroConMayorVolumenVentas
  );
  return { rubroMasVendido: data, isLoading, error };
};

const useGetSales = (id: number) => {
  const { data, error, isLoading } = useSWR(`${salesUrl}/${id}`, getSales);

  return { sales: data, isLoading, error };
};

const useGetSimilary = (id: number) => {
  const { data, error, isLoading } = useSWR(
    `${similaryUrl}/${id}`,
    getSimilary
  );

  return { data, isLoading, error };
};

const useGetSalesByStoreName = (tienda: string) => {
  const { data, error, isLoading } = useSWR(
    `${salesStoreUrl}/${tienda}`,
    getSalesByStoreName
  );

  return { sales: data, isLoading, error };
};

export {
  useGetAllStores,
  useGetSales,
  useGetSimilary,
  useGetSalesByStoreName,
  useGetTotalSales,
  useGetAverageProfitability,
  useGetAverageSalesPerDay,
  useGetRubroMasVendido,
};
