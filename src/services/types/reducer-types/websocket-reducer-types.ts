import { TFeedOrder } from "../feed-types";

export type TInitialState = {
  isConnected: boolean;
  feedOrders: Array<TFeedOrder>;
  total: number;
  totalToday: number;
}