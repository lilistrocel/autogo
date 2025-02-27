from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.shop import Shop
from app.schemas.shop import ShopCreate, ShopUpdate, Shop as ShopSchema

router = APIRouter()

@router.get("/", response_model=List[ShopSchema])
def get_shops(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return db.query(Shop).offset(skip).limit(limit).all()

@router.post("/", response_model=ShopSchema)
def create_shop(shop: ShopCreate, db: Session = Depends(get_db)):
    db_shop = Shop(**shop.model_dump())
    db_shop.owner_id = 1  # TODO: Get from current user
    db.add(db_shop)
    db.commit()
    db.refresh(db_shop)
    return db_shop

@router.get("/{shop_id}", response_model=ShopSchema)
def get_shop(shop_id: int, db: Session = Depends(get_db)):
    db_shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if db_shop is None:
        raise HTTPException(status_code=404, detail="Shop not found")
    return db_shop

@router.put("/{shop_id}", response_model=ShopSchema)
def update_shop(shop_id: int, shop: ShopUpdate, db: Session = Depends(get_db)):
    db_shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if db_shop is None:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    for key, value in shop.model_dump(exclude_unset=True).items():
        setattr(db_shop, key, value)
    
    db.commit()
    db.refresh(db_shop)
    return db_shop

@router.delete("/{shop_id}")
def delete_shop(shop_id: int, db: Session = Depends(get_db)):
    db_shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if db_shop is None:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    db.delete(db_shop)
    db.commit()
    return {"ok": True} 