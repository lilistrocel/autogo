from fastapi import APIRouter
from app.api.endpoints import shops, products

api_router = APIRouter()
api_router.include_router(shops.router, prefix="/shops", tags=["shops"])
api_router.include_router(products.router, prefix="/products", tags=["products"]) 