import { IDrinkInCart, ITable } from "@type";
import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import moment from "moment";
import { useMemo } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatCurrency, removeClassFromElement } from "utils/utils_helper";
import "./css.scss";
import ProductCardAside from "./ui/product_card_aside";

const AsideCart = ({
  table,
  itemsInCart,
  handleUpdateProductInCart,
  handleDeleteProductFromCart,
}: {
  table: ITable;
  itemsInCart: IDrinkInCart[];
  handleUpdateProductInCart: (product: IDrinkInCart) => void;
  handleDeleteProductFromCart: (productId: string) => void;
}): JSX.Element => {
  const { appDispatch } = useAppContext();
  const navigate = useNavigate();

  const { ref: asideCartRef } = useOnClickOutside<HTMLDivElement>((): void =>
    removeClassFromElement("asideCart", "open")
  );

  const totalPrice = useMemo(
    (): number =>
      itemsInCart?.reduce((total, item): number => item.price * item.quantity + total, 0),
    [itemsInCart]
  );

  const serving = (): void => {
    const serveTime = itemsInCart.length * parseInt(process.env.REACT_APP_SERVE_TIME as string);

    setTimeout((): void => {
      const tableModified = Object.assign({}, table);

      tableModified.itemsInCart = [];
      tableModified.orderedAt = undefined;
      tableModified.isServing = false;

      appDispatch(AppActionType.UPDATE_TABLE, { table: tableModified });
    }, serveTime + 1000);
  };

  const handleUpdateTable = (): void => {
    const tableModified = Object.assign({}, table);

    tableModified.itemsInCart = itemsInCart;
    tableModified.isServing = true;

    if (!tableModified.orderedAt) tableModified.orderedAt = moment();

    appDispatch(AppActionType.UPDATE_TABLE, { table: tableModified });
    navigate(-1);
    serving();
  };

  return (
    <aside id="asideCart" className="aside-cart">
      <div ref={asideCartRef} className="aside-cart-container">
        <div className="aside-cart-header">
          <h1 className="text-[1.5rem] font-bold">{table?.name}</h1>
          <MdClose
            className="cursor-pointer text-[1.8rem]"
            onClick={(): void => removeClassFromElement("asideCart", "open")}
          />
        </div>
        <div className="aside-cart-content">
          {itemsInCart?.map(
            (item): JSX.Element => (
              <ProductCardAside
                key={item.id}
                product={item}
                handleUpdateProductInCart={handleUpdateProductInCart}
                handleDeleteProductFromCart={handleDeleteProductFromCart}
              />
            )
          )}
        </div>
        <div className="aside-cart-total-price">
          <h1>Total price</h1>
          <p>
            {formatCurrency(totalPrice, "en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <div className="aside-cart-footer">
          <button
            type="button"
            className="btn-checkout"
            onClick={handleUpdateTable}
            disabled={itemsInCart?.length === 0}
          >
            Update Table
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AsideCart;
