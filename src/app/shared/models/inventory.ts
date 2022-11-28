import { Item } from "./item";

export interface Inventory{
    id?: number;
    stock:number;
    item?: Item;
}