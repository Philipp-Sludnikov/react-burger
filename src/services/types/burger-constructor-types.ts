export type TConstructorIngredient = {
  id: string;
  type: string;
  name: string;
  price: number;
  image: string;
}

export type TConstructorItem = {
  locked?: boolean;
  constructorItem: TConstructorIngredient;
  index?: number;
  id: string;
}

export type TConstructorItemElement = {
  constructorItem: TConstructorIngredient;
  isLocked?: boolean;
  type?: "top" | "bottom";
  onClick?: any;
  index?: number;
}
