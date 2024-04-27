import { IDrinkInCart } from "@type";
import { addClassToElement } from "utils/utils_helper";

const ItemsInCart = ({ itemsInCart }: { itemsInCart: IDrinkInCart[] }): JSX.Element => {
  return (
    <button
      id="itemsInCartBtn"
      type="button"
      className="items-in-cart"
      onClick={(): void => addClassToElement("asideCart", "open")}
    >
      Items in Cart ({itemsInCart.length})
    </button>
  );
};

export default ItemsInCart;
