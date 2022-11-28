export interface User{
    id?: number;
    email?: string;
    password?: string;
    firstname: string;
    lastname: string;
    roles: string[];
    age: number;
    cedula: string;
    phone?: string;
}

export interface UserLogin{
    email: string;
    password: string;
}

export interface UserEdit{
    id?: number;
    password: string;
    firstname: string;
    lastname: string;
    roles?: string[];
    age: number;
    cedula: string;
    phone?: string;
}