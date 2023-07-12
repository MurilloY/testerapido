export interface Category {
    category_id: string;
    category_name: string;
    category_status: number;
}

export interface ReturnCategories {
    message: string;
    categories: Category[];
    refreshToken: string;
}