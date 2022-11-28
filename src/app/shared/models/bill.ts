export interface Bill{
    id?: number;
    sale_id?: number;
    total_paid: number;
    pay_code: string[];
}