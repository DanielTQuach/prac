from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Item
from app.schemas import ItemCreate, ItemRead

router = APIRouter(prefix="/items", tags=["items"])


@router.get("", response_model=list[ItemRead])
def list_items(db: Session = Depends(get_db)):
    return db.query(Item).all()


@router.post("", response_model=ItemRead, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    db_item = Item(name=item.name, description=item.description)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.get("/{item_id}", response_model=ItemRead)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(Item, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
