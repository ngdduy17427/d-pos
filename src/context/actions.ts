import { IAppContext, ITable } from "@type";
import categoryList from "mock_data/category_list";
import drinkList from "mock_data/drink_list";
import tableList from "mock_data/table_list";

export enum AppActionType {
  LOGIN = "LOGIN",
  FETCH_TABLE_LIST = "FETCH_TABLE_LIST",
  FETCH_CATEGORY_LIST = "FETCH_CATEGORY_LIST",
  FETCH_DRINK_LIST = "FETCH_DRINK_LIST",
  UPDATE_TABLE = "UPDATE_TABLE",
}

export interface AppActionProps {
  type: AppActionType;
  payload: any;
}

export const appAction = (state: IAppContext, action: AppActionProps): IAppContext => {
  switch (action.type) {
    case AppActionType.LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case AppActionType.FETCH_TABLE_LIST:
      return {
        ...state,
        tableList: tableList,
      };
    case AppActionType.FETCH_CATEGORY_LIST:
      return {
        ...state,
        categoryList: categoryList,
      };
    case AppActionType.FETCH_DRINK_LIST:
      return {
        ...state,
        drinkList: drinkList.filter(
          (drink): boolean => drink.categoryId === action.payload.categoryId
        ),
      };
    case AppActionType.UPDATE_TABLE:
      return {
        ...state,
        tableList: state.tableList.map((table): ITable => {
          if (table.id === action.payload.table.id) table = action.payload.table;

          return table;
        }),
      };
    default:
      throw Error(`Unknown action ${action.type}`);
  }
};
