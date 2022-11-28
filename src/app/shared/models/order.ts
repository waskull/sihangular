import { Item } from "./item";
import { User } from "./user";

export interface OrderItem{
    id?: number;
    item: Item;
    quantity: number;
    order_id?: number;
}

export interface Order{
    id?: number;
    price: number;
    bought_by: User;
    order_items: any[];
}

export interface PurchaseItem{
    id: number;
    quantity: number;
}

export interface Purchase{
    id?: number;
    price: number;
    items: PurchaseItem[];
}