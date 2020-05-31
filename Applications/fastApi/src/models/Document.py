from pydantic import BaseModel


class Document(BaseModel):
    textContent: str  # required

    count: int = None
    isAncestorLink: bool = None
    name: str = None
    sentiment: str = None



