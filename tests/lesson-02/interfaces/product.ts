export interface Product {
    productName: string;
    regularPrice: number;
    salePrice: number;
    catalogVisibility?: "Shop and search results"|"Shop only"|"Search results only"|"Hidden";
}