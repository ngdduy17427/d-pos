import { IDrink } from "@type";
import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { useEffect } from "react";
import ProductCard from "./product_card";

const ProductContainer = ({
  categorySelected,
  handleAddProductToCart,
}: {
  categorySelected: string;
  handleAddProductToCart: (product: IDrink) => void;
}) => {
  const { appContext, appDispatch } = useAppContext();
  const { drinkList } = appContext;

  useEffect(() => {
    appDispatch(AppActionType.FETCH_DRINK_LIST, { categoryId: categorySelected });
  }, [appDispatch, categorySelected]);

  return (
    <section id="productContainer" className="product-container">
      {drinkList?.map((drink) => (
        <ProductCard
          key={drink.id}
          product={drink}
          handleAddProductToCart={handleAddProductToCart}
        />
      ))}
    </section>
  );
};

export default ProductContainer;
