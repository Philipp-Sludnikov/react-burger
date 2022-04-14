import { TIngredient } from "./burger-ingredients-types"

export type TFeedOrderProps = {
  order: TFeedOrder
}

export type TOrderListProps = {
  orders: Array<TFeedOrder>
}

export type TOrderTotalsProps= {
  orders: Array<TFeedOrder>
}

export type TFeedOrder = {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export type IngredientListProps = {
  ingredients: Array<TIngredient>
}

export type TFeedDetailsProps = {
  feedOrders?: Array<TFeedOrder>
}

export type TProfileFeedOrdersProps = {
  order: TFeedOrder
}