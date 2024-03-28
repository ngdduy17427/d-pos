import { Moment } from "moment";

export interface IAppContext {
  isLogin: boolean;
  tableList: ITable[];
  categoryList: ICategory[];
  drinkList: IDrink[];
}
export interface ITable {
  id: string;
  name: string;
  itemsInCart: IDrinkInCart[];
  orderedAt: Moment | undefined;
  isServing: boolean;
}
export interface ICategory {
  id: string;
  name: string;
  thumbnail: string;
}
export interface IDrink {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  categoryId: string;
}
export interface IDrinkInCart extends IDrink {
  quantity: number;
  isServed: boolean;
}
