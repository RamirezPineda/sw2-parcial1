
from src.models.sale import Sale
from src.services.sales_services import SalesService


class SaleController:
    def __init__(self):
        self.service = SalesService()

    def get_stores(self):
        return self.service.get_stores() 
    
    def calculate_total_sales(self, store_id: int):
        return self.service.calculate_total_sales(store_id)
    
    def calculate_average_profitability(self, store_id: int):
        return self.service.calculate_average_profitability(store_id)
    
    def calculate_average_sales_per_day(self, store_id: int):
        return self.service.calculate_average_sales_per_day(store_id)
    
    def rubro_con_mayor_volumen_ventas(self, store_id: int):
        return self.service.rubro_con_mayor_volumen_ventas(store_id)
    
    
    def get_sales(self, store_id: int):
        return self.service.get_sales(store_id)

    def get_similary(self, store_id: int):
        # print('valid')
        return self.service.get_similary(store_id)
    
    
    def get_sales_by_store_name(self, store: str):
        return self.service.get_sales_by_store_name(store)