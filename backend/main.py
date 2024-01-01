
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.controllers.sale_controller import SaleController

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:5173",
    "https://cdam-web-site.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

controller = SaleController()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get('/stores')
def get_sales():
    return controller.get_stores()

@app.get('/total-sales/{store_id}')
def get_total_sales(store_id: int):
    return controller.calculate_total_sales(store_id)

@app.get('/average-profitability/{store_id}')
def get_average_profitability(store_id: int):
    return controller.calculate_average_profitability(store_id)

@app.get('/average-sales-per-day/{store_id}')
def get_average_sales_per_day(store_id: int):
    return controller.calculate_average_sales_per_day(store_id)

@app.get('/rubro-con-mayor-volumen-ventas/{store_id}')
def get_rubro_con_mayor_volumen_ventas(store_id: int):
    return controller.rubro_con_mayor_volumen_ventas(store_id)


@app.get('/sales/{store_id}')
def get_sale(store_id: int):
    return controller.get_sales(store_id)


@app.get('/rentability-product/{store_id}')
def get_rentability_product(store_id: int):
    return controller.get_rentability_product(store_id)

    
@app.get('/similary/{store_id}')
def get_similary(store_id: str):
    return controller.get_similary(store_id)


@app.get('/sales-store-similary/{store}')
def get_sales_by_store_name(store: str):
    return controller.get_sales_by_store_name(store)

