import { IDrinkInCart } from "@type";
import { MdAdd, MdRemove } from "react-icons/md";
import { formatCurrency } from "utils/utils_helper";

enum UpdateAmountType {
  DECREMENT,
  INCREMENT,
}

const ProductCardAside = ({
  product,
  handleUpdateProductInCart,
  handleDeleteProductFromCart,
}: {
  product: IDrinkInCart;
  handleUpdateProductInCart: (product: IDrinkInCart) => void;
  handleDeleteProductFromCart: (productId: string) => void;
}): JSX.Element => {
  const handleUpdateAmount = (type: UpdateAmountType): void => {
    switch (type) {
      case UpdateAmountType.DECREMENT:
        product.quantity -= 1;
        if (product.quantity === 0) return handleDeleteProductFromCart(product.id);
        break;
      case UpdateAmountType.INCREMENT:
        product.quantity += 1;
        break;
      default:
        break;
    }

    handleUpdateProductInCart(product);
  };

  return (
    <article className="product-card-aside">
      <div className="product-card-thumb">
        <img src={product.thumbnail} alt={product.name} />
      </div>
      <div className="product-card-description">
        <h1 className="title">
          <strong>{product.name}</strong>
        </h1>
        <p className="price">
          {formatCurrency(product.price, "en-US", { style: "currency", currency: "USD" })}
        </p>
        <div className="product-card-counter">
          <div className="counter">
            <span
              className="counter-update decrement"
              onClick={(): void => handleUpdateAmount(UpdateAmountType.DECREMENT)}
            >
              <MdRemove className="text-[1.25rem]" />
            </span>
            <p className="counter-value">{product.quantity}</p>
            <span
              className="counter-update increment"
              onClick={(): void => handleUpdateAmount(UpdateAmountType.INCREMENT)}
            >
              <MdAdd className="text-[1.25rem]" />
            </span>
          </div>
          <p className="amount">
            {formatCurrency(product.price * product.quantity, "en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCardAside;
