import { IDrink, IDrinkInCart, ITable } from "@type";
import AsideCart from "components/aside_cart";
import Header from "components/header";
import { useAppContext } from "context/context";
import { Fragment, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./css.scss";
import AsideCategory from "./ui/aside_category";
import ProductContainer from "./ui/product_container";

const TablePage = (): JSX.Element => {
  const {
    appContext: { tableList, categoryList },
  } = useAppContext();

  const params = useParams();
  const table = useMemo(
    (): ITable => tableList.filter((table): boolean => table.id === params.id)[0],
    [tableList, params.id]
  );

  const [categorySelected, setCategorySelected] = useState(categoryList[0]?.id);
  const [itemsInCart, setItemsInCart] = useState<IDrinkInCart[]>(
    table?.itemsInCart ? JSON.parse(JSON.stringify(table?.itemsInCart)) : []
  );

  const handleAddProductToCart = (product: IDrink): void =>
    setItemsInCart((prevState): IDrinkInCart[] => {
      const itemsInCartModified: IDrinkInCart[] = JSON.parse(JSON.stringify(prevState));
      const isItemInCart = itemsInCartModified.filter((item): boolean => item.id === product.id)[0];

      if (isItemInCart) {
        itemsInCartModified.filter((item): IDrinkInCart => {
          if (item.id === product.id) item.quantity += 1;

          return item;
        });
      } else {
        (product as IDrinkInCart).quantity = 1;
        itemsInCartModified.push(product as IDrinkInCart);
      }

      return itemsInCartModified;
    });

  const handleUpdateProductInCart = (product: IDrink): void =>
    setItemsInCart((prevState): IDrinkInCart[] =>
      prevState.map((item): IDrinkInCart => {
        if (item.id === product.id) item = product as IDrinkInCart;

        return item;
      })
    );

  const handleDeleteProductFromCart = (productId: string): void =>
    setItemsInCart((prevState): IDrinkInCart[] =>
      prevState.filter((item): boolean => item.id !== productId)
    );

  return (
    <Fragment>
      <section className="table-page">
        <Header itemsInCart={itemsInCart} handleAddProductToCart={handleAddProductToCart} />
        <div className="table-page-container">
          <AsideCategory
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
          />
          <ProductContainer
            categorySelected={categorySelected}
            handleAddProductToCart={handleAddProductToCart}
          />
        </div>
      </section>
      <AsideCart
        table={table}
        itemsInCart={itemsInCart}
        handleUpdateProductInCart={handleUpdateProductInCart}
        handleDeleteProductFromCart={handleDeleteProductFromCart}
      />
    </Fragment>
  );
};

export default TablePage;
