from fastapi import APIRouter
from app.api.endpoints import shops, products, upload

api_router = APIRouter()
api_router.include_router(shops.router, prefix="/shops", tags=["shops"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"]) 