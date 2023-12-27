
import json
from sqlalchemy import select, text
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from src.database.connection import engine
from src.models.results import Result


class SalesService:


    def getStores(self):
        with engine.connect() as connection:
            query = connection.execute(text("SELECT DISTINCT tienda_id, tienda FROM tabla_resultados"))
            
            #fetchall() para obtener todas las filas
            rows = query.fetchall()
            
            unique_stores = [{"tienda_id": row[0], "tienda": row[1]} for row in rows]
            
            return unique_stores


    def getSale(self, tienda_id: int):
        resultadosToQuery = select(Result).where(Result.tienda_id == tienda_id)

        df = pd.read_sql(resultadosToQuery, con=engine)

        # tiendas = df.groupby(by=['tienda_id']).cantidad_venta.sum()

        tiendasJson = df.to_json(orient='records', force_ascii=False)

        tiendasDict = json.loads(tiendasJson)

        return tiendasDict
            

    def getSales(self):
        with engine.connect() as connection:
            print(connection)
            query = connection.execute(text("SELECT * FROM tabla_resultados WHERE tienda_id=10000"))

             # keys() para obtener los nombres de las columnas
            column_names = query.keys()
            
            # fetchall() para obtener todas las filas
            rows = query.fetchall()

            # Construye una lista de diccionarios con los resultados
            result = [dict(zip(column_names, row)) for row in rows]

            return { "sales": result }

    
    def getSimilary(_, tienda_id):
        resultadosToQuery = select(Result)

        df = pd.read_sql(resultadosToQuery, con=engine)

        store_items_matrix = df.pivot_table(
            index='tienda_id',
            columns='sku_id',
            values='cantidad_venta',
            aggfunc='sum'
        )

        store_items_matrix = store_items_matrix.applymap(lambda x: 1 if x>0 else 0)

        store_sim_matrix = pd.DataFrame(
                cosine_similarity( store_items_matrix)
            )


        store_sim_matrix['tienda_id'] = store_items_matrix.index
        store_sim_matrix = store_sim_matrix.set_index('tienda_id')
        store_sim_matrix.columns = store_items_matrix.index

        store_a = int(tienda_id)

        similitudes = store_sim_matrix.loc[store_a].sort_values(ascending=False)
        # return 'all ight'
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

        store_b = int(similares[similares.similitud < 0.99999].max()['tiendas'])

        similares['tiendas'] = tiendas_name['tienda'].tolist()

        similares = similares.set_index('tiendas')

        # obtener items comprados por clientes
        items_bouth_in_a = set(store_items_matrix.loc[store_a].iloc[
            store_items_matrix.loc[store_a].to_numpy().nonzero()
            ].index)

        items_bouth_in_b = set(store_items_matrix.loc[store_b].iloc[
            store_items_matrix.loc[store_b].to_numpy().nonzero()
            ].index)


        items_to_recommend_to_B = items_bouth_in_a - items_bouth_in_b

        resultado = df.loc[
            df['sku_id'].isin(items_to_recommend_to_B),
            ['sku_nom']
            ].drop_duplicates().reset_index(drop=True)

        resultado.rename(columns={ resultado.columns[0]: 'producto'}, inplace = True)

        response = json.dumps([similares.to_dict(), resultado.to_dict()], ensure_ascii=False)
        responseDict = json.loads(response)
        
        return responseDict
