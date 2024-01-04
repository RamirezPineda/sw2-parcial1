
import json
from sqlalchemy import select, text
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity

from src.database.connection import engine
from src.models.results import Result


class SalesService:


    def get_stores(self):
        with engine.connect() as connection:
            query = connection.execute(text("SELECT DISTINCT tienda_id, tienda FROM tabla_resultados"))
            
            #fetchall() para obtener todas las filas
            rows = query.fetchall()
            
            unique_stores = [{"tienda_id": row[0], "tienda": row[1]} for row in rows]
            
            return unique_stores
         

    def calculate_total_sales(self, tienda_id: int):
        resultados_to_query = select(Result).where(Result.tienda_id == tienda_id)
        df = pd.read_sql(resultados_to_query, con=engine)

        ventas_totales = df['total_venta'].sum()

        return {'total_sales': int(ventas_totales)}
    

    def calculate_average_profitability(self, tienda_id):
        resultados_to_query = select(Result).where(Result.tienda_id == tienda_id)
        df = pd.read_sql(resultados_to_query, con=engine)

        # Manejo de NaN e infinitos
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
        df.dropna(inplace=True)

        # Calcular el precio original y la rentabilidad
        df['precio_original'] = np.where(df['descuento_venta'] != 1, df['precio_venta'] / (1 - df['descuento_venta']), 0)
        df['rentabilidad'] = df['precio_venta'] - df['precio_original']

        # Manejo de infinitos y NaN después de los nuevos cálculos
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
        df.dropna(inplace=True)

        rentabilidad_promedio = round(df['rentabilidad'].mean(), 2)

        return {'average_profitability': rentabilidad_promedio }


    def calculate_average_sales_per_day(self, tienda_id):
        resultados_to_query = select(Result).where(Result.tienda_id == tienda_id)
        df = pd.read_sql(resultados_to_query, con=engine)

        df['fecha_venta'] = pd.to_datetime(df['fecha_venta'])

        # Calcular promedio de ventas por día
        promedio_ventas_por_dia = df['cantidad_venta'].mean()

        promedio_ventas_por_dia = round(float(promedio_ventas_por_dia), 2)

        return {"average_sales_per_day": promedio_ventas_por_dia }


    def rubro_con_mayor_volumen_ventas(self, tienda_id):
        resultados_to_query = select(Result).where(Result.tienda_id == tienda_id)
        df = pd.read_sql(resultados_to_query, con=engine)

        rubro_mas_vendido = df.groupby('rubro')['cantidad_venta'].sum().idxmax()

        return {'rubro_mas_vendido': rubro_mas_vendido}



    def get_sales(self, tienda_id: int):
        resultadosToQuery = select(Result).where(Result.tienda_id == tienda_id)

        df = pd.read_sql(resultadosToQuery, con=engine)

        # tiendas = df.groupby(by=['tienda_id']).cantidad_venta.sum()

        tiendasJson = df.to_json(orient='records', force_ascii=False)

        tiendasDict = json.loads(tiendasJson)

        return tiendasDict
            

    def get_rentability_product(self, tienda_id):
        resultados_to_query = select(Result).where(Result.tienda_id == tienda_id)
        df = pd.read_sql(resultados_to_query, con=engine)

        # Manejo de NaN e infinitos
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
        df.dropna(inplace=True)

        # Calcular el precio original y la rentabilidad
        df['precio_original'] = np.where(df['descuento_venta'] != 1, df['precio_venta'] / (1 - df['descuento_venta']), 0)
        df['rentabilidad'] = df['precio_venta'] - df['precio_original']

        # Manejo de infinitos y NaN después de los nuevos cálculos
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
        df.dropna(inplace=True)

        # Agrupa por producto y calcula la rentabilidad promedio por producto
        rentabilidad_por_producto = df.groupby('producto')['rentabilidad'].mean().sort_values()

        result_dict =  rentabilidad_por_producto.to_dict()

        return result_dict


    
    def get_similary(_, tienda_id):
        print('llego aqui')
        columnas_necesarias = ['tienda_id', 'sku_id', 'cantidad_venta', 'tienda']
    
        # Construir la expresión de selección desempaquetando las columnas de la clase Result
        columnas_seleccion = [getattr(Result, col) for col in columnas_necesarias]
    
        # Crear la consulta select
        resultadosToQuery = select(*columnas_seleccion)

        # resultadosToQuery = select(Result)
        
        print('llego aqui 2')
        df = pd.read_sql_query(resultadosToQuery, con=engine)
        # df = pd.read_sql(resultadosToQuery, con=engine)
        print('llego aqui3')
        store_items_matrix = df.pivot_table(
            index='tienda_id',
            columns='sku_id',
            values='cantidad_venta',
            aggfunc='sum',
            fill_value=0  # Llena los valores NaN con 0
        )
        print('llego aqui 4')
        store_items_matrix = store_items_matrix.applymap(lambda x: 1 if x>0 else 0)

        store_sim_matrix = pd.DataFrame(
                cosine_similarity( store_items_matrix)
            )

        store_sim_matrix['tienda_id'] = store_items_matrix.index
        store_sim_matrix = store_sim_matrix.set_index('tienda_id')
        store_sim_matrix.columns = store_items_matrix.index

        store_a = int(tienda_id)

        similitudes = store_sim_matrix.loc[store_a].sort_values(ascending=False)
        similitudes = pd.DataFrame(similitudes)

        #resetear el index
        similares = similitudes.reset_index()

        #renombrar columna
        similares.rename(columns={ similares.columns[0]: 'tiendas'}, inplace = True)

        similares.rename(columns={ similares.columns[1]: 'similitud'}, inplace = True)

        #change id to names
        tiendas_names = df.loc[df['tienda_id'].isin(set(similares['tiendas'])), ['tienda_id','tienda']
        ].drop_duplicates().set_index('tienda_id')

        similares = similares.sort_values('tiendas', ascending=True)
        tiendas_name = tiendas_names.sort_values('tienda_id', ascending=True)

        # store_b = int(similares[similares.similitud < 0.99999].max()['tiendas'])
        # store_b = int(similares.loc[similares.similitud.idxmax(), 'tiendas'])
        # obtiene el segundo valor mas alto de la columna similitud (tienda que tiene mas similitud)
        # store_b = int(similares.loc[similares.similitud.nlargest(2).index[-1], 'tiendas'])

        # print(store_b)

        similares['tiendas'] = tiendas_name['tienda'].tolist()

        similares = similares.set_index('tiendas')
        # top 6 tiendas mas similares
        similares = similares.nlargest(6, 'similitud') 

        max_similitud_index = similares['similitud'].idxmax()
        # eliminar la tienda mas valor de similitud que seria la tienda que le pase por parametro
        # tiene un puntaje de 1.0 o mas
        similares = similares.drop(max_similitud_index)

        # print(similares)

        # obtener items comprados por clientes
        #  to_numpy().nonzero() para obviar los elementos nulos
        # items_bouth_in_a = set(store_items_matrix.loc[store_a].iloc[
        #     store_items_matrix.loc[store_a].to_numpy().nonzero()
        #     ].index)

        # items_bouth_in_b = set(store_items_matrix.loc[store_b].iloc[
        #     store_items_matrix.loc[store_b].to_numpy().nonzero()
        #     ].index)


        # items_to_recommend_to_B = items_bouth_in_a - items_bouth_in_b
        # items_to_recommend_to_A = items_bouth_in_b - items_bouth_in_a

        # resultado = df.loc[
        #     df['sku_id'].isin(items_to_recommend_to_A),
        #     ['sku_nom']
        #     ].drop_duplicates().reset_index(drop=True).head(10)
        
        # resultado.rename(columns={ resultado.columns[0]: 'producto'}, inplace = True)

        # response = json.dumps([similares.to_dict(), resultado.to_dict()], ensure_ascii=False)
        # responseDict = json.loads(response)

        # response = [similares.to_dict(), resultado.to_dict()]

        # return response

        del store_items_matrix
        del store_sim_matrix
        del df

        return [similares.to_dict()]


    def get_sales_by_store_name(self, tienda: str):
        resultadosToQuery = select(Result).where(Result.tienda == tienda)

        df = pd.read_sql(resultadosToQuery, con=engine)

        tiendasJson = df.to_json(orient='records', force_ascii=False)

        tiendasDict = json.loads(tiendasJson)

        return tiendasDict
    