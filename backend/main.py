
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
    return controller.getStores()

@app.get('/sales/{store_id}')
def get_sale(store_id: int):
    return controller.getSale(store_id)

@app.get('/sales')
def get_sales():
    # return {"hola" : "golaaaaa" }
    return controller.getSales()
    
@app.get('/similary{store_id}')
def get_properties(store_id: str):
    return controller.getSimilary(store_id)

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
