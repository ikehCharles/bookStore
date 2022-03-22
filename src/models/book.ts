export interface Book {
    id: string;
    categoryId: number
    category: Category;
	title: string;
	name?: string;
	description: string;
    favorite: boolean;
	imageUrl: string;
}

export interface Category {
    id: string;
	name: string;
	description?: string;
}