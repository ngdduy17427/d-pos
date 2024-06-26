import { IAppContext } from "@type";
import React, { useCallback, useMemo } from "react";
import { AppActionType, appAction } from "./actions";

const AppContext = React.createContext<any>({});
const AppProvider = ({
  children,
  initialValue,
}: {
  children: React.ReactNode;
  initialValue: IAppContext;
}): JSX.Element => {
  const [appContext, setAppContext] = React.useState<IAppContext>(initialValue);

  const appMemoContext = useMemo((): IAppContext => appContext, [appContext]);
  const appCallbackDispatch = useCallback(
    (type: AppActionType, payload?: any): void =>
      setAppContext((prevState): IAppContext => appAction(prevState, { type, payload })),
    []
  );

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        appContext: appMemoContext,
        appDispatch: appCallbackDispatch,
      },
    },
    children
  );
};
const useAppContext = () =>
  React.useContext<{
    appContext: IAppContext;
    appDispatch: (type: AppActionType, payload?: any) => void;
  }>(AppContext);
export { AppProvider, useAppContext };
