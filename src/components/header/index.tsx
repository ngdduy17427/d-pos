import { IDrink, IDrinkInCart } from "@type";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import "./css.scss";
import ButtonCloseApp from "./ui/btn_close_app";
import DialogCloseApp from "./ui/dialog_close_app";
import ItemsInCart from "./ui/items_in_cart";
import SearchBox from "./ui/search_box";

const Header = ({
  itemsInCart,
  handleAddProductToCart,
}: {
  itemsInCart?: IDrinkInCart[];
  handleAddProductToCart?: (product: IDrink) => void;
}): JSX.Element => {
  return (
    <Fragment>
      <header>
        <Link to="/" className="logo">
          {itemsInCart && <MdArrowBack />}
          <strong>D-POS</strong>
        </Link>
        {itemsInCart && <SearchBox handleAddProductToCart={handleAddProductToCart} />}
        {itemsInCart && <ItemsInCart itemsInCart={itemsInCart} />}
        <ButtonCloseApp className={`text-[2rem] ${!itemsInCart ? "ml-auto" : "ml-4"}`} />
      </header>
      <DialogCloseApp />
    </Fragment>
  );
};

export default Header;
