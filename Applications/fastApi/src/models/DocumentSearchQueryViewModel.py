from typing import List

from pydantic import BaseModel

from src.models.Document import Document


class DocumentSearchQueryViewModel(BaseModel):
    searchQuery: str = None
    documents: List[Document]
