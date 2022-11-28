import { Item } from "./item";

export interface ItemSale{
    id?: number;
    item: Item;
    quantity: number;
    sale_id?: number;
}
export interface Sales{
    id?: number;
    client: number;
    sale_items: ItemSale[];
    bill?: number;
    status: string;
}

export interface SaleItem{
    id: number;
    quantity: number;
}

export interface Sale{
    id?: number;
    price: number;
    items: SaleItem[];
    client: number;
}