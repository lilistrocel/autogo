from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ShopBase(BaseModel):
    name: str
    description: Optional[str] = None
    logo_url: Optional[str] = None

class ShopCreate(ShopBase):
    pass

class ShopUpdate(ShopBase):
    pass

class Shop(ShopBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 