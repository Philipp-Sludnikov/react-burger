import { TIngredient } from "./burger-ingredients-types";

export type TConstructorIngredient = {
  id: string;
  type: string;
  name: string;
  price: number;
  image: string;
}

export type TConstructorItem = {
  locked?: boolean;
  constructorItem: TIngredient;
  index?: number;
  id: string;
}

export type TConstructorItemElement = {
  constructorItem: TIngredient;
  isLocked?: boolean;
  type?: "top" | "bottom";
  onClick?: any;
  index?: number;
}
