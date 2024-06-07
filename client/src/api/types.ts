export type Product = {
    id: number;
    name: string;
    price: number;
}

export type APIResponse<T> = {
    success: boolean
    content: T;
    status?: number;
}