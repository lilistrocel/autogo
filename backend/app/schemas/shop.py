from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ShopBase(BaseModel):
    name: str
    description: Optional[str] = None
    logoUrl: Optional[str] = None

class ShopCreate(ShopBase):
    pass

class ShopUpdate(ShopBase):
    pass

class Shop(ShopBase):
    id: int
    ownerId: Optional[int] = None
    createdAt: datetime
    updatedAt: Optional[datetime] = None

    class Config:
        from_attributes = True
        alias_generator = lambda string: ''.join(
            word.capitalize() if i > 0 else word
            for i, word in enumerate(string.split('_'))
        ) 