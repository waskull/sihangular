import { Client } from "./client";

export interface Company {
    id?: number;
    name: string;
    address: string;
    phone: string;
    phone2?: string;
    client_id: number;
}