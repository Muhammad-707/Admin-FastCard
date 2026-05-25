export interface Color {
  id: number;
  colorName: string;
}

export interface ProductPayload {
  Id?: number;
  ProductName: string;
  Code: string;
  Description: string;
  Price: number;
  DiscountPrice?: number;
  HasDiscount: boolean;
  Quantity: number;
  Weight?: string;
  Size?: string;
  BrandId?: number;
  ColorId?: number;
  SubCategoryId?: number;
  CategoryId?: number;
}