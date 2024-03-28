import { AppProvider } from "context/context";
import ReactDomClient from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app";
import "./css/global.scss";

const container = document.getElementById("root") as Element;
const root = ReactDomClient.createRoot(container);

root.render(
  <HashRouter>
    <AppProvider
      initialValue={{
        isLogin: false,
        tableList: [],
        categoryList: [],
        drinkList: [],
      }}
    >
      <App />
    </AppProvider>
  </HashRouter>
);
