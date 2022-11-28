import { Company } from "./company";
import { User } from "./user";

export interface Route{
    id?: number;
    description: string;
    companies: Company[];
    salesman: User;
}