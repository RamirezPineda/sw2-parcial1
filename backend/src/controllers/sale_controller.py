
from src.models.sale import Sale
from src.services.sales_services import SalesService


class SaleController:
    def __init__(self):
        self.service = SalesService()

    def getStores(self):
        return self.service.getStores()
    
    def getSale(self, store_id: int):
        return self.service.getSale(store_id)

    def getSales(self):
        return self.service.getSales()

    def getSimilary(_, store_id: str):
        # print('valid')
        return SalesService().getSimilary(store_id)