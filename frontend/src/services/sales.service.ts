import { baseUrl } from "../config/baseUrl";
import { ISale } from "../interfaces/sale.interface";
import { IStore } from "../interfaces/store.interface";


export const storesUrl = `${baseUrl}/stores`;
export const salesUrl = `${baseUrl}/sales`;

const getAllStores = async (url: string): Promise<IStore[]> => {
  const response = await fetch(url);
  const data = (await response.json()) as IStore[];
  return data;
};

const getSales = async (url: string): Promise<ISale[]> => { 
  const response = await fetch(url);
  const data = (await response.json()) as ISale[];
  return data;
}



export {  getAllStores, getSales }