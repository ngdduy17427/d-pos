import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { FC, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ConfirmPage from "./confirm";
import Homepage from "./homepage";
import LoginPage from "./login";
import TablePage from "./table";

const App: FC = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    appContext: { isLogin },
    appDispatch,
  } = useAppContext();

  useEffect((): void => {
    if (!isLogin && location.pathname !== "/login" && location.pathname !== "/confirm") {
      navigate("/login");
    }
  }, [isLogin, location.pathname, navigate]);

  useEffect((): void => {
    appDispatch(AppActionType.FETCH_TABLE_LIST);
    appDispatch(AppActionType.FETCH_CATEGORY_LIST);
  }, [appDispatch]);

  return (
    <Routes>
      <Route path="" element={<Homepage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="confirm" element={<ConfirmPage />} />
      <Route path="table/:id" element={<TablePage />} />
    </Routes>
  );
};

export default App;
