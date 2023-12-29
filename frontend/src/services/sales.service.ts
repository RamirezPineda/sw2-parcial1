import { baseUrl } from "../config/baseUrl";
import { ISale } from "../interfaces/sale.interface";
import { ITiendaSimilary } from "../interfaces/similiray.interface";
import { IStore } from "../interfaces/store.interface";

export const storesUrl = `${baseUrl}/stores`;

export const totalSalesUrl = `${baseUrl}/total-sales`;
export const averageProfitabilityUrl = `${baseUrl}/average-profitability`;
export const averageSalesPerDayUrl = `${baseUrl}/average-sales-per-day`;
export const rubroConMayorVolumenVentasUrl = `${baseUrl}/rubro-con-mayor-volumen-ventas`;

export const salesUrl = `${baseUrl}/sales`;
export const similaryUrl = `${baseUrl}/similary`;
export const salesStoreUrl = `${baseUrl}/sales-store-similary`;

const getAllStores = async (url: string): Promise<IStore[]> => {
  const response = await fetch(url);
  const data = (await response.json()) as IStore[];
  return data;
};

const getTotalSales = async (url: string): Promise<number> => {
  const response = await fetch(url);
  const data = await response.json();
  return data.total_sales as number;
};

const getAverageProfitability = async (url: string): Promise<number> => {
  const response = await fetch(url);
  const data = await response.json();
  return data.average_profitability as number;
};

const getAverageSalesPerDay = async (url: string): Promise<number> => {
  const response = await fetch(url);
  const data = await response.json();
  return data.average_sales_per_day as number;
};

const getRubroConMayorVolumenVentas = async (url: string): Promise<number> => {
  const response = await fetch(url);
  const data = await response.json();
  return data.rubro_mas_vendido as number;
}


const getSales = async (url: string): Promise<ISale[]> => {
  const response = await fetch(url);
  const data = (await response.json()) as ISale[];
  return data;
};

const getSimilary = async (url: string): Promise<ITiendaSimilary> => {
  const response = await fetch(url);
  const data = await response.json();
  return data[0].similitud as ITiendaSimilary;
};

const getSalesByStoreName = async (url: string): Promise<ISale[]> => {
  const response = await fetch(url);
  const data = (await response.json()) as ISale[];
  return data;
};

export {
  getAllStores,
  getSales,
  getSimilary,
  getSalesByStoreName,
  getTotalSales,
  getAverageProfitability,
  getAverageSalesPerDay,
  getRubroConMayorVolumenVentas
};
