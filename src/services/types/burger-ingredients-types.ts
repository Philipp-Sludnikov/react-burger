export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TIngredients = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsError: string;
  ingredients: Array<TIngredient>
}

export type TIngredientItemProps = {
  ingredient: TIngredient;
}

export type TBurgerIngredientsListProps = {
  heading: string;
  ingredients: Array<TIngredient>;
  type: string;
}

export type TOrderInfoOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type TOrderInfo = {
  ingredients: Array<TIngredient>;
  _id: string;
  owner: TOrderInfoOwner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}