
export interface ITiendaSimilary {
  [nombreTienda: string]: number;
}

interface IProducto {
  [indice: string]: string;
}


export interface ISimilary {
  similitud: ITiendaSimilary;
  producto: IProducto;
}