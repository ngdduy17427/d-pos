import { IAppContext } from "@type";
import React from "react";
import { AppActionType, appAction } from "./actions";

const AppContext = React.createContext<any>({});
const AppProvider = ({
  children,
  initialValue,
}: {
  children: React.ReactNode;
  initialValue: IAppContext;
}) => {
  const [appContext, setAppContext] = React.useState<IAppContext>(initialValue);
  const appDispatch = (type: AppActionType, payload?: any) =>
    React.startTransition(() =>
      setAppContext((prevState) => appAction(prevState, { type, payload }))
    );

  return React.createElement(AppContext.Provider, { value: { appContext, appDispatch } }, children);
};
const useAppContext = () =>
  React.useContext<{
    appContext: IAppContext;
    appDispatch: (type: AppActionType, payload?: any) => void;
  }>(AppContext);
export { AppProvider, useAppContext };